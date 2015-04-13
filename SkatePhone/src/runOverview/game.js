var gameCon;
var runTable;

/*#########################################
			SKINS & STYLES
#########################################*/

var boxSkin = new Skin({stroke: "black", borders: {top: 1, bottom: 1, right: 1, left: 1}});

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

var gameTableRow = Line.template(function($) { return { left: 0, right: 0, height: 50, active: true, skin: rowSkin,
	behavior: Object.create(Behavior.prototype, {
		onTouchEnded: {value: function(container, id, x,  y, ticks) {
			var msg = new Message("/loadRun");
		    msg.requestText = JSON.stringify($);
		    container.invoke(msg, Message.JSON);
		}}
	}),
	contents: [
		Container($, {left:10, top:10, right:10, bottom: 10, contents: [
			Label($, { left: 0, style: labelStyle, string: "Run " + $.index,}),
			Label($, { right: 0, style: infoStyle, string: $.score})
		]})
	]
}});
/*#########################################
				HANDLERS
#########################################*/

Handler.bind("/trackRun", {
	onInvoke: function(handler, message){
		trace("Tracking Run: Please enter proper behavior here...\n")
	},
	onComplete: function(handler, message, json){
	}
});


/*#########################################
		GAME SCREEN INSTANTIATION
#########################################*/

function createGame(game){
	var buttonString = (game.myTurn) ? "Track Your Run" : "Wating for Opponent";
	var buttonSkin = (game.myTurn) ? new Skin({fill: "green"}) : new Skin({fill: "gray"});
	var customTableSkin = new Skin({stroke:"black", borders: {top: 2, bottom: 2, left: ((game.myTurn) ? 2 : 0), right: ((game.myTurn) ? 0 : 2)}});
	var myRunsTable = new Table({string: "", left: 0, right: 0, top: 0, tableSkin: ((game.myTurn) ? customTableSkin : tableSkin)});
	var opRunsTable = new Table({string: "", right: 0, left: 0, top: 0, tableSkin: ((game.myTurn) ? tableSkin : customTableSkin)});
	
	gameCon = new Container({left: 0, right: 0, bottom: 0, top: 0, contents: [
		new scrollContainer({top: 85, bottom: 105, contents: [new Line({left: 10, right: 10, top:0, bottom: 0, 
			contents: [myRunsTable, opRunsTable]})]}),
		new Container({skin:new Skin({fill: "#D3D3D3"}), top: 0, left:0, right:0, height: 86, contents:[
			new Line({contents:[
				new playerScore({pic: user.profile.pic, name: "You", score: game.myScore, left: 10, right: 0}),
				new Label({left:10, right:10, width: labelStyle.measure("vs").width, string:"vs", style:labelStyle}),
				new playerScore({pic: game.opPic, name: game.opName, score: game.opScore, left: 0, right: 10})
			]}),
		]}),
		new Container({left: 0, right:0, bottom: 55, height: 50, skin: whiteSkin, contents:[
			new Container({left: 10, right: 10, bottom: 10, top: 10, active: true, skin: buttonSkin,
				behavior: Object.create(Container.prototype, {
					onTouchEnded: { value: function(content, id, x, y, ticks){
						if (game.myTurn){
							content.invoke(new Message("/trackRun"));
						}
					}}
				}),
				contents:[ new Line({contents: [
	   				new Label({style: labelStyle, width: labelStyle.measure(buttonString).width, string: buttonString, left: 10})
	   			]})
			]})
		]})
	]});

	game.myRuns.forEach(function(e, i){e["index"] = i+1; myRunsTable.last.add(new gameTableRow(e))});
	game.opRuns.forEach(function(e, i){e["index"] = i+1; opRunsTable.last.add(new gameTableRow(e))});
	
	application.add(gameCon);
}