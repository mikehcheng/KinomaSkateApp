// PHONE MAIN
var deviceURL = "";

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		trace("Found the device.\n");
		deviceURL = JSON.parse(message.requestText).url;
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("skatedevice");
	},
	onQuit: function(application) {
		application.forget("skatedevice");
	},
})

include ("runOverview/data.js");
include ("runOverview/home.js");
include ("runOverview/game.js");
include	("runOverview/run.js");

application.behavior = new ApplicationBehavior();
createHome(application);