var gameCon;
var runTable;

/*#########################################
			SKINS & STYLES
#########################################*/

var boxSkin = new Skin({stroke: "black", borders: {top: 1, bottom: 1, right: 1, left: 1}});

/*#########################################
				HANDLERS
#########################################*/

Handler.bind("/trackRun", {
	onInvoke: function(handler, message){
		createActiveRun(JSON.parse(message.requestText));
		application.add(activeRunCon);
		application.remove(gameCon);
	}
});

Handler.bind("/loadRun", {
	onInvoke: function(handler, message){
		createGame(JSON.parse(message.requestText));
		application.add(gameCon);
		application.remove(homeCon);
	},
	onComplete: function(handler, message, json){
	}
});

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var playerScore = Container.template(function($){ return {skin: boxSkin, contents:[
	Line($, {left: 5, top: 5, bottom: 5, right: 5, contents: [
		Column($, {width: 60, contents: [
			Thumbnail($, {width: 50, height: 50, aspect: 'fit', url: $.pic }),
			Label($, {width: Math.min(smallLabelStyle.measure($.name).width, 60), style: smallLabelStyle, string: $.name,}),
		]}),
		Label($, {left: 15,style: labelStyle, string: $.score})
	]})
]}});

var gameTableRow = Line.template(function($) { return { left: 0, right: 0, height: 60, active: true, skin: rowSkin,
	behavior: Object.create(Behavior.prototype, {
		onTouchEnded: {value: function(container, id, x,  y, ticks) {
			var msg = new Message("/loadRun");
		    msg.requestText = JSON.stringify($);
		    container.invoke(msg, Message.JSON);
		}}
	}),
	contents: [
			Container ($, {left: 5, right: 5, top: 5, bottom: 5, contents:[
				Label($, { left: 0, style: labelStyle, string: "Run " + $.index,}),
				Label($, { style: infoStyle, string: $.opRuns[$.index].score})
			]}),
			Container($, {width: 1, left: 10, right: 10, top: 0, bottom: 0, skin: separatorSkin}),
			Container ($, {left: 5, right: 5, top: 5, bottom: 5, contents: [
				Label($, { left: 0, style: labelStyle, string: "Run " + $.index,}),
				Label($, { style: infoStyle, string: $.opRuns[$.index].score})
			]}),
		]
}});

/*#########################################
		GAME SCREEN INSTANTIATION
#########################################*/

function createGame(game){
	var buttonString = (game.myTurn) ? "Track Your Run" : "Wating for Opponent";
	var buttonSkin = (game.myTurn) ? new Skin({fill: "green"}) : new Skin({fill: "gray"});
	
	gameCon = new Container({left: 0, right: 0, bottom: 0, top: 0, contents: [
		//new scrollContainer({contents: [ myTurnTable, opTurnTable ]}),
		new Container({skin:new Skin({fill: "#D3D3D3"}), top: 0, left:0, right:0, height: 86, contents:[
			new Line({contents:[
				new playerScore({pic: user.profile.pic, name: "You", score: game.myScore, left: 10, right: 0}),
				new Label({left:10, right:10, width: labelStyle.measure("vs").width, string:"vs", style:labelStyle}),
				new playerScore({pic: game.opPic, name: game.opName, score: game.opScore, left: 0, right: 10})
			]}),
		]}),
		new Container({top: 85, left: 0, right: 0, bottom: 105, skin: whiteSkin}),
		new Container({left: 0, right:0, bottom: 55, height: 50, skin: whiteSkin, contents:[
			new Container({left: 10, right: 10, bottom: 10, top: 10, active: true, skin: buttonSkin,
				behavior: Object.create(Container.prototype, {
					onTouchEnded: { value: function(content, id, x, y, ticks){
						if (game.myTurn){
							var newRunMsg = new Message("/trackRun");
							newRunMsg.requestText = JSON.stringify(game);
							content.invoke(newRunMsg);
						}
					}}
				}),
				contents:[ new Line({contents: [
	   				new Label({style: labelStyle, width: labelStyle.measure(buttonString).width, string: buttonString, left: 10})
	   			]})
			]})
		]})
	]});
}