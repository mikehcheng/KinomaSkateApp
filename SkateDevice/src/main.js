// DEVICE MAIN

// SENSORS
var pinMessage = new MessageWithObject("pins:configure", {
	sensorArray: {
		require: "trickBLL",
		pins: { sensors: {sda: 27, clock: 29}}
		},
	});
	
var lastTrickPerformed = undefined;

Handler.bind("/readSensors", {
	onInvoke: function(handler, message) {
		if (message.requestObject != undefined)
			lastTrickPerformed = message.requestObject;
	}
});
	
// PHONE INTERACTION 
Handler.bind("/getTrick", {
	onInvoke: function(handler, message) {
		message.status = 200;
		message.responseText = JSON.stringify( { "trick" : lastTrickPerformed } );
		lastTrickPerformed = undefined;
	}
});

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.invoke(new MessageWithObject("pins:/sensorArray/read?repeat=off&interval=100&callback=/readSensors"));
		application.shared = false;
	},
})

application.invoke(pinMessage);
application.invoke(new MessageWithObject("pins:/sensorArray/read?repeat=on&interval=100&callback=/readSensors"));
application.behavior = new ApplicationBehavior();