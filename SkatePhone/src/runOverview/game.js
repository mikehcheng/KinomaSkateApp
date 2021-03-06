var gameCon, preRunCon;

/*#########################################
			SKINS & STYLES
#########################################*/

//var boxSkin = new Skin({stroke: "black", borders: {top: 2, bottom: 2, right: 2, left: 2}});
var boxSkin = new Skin({fill:"white", borders: {top:2, bottom:2, left:2, right:2}, stroke: "#3498db"});
var boxCloudSkin = new Skin({fill:"#ECF0F1", borders: {top:2, bottom:2, left:2, right:2}, stroke: "#3498db"});

/*#########################################
				HANDLERS
#########################################*/

Handler.bind("/preRun", {
	onInvoke: function(handler, message){
		createPreRun(JSON.parse(message.requestText));
		application.remove(gameCon);
	}
});

Handler.bind("/trackRun", {
	onInvoke: function(handler, message){
		createActiveRun(JSON.parse(message.requestText));
		application.remove(preRunCon);
	}
});

Handler.bind("/loadRun", {
	onInvoke: function(handler, message){
		createInactiveRun(JSON.parse(message.requestText));
		application.remove(gameCon);
	},
});

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var playerScore = Container.template(function($){ return {skin: boxCloudSkin, contents:[
	Line($, {left: 5, top: 5, bottom: 5, right: 5, contents: [
		Column($, {width: 60, contents: [
			Thumbnail($, {width: 50, height: 50, aspect: 'fit', url: $.pic }),
			Label($, {width: Math.min(smallLabelStyle.measure($.name).width, 60), style: smallLabelStyle, string: $.name,}),
		]}),
		Label($, {left: 15,style: labelStyle, string: $.score})
	]})
]}});

var gameTableRow = Line.template(function($) { return { left: 2, right: 2, height: 50, active: true, skin: rowSkin,
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
		GAME SCREEN INSTANTIATION
#########################################*/

var specializedBackButton = BUTTONS.Button.template(function($){ return{
    left:0,top:0, bottom:0, height:85, width: 20,
    contents: [
        new Label({left:0, right:0, top:0, bottom:0, skin: new Skin({fill: "#3498db"}), 
            style: new Style( {font: "bold 25px", color:"white", horizontal:"left"} ) , string:"<"})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button) {
        	application.remove(gameCon);
        	createHome();
  		}}
  	})
}})

function createGame(game){
	var buttonString = (game.myTurn) ? "Start your Turn" : "Waiting for Opponent";
	var buttonSkin = (game.myTurn) ? new Skin({fill: "#3498db"}) : lightGraySkin;
	var customTableSkin = new Skin({stroke:"#3498db", fill: "white", borders: {top: 2, bottom: 2, left: ((game.myTurn) ? 2 : 0), right: ((game.myTurn) ? 0 : 2)}});
	var myRunsTable = new Table({string: "", width: 152, left: 0, top: 0, tableSkin: ((game.myTurn) ? customTableSkin : tableSkin)});
	var opRunsTable = new Table({string: "", width: 151, left: 0, top: 0, tableSkin: ((game.myTurn) ? tableSkin : customTableSkin)});
	
	gameCon = new Container({left: 0, right: 0, bottom: 0, top: 0, contents: [
		new scrollContainer({top: 85, bottom: 50, contents: [new Line({left: 10, right: 10, top:0, bottom: 0, 
			contents: [
				myRunsTable, 
				//new Container({left:0, right:0}),
				opRunsTable]})]}),
		new Container({skin:new Skin({fill: "#3498db"}), top: 0, left:0, right:0, height: 85, contents:[
			new Line({contents:[
				new specializedBackButton(),
				new playerScore({pic: user.profile.pic, name: "You", score: game.myScore, left: 10, right: 0}),
				new Label({left:10, right:10, width: labelStyle.measure("vs").width, string:"vs", style:labelStyle}),
				new playerScore({pic: game.opPic, name: game.opName, score: game.opScore, left: 0, right: 10}),
				new Container({right:0, top:0, bottom:0, width:20})
			]}),
		]}),
		new Container({left: 0, right:0, bottom: 65, height: 50, skin: cloudSkin, contents:[
			new Container({left: 10, right: 10, bottom: 10, top: 10, active: true, skin: buttonSkin,
				behavior: Object.create(Container.prototype, {
					onTouchEnded: { value: function(content, id, x, y, ticks){
						if (game.myTurn){
							var newRunMsg = new Message("/preRun");
							newRunMsg.requestText = JSON.stringify(game);
							content.invoke(newRunMsg);
						}
					}}
				}),
				contents:[ new Line({contents: [
	   				new Label({style: labelStyle, width: labelStyle.measure(buttonString).width, string: buttonString, left: 10})
	   			]})
			]})
		]}),
		new navBar({index: 7})
	]});
	
	game.myRuns.forEach(function(e, i){e["index"] = i+1; e["player"] = "My"; e["gameIndex"] = game.gameIndex; myRunsTable.last.add(new gameTableRow(e))});
	game.opRuns.forEach(function(e, i){e["index"] = i+1; e["player"] = game.opName + "\'s"; e["gameIndex"] = game.gameIndex; opRunsTable.last.add(new gameTableRow(e))});
	
	application.add(gameCon);
}

function createPreRun(game){

	var countdownBehavior = Behavior.template({
		onCreate: function(container, data){
			this.timing = 5;
			container.interval = 1000;
			container.string = timeString(this.timing.toString());
			container.start();
		},
		onTimeChanged: function(container) {
			this.timing--;
			if (this.timing == 0) {
				container.stop();
				var newRunMsg = new Message("/trackRun");
				newRunMsg.requestText = JSON.stringify(game);
				container.invoke(newRunMsg);
			}
			container.string = timeString(this.timing.toString());
		},
	});

	preRunCon = new Column({left: 0, right: 0, bottom: 0, top: 0, skin: blueBoldBorderSkin, contents: [
		new Label({style: new Style({font: "bold 40px", color:"#348adb"}), top: 150, string: game.gameType}),
		new Text({style: new Style({ font: "20px", color:"#348adb", horizontalAlignment: "justify"}), left: 20, right: 20, top: 10, string:"Perform as many tricks as you can within the given time. Tougher tricks are awarded more points."}),
		new Label({style: new Style({font: "20px", color:"#348adb"}), string: "YOUR RUN BEGINS IN:", top: 30}),
		new Label({style: new Style({font: "bold 30px", color:"#348adb"}), name: "timer", behavior: Object.create(countdownBehavior.prototype, {game: game}), top: 10})
	]});
	application.add(preRunCon);
}