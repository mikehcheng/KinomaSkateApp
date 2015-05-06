/*#########################################
			SKINS & STYLES
#########################################*/

var infoStyle = new Style( { font: "bold 16px", color:"#2980b9" });
var labelStyleWhite = new Style( { font: "20px", color:"white" } );

var lightGraySkin = new Skin({fill: "#696969"});
var tableSkin = blueBorderSkin;
var rowSkin = new Skin({borders: {bottom: 1}, stroke: "#ECF0F1"});
var separatorSkin = new Skin({ fill: '#2980b9'});

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var Table = Column.template(function($) { return { left: $.left, right: $.right, top: $.top, width: (('width' in $) ? $.width : undefined),
	contents: [
		Label($, {left: 0, bottom: 0, width: 310, style: labelStyle, string: $.string, skin: cloudSkin}),
		Column($, {left: 0, right: 0, top: 0, bottom: 0, skin: (("tableSkin" in $) ? $.tableSkin: tableSkin), contents: []})
	]
}});

var homeTableRow = Line.template(function($) { return { left: 2, right: 2, height: 60, active: true, skin: rowSkin,
	behavior: Object.create(Behavior.prototype, {
		onTouchEnded: {value: function(container, id, x,  y, ticks) {
			var msg = new Message("/loadGame");
		    msg.requestText = JSON.stringify($);
		    container.invoke(msg, Message.JSON);
		}}
	}),
	contents: [
		Container ($, {left: 10, right: 10, top: 5, bottom: 5, contents:[
			Thumbnail($, { left: 0, width: 40, height: 40, aspect: 'fit', url: $.opPic }),
			Label($, { left: 45, style: labelStyle, string: $.opName,}),
			Line($, {right: 0, contents: [
				Column($, {contents: [
					Label($, { style: infoStyle, string: "You"}),
					Label($, { style: infoStyle, string: $.myScore}),
				]}),
				Container($, {width: 2, left: 10, right: 10, top: 0, bottom: 0, skin: separatorSkin}),
				Column($, {contents: [
					Label($, { style: infoStyle, string: "Rival"}),
					Label($, { style: infoStyle, string: $.opScore}),
				]}),
			]})
		]}), ]
}});
 
var scrollContainer = Container.template(function($){return {
	left:0, right:0, top:$.top, bottom: $.bottom,  skin: (('skin' in $) ? $.skin : cloudSkin),
	contents: [
   		SCROLLER.VerticalScroller(new Object(), {
   			contents: [
          			new Column({ left: 0, right: 0, top: 0,  skin: cloudSkin, contents: $.contents}),
          			SCROLLER.VerticalScrollbar(new Object(), { })
   		]})
   	]}});

/*#########################################
				HANDLERS
#########################################*/
  
Handler.bind("/loadGame", {
	onInvoke: function(handler, message){
		application.remove(homeCon);
		createGame(JSON.parse(message.requestText));
	},
});

Handler.bind("/createGame", {
	onInvoke: function(handler, message){
		application.remove(homeCon);
		application.add(mainColumnChoose);
	},
});
  
/*#########################################
		HOME SCREEN INSTANTIATION
#########################################*/ 

function homeTableBuilder(element, index, array) {
	if (element.myTurn){
		myTurnTable.last.add(new homeTableRow(element));
	} else {
		opTurnTable.last.add(new homeTableRow(element));
	}
}

var homeCon;
var myTurnTable;
var opTurnTable;

function createHome() {
	myTurnTable = new Table({string: "Your Turn", left: 5, right:5, top: 5});
	opTurnTable = new Table({string: "Opponent's Turn", left: 5, right:5, top: 35}); 
	homeCon = new Container({left: 0, right: 0, bottom: 0, top: 0, contents: [
		new scrollContainer({top: 50, bottom: 125, contents: [ myTurnTable, opTurnTable ]}),
		new headerBarTemplate({header:"Active Games"}),
		new Container({left: 0, right:0, bottom: 55, height: 70, skin: cloudSkin, contents:[
			new Container({left: 10, right: 10, bottom: 10, top: 10, active: true, skin: new Skin({fill: "#3498db"}),
				behavior: Object.create(Container.prototype, {
					onTouchEnded: { value: function(content, id, x, y, ticks){
						content.invoke(new Message("/createGame"));
					}}
				}),
				contents:[ new Line({contents: [
	   				new Thumbnail({width: 20, height: 20, aspect: 'fit', url: "resources/add.png" }),
	   				new Label({style: labelStyleWhite, width: labelStyle.measure("Create Game").width, string: "Create Game", left: 10})
	   			]})
			]})
		]}),
		new navBar({index:2})
	]});
	user.games.forEach(homeTableBuilder); 
	application.add(homeCon);
}

