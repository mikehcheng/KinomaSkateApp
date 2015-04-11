// PHONE MAIN

var SCROLLER = require('mobile/scroller');
var THEME = require('themes/sample/theme');

/*#########################################
			SKINS & STYLES
#########################################*/

var titleStyle = new Style( { font: "bold 40px", color:"black" } );
var labelStyle = new Style( { font: "20px", color:"black" } );
var infoStyle = new Style( { font: "14px", color:"blue" });

var whiteSkin = new Skin( { fill:"white" });
var graySkin = new Skin({fill: "#696969"});
var tableSkin = new Skin({borders: {top: 1, right: 1, left: 1}, stroke: "black"});
var rowSkin = new Skin({borders: {bottom: 1}, stroke: "black"});
var separatorSkin = new Skin({ fill: 'blue',});

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var Table = Column.template(function($) { return { left: $.left, right: $.right, top: $.top, 
	contents: [
		Label($, {left: 0, style: labelStyle, string: $.string}),
		Column($, {left: 0, right: 0, top: 0, bottom: 0, skin: tableSkin, contents: []})
	]
}});

var homeTableRow = Line.template(function($) { return { left: 0, right: 0, height: 60, active: true, skin: rowSkin,
	behavior: Object.create(Behavior.prototype, {
		onTouchEnded: {value: function(container, id, x,  y, ticks) {
			
		}}
	}),
	contents: [
		Container ($, {left: 5, right: 5, top: 5, bottom: 5, contents:[
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
	left:0, right:0, top:0, bottom: 70,  skin: whiteSkin,
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
  
Handler.bind("/loadInitial", {
	onInvoke: function(handler, query){
		comic.load('resources/loading.gif');
		handler.invoke(new Message("http://xkcd.com/info.0.json"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		xkcdTitle = json.title;
		numComics = json.num;
		currComic = json.num;
		xkcdImage = json.img;
		altText = json.alt;
		updateComic();
	}
});
  
/*#########################################
		HOME SCREEN INSTANTIATION
#########################################*/
  
var myTurnTable = new Table({string: "Your Turn", left: 5, right:5, top: 5});
var opTurnTable = new Table({string: "Opponent's Turn", left: 5, right:5, top: 35});  

var mainCon = new Container({left: 0, right: 0, bottom: 55, top: 55, contents: [
	new scrollContainer({contents: [ myTurnTable, opTurnTable ]}),
	new Container({left: 0, right:0, bottom: 0, height: 70, skin: whiteSkin, contents:[
		new Container({left: 10, right: 10, bottom: 10, top: 10, skin: new Skin({fill: "green"}), contents:[
   			new Line({contents: [
   				new Thumbnail({width: 20, height: 20, aspect: 'fit', url: "resources/add.png" }),
   				new Label({style: labelStyle, width: labelStyle.measure("Create Game").width, string: "Create Game", left: 10})
   			]})
		]})
	]})
]});

function homeTableBuilder(element, index, array) {
	if (element.myTurn){
		myTurnTable.add(new homeTableRow(element));
	} else {
		opTurnTable.add(new homeTableRow(element));
	}
}

application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
		user.games.forEach(homeTableBuilder);
		application.add(mainCon);
		application.add(new Container({top: 0, left: 0, right: 0, height: 55, skin:new Skin({fill: "black"})}));
		application.add(new Container({bottom: 0, left: 0, right: 0, height: 55, skin:new Skin({fill: "black"})}));
	}}
});

