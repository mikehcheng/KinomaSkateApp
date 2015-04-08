// PHONE MAIN

var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");

deviceURL = "";
receivedTrick = false;

var labelStyle = new Style( { font: "20px", color:"black" } );
var whiteSkin = new Skin( { fill:"white" } );
var titleStyle = new Style( { font: "bold 40px", color:"black" } );

Handler.bind("/startPolling", {
    onInvoke: function(handler, message){
		handler.invoke(new Message(deviceURL + "getCount"), Message.JSON);
	},
	onComplete: function(content, message, json){
		trickOne.string = json.trick;
		//trickTwo.string = json.jsonTrickTwo;
		//trickThree.string = json.jsonTrickThree;
		thegetTrickButton.visible = true;
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
		handler.invoke(new Message(deviceURL + "getCount"), Message.JSON);
	},
	onComplete: function(content, message, json){
		trickOne.string = json.trick;
		thegetTrickButton.visible = true;
     	application.invoke( new Message("/startPolling"));
	}	
}));

var trickOne = new Label({left:0, right:0, height:30, string:"0", style: labelStyle});
//var trickTwo = new Label({left:0, right:0, height:30, string:"0", style: labelStyle});
//var trickThree = new Label({left:0, right:0, height:30, string:"0", style: labelStyle});
var getTrickButton = BUTTONS.Button.template(function($){ return{
	left: 50, right: 50, height:50, top:50,
	contents: [
		new Label({left:50, right:50, height:50, string:"Detect Trick", style: labelStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			content.invoke(new Message(deviceURL + "reset"), Message.JSON);
		}},
		onComplete: { value: function(content, message, json){
			receivedTrick = json.receivedTrick;
		}}
	})
}});
thegetTrickButton = new getTrickButton()

var mainColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
	contents: [
		new Label({left:0, right:0, height:40, string:"Skatey", style: titleStyle}),
		new Picture({aspect: "fill", height:70, top: 15, width: 70, url: "icon_skateboard.png"}),
		new Label({left:0, right:0, height:10, top: 25, string:"Learn, Compete, Skate.", style: labelStyle}),
		new Label({left:0, right:0, height:10, top: 45, string:"Trick One:", style: labelStyle}),
		trickOne,
		//new Label({left:0, right:0, height:10, top: 10, string:"Trick Two:", style: labelStyle}),
		//trickTwo,
		//new Label({left:0, right:0, height:10, top: 10, string:"Trick Three:", style: labelStyle}),
		//trickThree,
		thegetTrickButton
	]
});

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("SkateDevice.app");
	},
	onQuit: function(application) {
		application.forget("SkateDevice.app");
	},
})

application.behavior = new ApplicationBehavior();
application.add(mainColumn);

