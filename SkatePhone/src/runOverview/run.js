var activeRunCon;
var inactiveRunCon;
var trickTable;

// HANDLERS
Handler.bind("/readTrick", {
	onInvoke: function(handler, message) {
		handler.invoke(new Message(deviceURL + "getTrick"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		if (json.trick != undefined) {
			trickTable.last.add(new trickRow({trick: json.trick}));
			trace("Got " + json.trick);
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
var trickRow = Line.template(function($) { return {
	top:0, bottom:0, left:0, right:0, height: 30, skin: boxSkin, contents: [
		new Label({top:15, left: 30, width:150, skin:whiteSkin, style: smallLabelStyle, string: $.trick}),
		new Label({top:15, right: 30, width: 50, skin:whiteSkin, style: infoStyle, string: trickDictionary[$.trick]})
	]
}});

var videoContainer = Container.template(function($) { return {
	left:0, right:0, bottom: 0, height:200, skin: blackSkin, contents: [
		
	]
}});

var scoreColumn = Column.template(function($) { return {
	left:$.left, right:$.right, name:"scoreColumn", top:0, bottom:0, height:40, skin: boxSkin, contents: [
		new Label({top:3, left:0, right:0}) 
	]
}});

// TIMER

var timerValue = 0;
var timerBehavior = Behavior.template({
	onCreate: function(container, data) {
		timerValue = 15;
		container.interval = 1000;
	    container.string = timeString(timerValue);
	    container.invoke(new Message("/readTrick"));
		container.start();
	},
	onTimeChanged: function(container) {
		timerValue--;
		if (timerValue == 0) {
			container.stop();
			container.style = new Style({color: "red", font: "14px"});
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

var timerColumn = Column.template(function($) { return {
	left:$.left, right:$.right, top:0, bottom:0, height:40, skin: boxSkin, contents: [
		new Label({top:3, left: 0, right:0, style: smallLabelStyle, string: "Time Remaining"}),
		new Label({top:20, left:0, right:0, style: smallLabelStyle, behavior: Object.create(timerBehavior.prototype)})
	]
}});

// BUILDING RUNS

function createActiveRun(game) {
	var runNumber = game.myRuns.length + 1;
	trickTable = new Table({string: "Tricks Completed", left: 10, right:10, top: 10});
	
	activeRunCon = new Column({
		top:0, bottom:0, left:0, right:0, skin: whiteSkin, contents: [
			new Container({top:0, height:40, contents: [ timerColumn({left:0, right:0}) ] }),
			new scrollContainer({top: 50, bottom: 0, contents: [trickTable],})
		]
	})
}

function createInactiveRun(game) {
	
}