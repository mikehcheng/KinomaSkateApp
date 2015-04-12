var activeRunCon;
var inactiveRunCon;

var trickTable;
var scoreField;

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
		if (json.trick != undefined) {
			trickTable.last.add(new trickRow({trick: json.trick}));
			scoreField.score.string = (parseInt(scoreField.score.string) + trickDictionary[json.trick]).toString();
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
	skin: new Skin({stroke: "black", borders: {top: 2, bottom: 2, right: 2, left: 2}}),
	contents: [
		Column($, {left: 0, right: 0, top: 0, skin: (("tableSkin" in $) ? $.tableSkin: tableSkin), contents: []})
	]
}});

var trickRow = Line.template(function($) { return {
	top:0, bottom:0, left:0, right:0, height: 30, skin: boxSkin, contents: [
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
	skin: new Skin({fill: "white", stroke: "black", borders: { bottom: 2, left: 1}}), contents: [
		Label($, {top:3, left: 0, right:0, name: "score", style: scoreStyle, string: "0"}),
		Label($, {bottom:3, left:0, right:0, style: extraStyle, string: "points"})
	]
}});

var timerColumn = Column.template(function($) { return {
	left:$.left, right:$.right, top:$.top, bottom:$.bottom, 
	skin: new Skin({fill: "white", stroke: "black", borders: { bottom: 2, right: 1}}), contents: [
		Label($,{top:3, left: 0, right:0, style: timerStyle, behavior: Object.create(timerBehavior.prototype)}),
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
			//activeRunCon.backButton.visible = true; //when implemented
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

function createActiveRun(game) {
	var runNumber = game.myRuns.length + 1;
	trickTable = new noLabelTable({left: 10, right:10, top: 10, bottom: 10});
	scoreField = new scoreColumn({left:0, right:0, top:0, bottom:0})
	
	activeRunCon = new Container({
		top:0, bottom:0, left:0, right:0, contents: [
			new scrollContainer({left:30, right:30, top: 130, bottom: 55, contents: [trickTable]}),
			new Column({left:0, right:0, top:105, height:25, skin: whiteSkin, contents: [
				new Label({left:10, top:10, style: labelStyle, string:"Tricks Completed"}),
			]}),
			new Line({left:0, right:0, top:55, height:50, contents:[
				new timerColumn({left:0, right:0, top:0, bottom:0}),
				scoreField
			]}),
			new videoContainer(),
			new Container({top: 0, left: 0, right: 0, height: 55, skin:new Skin({fill: "black"})}),
		]
	})
}

function createInactiveRun(game) {
	
}