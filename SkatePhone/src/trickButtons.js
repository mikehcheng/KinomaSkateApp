// KPR Script file
var manualLabel;
var basicButton;
var intermediateButton;
var advancedButton;
var customButton;
var popularLabel;
var fakieButton;
var noseButton;
var tailButton;
var originalNav;
var royalBlueSkin = new Skin({ fill: "#3598DB"}); 
var greenSkin = new Skin({fill: "#2ED07B"});
var yellowSkin = new Skin({fill:"#F2CA3C"}); 
var buttonStyle = new Style( { font: "bold 18px", color:"black" } );
var button2Style = new Style( { font: "bold 25px", color:"black" } );
var button3Style = new Style( { font: "bold 23px", color:"black" } );

var BasicButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: royalBlueSkin,
	contents: [
		new Label({left:5, height:45, string:"Basics", style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			application.add(mainColumnTrick2);
			application.remove(mainColumnTrick1);
		}},
	})
}});

var IntermediateButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: greenSkin,
	contents: [
		new Label({left:5, height:45, string:"Intermediate", style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var AdvancedButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: royalBlueSkin,
	contents: [
		new Label({left:5, height:45, string:"Advanced", style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var CustomButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: greenSkin,
	contents: [
		new Label({left:5, height:45, string:"Custom Tricks", style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var FakieButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: yellowSkin,
	contents: [
		new Label({left:5, height:45, string:"Fakie", style: button2Style}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var NoseSlideButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: royalBlueSkin,
	contents: [
		new Label({left:5, height:45, string:"Noseslide", style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var TailSlideButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:50, skin: yellowSkin,
	contents: [
		new Label({left:5, height:45, string:"Tailslide", style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});


////////////Basic Buttons////////////
var olliePic = new Picture({aspect: "fill", height:130, left: 10, right:10, top: 15, width: 180, url: "resources/ollie.png"}),


var OllieButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:70, skin: greenSkin,
	contents: [
		new Label({left:5, height:65, string:"Ollie", style: button3Style}),
		new Label({top: 20, right: 5,string: ">", style: button2Style}),
		
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			application.add(mainColumnTrick3);
			application.remove(mainColumnTrick2);	
		}},
	})
}});

var KickTurnButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:45, height:70, skin: yellowSkin,
	contents: [
		new Label({left:5, height:45, string:"Kickturn", style: button3Style}),
		new Label({top: 20, right: 5,string: ">", style: button2Style}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var GrindButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:90, height:70, skin: royalBlueSkin,
	contents: [
		new Label({left:5, height:45, string:"50-50 Grind", style: button3Style}),
		new Label({top: 20, right: 5,string: ">", style: button2Style}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var BoardSlideButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:135, height:70, skin: greenSkin,
	contents: [
		new Label({left:5, height:45, string:"Boardslide", style: button3Style}),
		new Label({top: 20, right: 5,string: ">", style: button2Style}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var ManualsButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:180, height:70, skin: royalBlueSkin,
	contents: [
		new Label({left:5, height:45, string:"Manuals", style: button3Style}),
		new Label({top: 20, right: 5,string: ">", style: button2Style}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("Not implemented.");
		}},
	})
}});

var kickTurnInsert = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new IntermediateButton(),
		  	],	  	
    	});
    	
var grindInsert = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new AdvancedButton(),
		  	],	  	
    	});
