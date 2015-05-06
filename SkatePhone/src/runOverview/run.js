var activeRunCon;
var inactiveRunCon;

var trickTable;
var scoreField;
var currentRun;
var currentGame;

var maxTimerValue = 15;

var extraStyle = new Style( { font: "14px", color:"black", horizontal:"center" });
var scoreStyle = new Style( { font:	"bold 24px", color: "black", horizontal:"center"});
var timerStyle = new Style( { font:	"bold 24px", color: "blue", horizontal:"center"});
var finishedStyle = new Style( { font:	"bold 24px", color: "red", horizontal:"center"});

// HANDLERS
Handler.bind("/readTrick", {
	onInvoke: function(handler, message) {
		handler.invoke(new Message(deviceURL + "getTrick"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		if ('trick' in json) {
			currentRun.moves.push(json.trick);
			currentRun.score += trickDictionary[json.trick]
			trickTable.last.add(new trickRow({trick: json.trick}));
			scoreField.score.string = currentRun.score.toString();
		}
		handler.invoke(new Message("/delay"));
	}
});

Handler.bind("/delay", {
	onInvoke: function(handler, message) {
		handler.wait(200);
		if (timerValue > 0) {
			handler.invoke(new Message("/readTrick"));
		}
	}
});

// RUN SCREEN ELEMENTS
var noLabelTable = Column.template(function($) { return { left: $.left, right: $.right, top: $.top,
	skin: blueBorderSkin,
	contents: [
		Column($, {left: 0, right: 0, top: 0, contents: []})
	]
}});

var trickRowSkin = new Skin({stroke:"#3498db", borders: {bottom:1}})
var trickRow = Line.template(function($) { return {
	top:0, left:2, right:2, height: 30, skin: trickRowSkin, contents: [
		Label($, {top:7, left: 5, width:280, skin:whiteSkin, style: smallLabelStyle, string: $.trick}),
		Label($, {top:7, right: 5, width:10, skin:whiteSkin, style: infoStyle, string: trickDictionary[$.trick]})
	]
}});

var videoContainer = Container.template(function($) { return {

	left:0, right:0, bottom: 0, height:160, skin: graySkin, contents: [

	]
}});

var scoreColumn = Column.template(function($) { return {
	left:$.left, right:$.right, name:"scoreColumn", top:$.top, bottom:$.bottom,
	skin: new Skin({fill: "#ECF0F1", stroke: "black", borders: { bottom: 2, left: 1}}), contents: [
		Label($, {top:5, left: 0, right:0, name: "score", style: scoreStyle, string: "0"}),
		Label($, {bottom:3, left:0, right:0, style: extraStyle, string: "points"})
	]
}});

var timerColumn = Column.template(function($) { return {
	left:$.left, right:$.right, top:$.top, bottom:$.bottom, 
	skin: new Skin({fill: "#ECF0F1", stroke: "black", borders: { bottom: 2, right: 1}}), contents: [
		Label($,{top:5, left: 0, right:0, style: timerStyle, behavior: Object.create(timerBehavior.prototype)}),
		Label($,{bottom:3, left:0, right:0, style: extraStyle, string: "remaining"})
	]
}});

// TIMER

var timerValue = 0;
var timerBehavior = Behavior.template({
	onCreate: function(container, data) {
		timerValue = maxTimerValue;
		container.interval = 1000;
	    container.string = timeString(timerValue);
	    container.invoke(new Message("/readTrick"));
		container.start();
	},
	onTimeChanged: function(container) {
		timerValue--;
		if (timerValue <= 5)
			container.style = finishedStyle;
		if (timerValue == 0) {
			container.stop();
			user.games[currentGame.gameIndex].myTurn = 0;
			user.games[currentGame.gameIndex].myRuns.push(currentRun);
			user.games[currentGame.gameIndex].myScore += currentRun.score;
			headerLabel.string = "Run " + runNumber.toString() + " Finished";
			runBackButton.visible = true; //when implemented
		}
		container.string = timeString(timerValue);
	},
});

function timeString(time) {
	minutes = Math.floor(time/60);
    seconds = time - minutes * 60;
    if (seconds < 10)
    	return "" + minutes + ":0" + seconds;
    return "" + minutes + ":" + seconds;
}

// BUILDING RUNS
var runBackButton;
var headerLabel;
var runNumber;

function createActiveRun(game) {
	runNumber = game.myRuns.length + 1;
	trickTable = new noLabelTable({left: 10, right:10, top: 10, bottom: 10});
	scoreField = new scoreColumn({left:0, right:0, top:0, bottom:150})
	currentRun = {score:0, moves: [], video: ""};
	currentGame = game;
	var titleString = "Tracking Run " + runNumber.toString() + "...";
	var headerBar = new headerBarTemplateWithBack({index:8, game: game.gameIndex, header: titleString, 
		tStyle: new Style({ font: "bold 25px", color:"white", horizontal:"center"}) });
	runBackButton = headerBar.first;
	runBackButton.visible = false;
	headerLabel = headerBar[1];
	
	activeRunCon = new Container({
		top:0, bottom:0, left:0, right:0, skin: cloudSkin, contents: [
			// list of tricks
			new scrollContainer({left:0, right:0, top:125, bottom: 190, contents: [trickTable]}),
			
			// box around list of tricks
			new Column({left:0, right:0, top:125, bottom: 55, contents: [
				new Container({left:8, right:8, top:0, height:10, 
					skin: new Skin({fill: "#ECF0F1", borders: {bottom:2}, stroke: "#3498db"})}),
				new Line({left:0, right:0, height:210, contents: [
					new Container({left:0, height:210, width: 10, 
						skin: new Skin({fill: "#ECF0F1", borders: {right:2}, stroke: "#3498db"})
						}),
					new Container({left:10, right:10}),
					new Container({right:0, height:210, width: 10, 
						skin: new Skin({fill: "#ECF0F1", borders: {left:2}, stroke: "#3498db"})
						}),
				]}),
				new Container({left:8, right:8, bottom: 0, height:30, 
					skin: new Skin({fill: "#ECF0F1", borders: {top:2}, stroke: "#3498db"})}),
			
			]}),
			
			// label above list of tricks
			new Column({left:0, right:0, top:95, height:30, skin: cloudSkin, contents: [
				new Label({left:10, top:10, skin: cloudSkin, style: labelStyle, string:"Tricks Completed"}),
			]}),
			
			// label for information
			new Line({left:0, right:0, top:50, height:200, contents:[
				new timerColumn({left:0, right:0, top:0, bottom:150}),
				scoreField
			]}),
			
			// video below
			new videoContainer(),
			
			// placeholder for top bar
			headerBar,
		]
	})
	
	application.add(activeRunCon);
}

function createInactiveRun(game) {
	trickTable = new noLabelTable({left: 10, right:10, top: 10, bottom: 10});
	scoreField = new scoreColumn({left:0, right:0, top:0, bottom:0})
	scoreField.score.string = game.score.toString();
	var titleString = game.player +	" Run " + game.index.toString();
	var headerBar = new headerBarTemplateWithBack({index:10, game: game.gameIndex, header: titleString, 
		tStyle: new Style({ font: "bold 25px", color:"white", horizontal:"center"}) });
	
	inactiveRunCon = new Container({
		top:0, bottom:0, left:0, right:0, skin: cloudSkin, contents: [
			// list of tricks
			new scrollContainer({left:0, right:0, top:125, bottom: 190, contents: [trickTable]}),
			
			// box around list of tricks
			new Column({left:0, right:0, top:125, bottom: 55, contents: [
				new Container({left:8, right:8, top:0, height:10, 
					skin: new Skin({fill: "#ECF0F1", borders: {bottom:2}, stroke: "#3498db"})}),
				new Line({left:0, right:0, height:210, contents: [
					new Container({left:0, height:210, width: 10, 
						skin: new Skin({fill: "#ECF0F1", borders: {right:2}, stroke: "#3498db"})
						}),
					new Container({left:10, right:10}),
					new Container({right:0, height:210, width: 10, 
						skin: new Skin({fill: "#ECF0F1", borders: {left:2}, stroke: "#3498db"})
						}),
				]}),
				new Container({left:8, right:8, bottom: 0, height:30, 
					skin: new Skin({fill: "#ECF0F1", borders: {top:2}, stroke: "#3498db"})}),
			
			]}),
			
			// label above list of tricks
			new Column({left:0, right:0, top:95, height:30, skin: cloudSkin, contents: [
				new Label({left:10, top:10, skin: cloudSkin, style: labelStyle, string:"Tricks Completed"}),
			]}),
			
			// label for information
			new Line({left:0, right:0, top:50, height:50, contents:[
				scoreField
			]}),
			
			// video below
			new videoContainer(),
			
			// placeholder for top bar
			headerBar,
		]
	})
	
	game.moves.forEach(function(move) { trickTable.last.add(new trickRow({trick: move}))});
	application.add(inactiveRunCon);
}