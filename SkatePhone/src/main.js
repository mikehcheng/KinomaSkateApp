// PHONE MAIN

var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");

deviceURL = "";
var receivedTrick = undefined;

var labelStyle = new Style( { font: "20px", color:"black" } );
var whiteSkin = new Skin( { fill:"white" } );
var titleStyle = new Style( { font: "bold 40px", color:"black" } );

Handler.bind("/startPolling", {
    onInvoke: function(handler, message){
    	trace("Attempting Poll\n");
		handler.invoke(new Message(deviceURL + "getTrick"), Message.JSON);
	},
	onComplete: function(content, message, json){
		if (json.trick != undefined)
			trickOne.string = json.trick;
     	application.invoke( new Message("/delay"));
    }
});

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(500);
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/startPolling"));
    }
});

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		trace("Found the device\n");
		handler.invoke(new Message("/startPolling"));
	},
}));

var trickOne = new Label({left:0, right:0, height:30, string:"", style: labelStyle});

var mainColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
	contents: [
		new Label({left:0, right:0, height:40, string:"Skatey", style: titleStyle}),
		new Picture({aspect: "fill", height:70, top: 15, width: 70, url: "icon_skateboard.png"}),
		new Label({left:0, right:0, height:10, top: 25, string:"Learn, Compete, Skate.", style: labelStyle}),
		new Label({left:0, right:0, height:10, top: 45, string:"Previous Trick:", style: labelStyle}),
		trickOne,
	]
});

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("skatedevice");
	},
	onQuit: function(application) {
		application.forget("skatedevice");
	},
})

application.behavior = new ApplicationBehavior();
application.add(mainColumn);

