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

Handler.bind("/colorBoard", {
	onInvoke: function(handler, message) {
		
	}
});

Handler.bind("resetBoard", {
	onInvoke: function(handler, message) {
		for (var part in parts) {
			pictures[part].url = BASE_SKATE[part];
		}
	}
});

// APP LOGIC
var parts = ['tlc', 'tl', 'tr', 'trc', 'blc', 'bl', 'br', 'brc'];
var pictures = {};

var BASE_SKATE = {
	'tlc': 'resources/skatetlc.png',
	'tl': 'resources/skatetl.png',
	'tr': 'resources/skatetr.png',
	'trc': 'resources/skatetrc.png',
	'blc': 'resources/skateblc.png',
	'bl': 'resources/skatebl.png',
	'br': 'resources/skatebr.png',
	'brc': 'resources/skatebrc.png',
};

var GREEN_SKATE = {
	'tlc': 'resources/skatetlc_green.png',
	'tl': 'resources/skatetl_green.png',
	'tr': 'resources/skatetr_green.png',
	'trc': 'resources/skatetrc_green.png',
	'blc': 'resources/skateblc_green.png',
	'bl': 'resources/skatebl_green.png',
	'br': 'resources/skatebr_green.png',
	'brc': 'resources/skatebrc_green.png',
};

var YELLOW_SKATE = {
	'tlc': 'resources/skatetlc_yellow.png',
	'tl': 'resources/skatetl_yellow.png',
	'tr': 'resources/skatetr_yellow.png',
	'trc': 'resources/skatetrc_yellow.png',
	'blc': 'resources/skateblc_yellow.png',
	'bl': 'resources/skatebl_yellow.png',
	'br': 'resources/skatebr_yellow.png',
	'brc': 'resources/skatebrc_yellow.png',
};


for (var part in parts) {
	pictures[part] = new Picture({name:part, height: 146, width: 250});
}

var skateboardImageFrame = new Column({
	top:0, bottom:0, left:0, right:0, height:292, width: 1000, contents: [
		new Line({name:'topboard', contents: [
			pictures['tlc'], pictures['tl'], pictures['tr'], pictures['trc']
		]}),
		new Line({name:'bottomboard', contents: [
			pictures['blc'], pictures['bl'], pictures['br'], pictures['brc']
		]})
	]
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