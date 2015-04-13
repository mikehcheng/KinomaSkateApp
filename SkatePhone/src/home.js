// PHONE MAIN

var SCROLLER = require('mobile/scroller');
var THEME = require('themes/sample/theme');

/*#########################################
			SKINS & STYLES
#########################################*/

var largeTitleStyle = new Style( { font: "bold 40px", color:"black" } );
var smallLabelStyle = new Style( { font: "14px", color:"black" } );
var infoStyle = new Style( { font: "16px", color:"blue" });

var whiteSkin = new Skin( { fill:"white" });
var lightGraySkin = new Skin({fill: "#696969"});
var tableSkin = new Skin({borders: {top: 2, right: 2, left: 2, bottom: 2}, stroke: "black"});
var rowSkin = new Skin({borders: {bottom: 1}, stroke: "black"});
var separatorSkin = new Skin({ fill: 'blue',});

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var Table = Column.template(function($) { return { left: $.left, right: $.right, top: $.top, 
	contents: [
		Label($, {left: 0, bottom: 10, style: labelStyle, string: $.string}),
		Column($, {left: 0, right: 0, top: 0, skin: (("tableSkin" in $) ? $.tableSkin: tableSkin), contents: []})
	]
}});

var homeTableRow = Line.template(function($) { return { left: 0, right: 0, height: 60, active: true, skin: rowSkin,
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
				Container($, {width: 1, left: 10, right: 10, top: 0, bottom: 0, skin: separatorSkin}),
				Column($, {contents: [
					Label($, { style: infoStyle, string: "Rival"}),
					Label($, { style: infoStyle, string: $.opScore}),
				]}),
			]})
		]}), ]
}});
 
var scrollContainer = Container.template(function($){return {
	left:0, right:0, top:$.top, bottom: $.bottom,  skin: (('skin' in $) ? $.skin : whiteSkin),
	contents: [
   		SCROLLER.VerticalScroller(new Object(), {
   			contents: [
          			new Column({ left: 0, right: 0, top: 0, name: 'menu',  skin: whiteSkin, contents: $.contents}),
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
	onComplete: function(handler, message, json){
	}
});

Handler.bind("/createGame", {
	onInvoke: function(handler, message){
		trace("Creating Game: Please enter proper behavior here...\n")
	},
	onComplete: function(handler, message, json){
	}
});
  
/*#########################################
		HOME SCREEN INSTANTIATION
#########################################*/
  
var myTurnTable = new Table({string: "Your Turn", left: 5, right:5, top: 5});
var opTurnTable = new Table({string: "Opponent's Turn", left: 5, right:5, top: 35});  

function homeTableBuilder(element, index, array) {
	if (element.myTurn){
		myTurnTable.last.add(new homeTableRow(element));
	} else {
		opTurnTable.last.add(new homeTableRow(element));
	}
}

var homeCon;

function createHome() {
	user.games.forEach(homeTableBuilder); 
	homeCon = new Container({left: 0, right: 0, bottom: 0, top: 0, contents: [
		new scrollContainer({top: 50, bottom: 125, contents: [ myTurnTable, opTurnTable ]}),
		new Container({top: 0, left: 0, right: 0, height: 50, skin:new Skin({fill: "black"})}),
		new Container({left: 0, right:0, bottom: 55, height: 70, skin: whiteSkin, contents:[
			new Container({left: 10, right: 10, bottom: 10, top: 10, active: true, skin: new Skin({fill: "green"}),
				behavior: Object.create(Container.prototype, {
					onTouchEnded: { value: function(content, id, x, y, ticks){
						content.invoke(new Message("/createGame"));
					}}
				}),
				contents:[ new Line({contents: [
	   				new Thumbnail({width: 20, height: 20, aspect: 'fit', url: "resources/add.png" }),
	   				new Label({style: labelStyle, width: labelStyle.measure("Create Game").width, string: "Create Game", left: 10})
	   			]})
			]})
		]}),
		new navBar({index:2})
	]});
	application.add(homeCon);
}

