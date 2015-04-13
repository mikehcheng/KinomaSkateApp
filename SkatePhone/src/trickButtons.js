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

var BasicButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Basics", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			clearPage(); 
			mainColumnTrick1.add(basicLabel);
			mainColumnTrick1.add(ollieInsert);		
			mainColumnTrick1.add(kickInsert);		
			mainColumnTrick1.add(grindInsert);		
			mainColumnTrick1.add(boardInsert);	
			mainColumnTrick1.add(manualInsert);	
			mainColumnTrick1.add(second);	
			second.add(secondHome);	
			second.add(secondProf);	
			second.add(secondMap);	
			second.add(secondTut);	
					}},
	})
}});

var IntermediateButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Intermediate", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
		}},
	})
}});

var AdvancedButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Advanced", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
		}},
	})
}});

var CustomButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Custom Tricks", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked custom");
		}},
	})
}});

var FakieButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Fakie", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked fakie");
		}},
	})
}});

var NoseSlideButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Noseslide", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked nose");
		}},
	})
}});

var TailSlideButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Tailslide", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked tail");
		}},
	})
}});


////////////Basic Buttons////////////
var olliePic = new Picture({aspect: "fill", height:100, top: 15, width: 180, url: "resources/ollie.png"}),


var OllieButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Ollie", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
		
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
				clearBasics();
				mainColumnTrick1.add(ollieLabel);	
				mainColumnTrick1.add(olliePic);
				mainColumnTrick1.add(steps);		
				mainColumnTrick1.add(ollieText);
				mainColumnTrick1.add(ollieText2);
				mainColumnTrick1.add(ollieText3);
				mainColumnTrick1.add(ollieText4);
				mainColumnTrick1.add(ollieText5);
				mainColumnTrick1.add(ollieText6);
				mainColumnTrick1.add(third);
				third.add(thirdHome);	
				third.add(thirdProf);	
				third.add(thirdMap);	
				third.add(thirdTut);				
		}},
	})
}});

var KickTurnButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Kickturn", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
		}},
	})
}});

var GrindButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"50-50 Grind", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
		}},
	})
}});

var BoardSlideButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Boardslide", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
		}},
	})
}});

var ManualsButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:30, skin: whiteSkin,
	contents: [
		new Label({left:5, height:45, string:"Manuals", style: buttonStyle}),
		new Label({top: 0, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			//content.invoke(new Message(deviceURL + "foodRefill"), Message.JSON);
			trace("clicked");
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
   
