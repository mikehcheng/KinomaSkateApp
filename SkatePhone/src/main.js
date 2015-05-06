//@program
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders'); 
var blackSkin = new Skin({ fill: "black"});
var graySkin = new Skin({fill: "#3F3F3F"});
var whiteSkin = new Skin({fill: "white"});
var blueSkin = new Skin({ fill: "#4169E1"});
var titleStyle = new Style( { font: "bold 25px", color:"white", horizontal:"center"});
var title2Style = new Style( { font: "20px", color:"black", horizontal:"center"});
var labelStyle = new Style( { font: "20px", color:"black" } );
var buttonStyle = new Style( { font: "bold 25px", color:"black" } );
var miniTitleStyle = new Style( { font: "bold 28px", color:"black"} );
var textStyle = new Style( { font: "bold 25px", color:"blue"} );
var backButtonStyle = new Style( {font: "bold 35px", color:"white", horizontal:"right"} );

deviceURL = "";
var receivedTrick = undefined;

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		trace("Found the device\n");
		handler.invoke(new Message("/startPolling"));
	},
}));

include	("navBar.js");
include	("trickButtons.js");
include	("inserts.js");
include ("data.js");
include ("home.js");
include ("profile.js");
include ("runOverview/game.js");
include	("runOverview/run.js");

var map = new Texture('resources/map.png');
var mapSkin = new Skin(map, {x:0,y:0, height: 430, width:320});
 
include ("gameOpponentOverview/createGameOpponent.js");
include ("gameOpponentOverview/opponentLists.js");

//map screen which you go to if you click on the map button

var buttonText = new Style({font:"bold 15px", color:"white"});
var checkins = "50";
var checkButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:55, bottom:15, left:15, right:15, skin: new Skin({fill:"#7FB27F"}),
  contents:[
    new Label({left:0, right:0, height:15, string:$.textForLabel, style:buttonText})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      trace("Button was tapped.\n");
      checkins = (parseInt(checkins) + 1).toString();
      popup.checkinnum.string = "Hot! - " + checkins + " check-ins";
    }},
  })
}});

var checkbutton = new checkButtonTemplate({textForLabel:"Check In"});

var popupStyle = new Style( { font: "15px", color:"black"} );
var popup = new Container({top:240, bottom:70, left: 95, right:60, skin:blueSkin,
	contents: [
		new Label({top:1,left:5, string: "Berkeley Skate Park", height:15,style: popupStyle}),
		new Label({top:15,left:5, string: "1100 Channing Way", height:15, style: popupStyle}),
		new Label({top:35,left:5, height:15, name: "checkinnum", string: "Hot- " + checkins + " check-ins", style: popupStyle}),
		checkbutton
	]
})

var popped = false;

var mapline = new Line({top:5, bottom:5, left:15, right:15, height:400, skin: mapSkin, active:true, name: "map",
    		  contents:[
    			medlocLabel,
    		  ],
    		behavior:  Object.create(Behavior.prototype, {
 			 	onTouchEnded: {value:  function(line, id, x, y, ticks){
   					 trace("You touched at: " + x + ", " + y + "\n");
   					 if (x > 340 && x < 388 && y > 541 && y < 589 ) {
   					 	if (popped == false){
   					 		mainColumnMap.map.add(popup);
   					 		popped = true;
   					 	}
   					 	else {
   					 		mainColumnMap.map.remove(popup);
   					 		popped = false;
   					 	};
   					 	//application.remove(mainColumnMap);
   					 	//application.add(mainColumnMapCheck);
   					 }
   					 else{
   					 	if (popped == true) {
   					 		mainColumnMap.map.remove(popup);
   					 		popped = false;
   					 	}
   					
   					}
  				}}
			})
    	});

var m =  new Column({left:5,right:5,top:5,bottom:5, active:true, skin:blueBorderSkin,contents:[
        	mapline,
        ]
       });

//map screen 1
var mainColumnMap = new Column({
    left: 0, right: 0, top: 0, bottom: 0, active: true, skin: cloudSkin,
    contents: [
        new headerBarTemplate({header:"Nearest Skate Parks"}),
       	m,
    	new navBar({index: 1})
    ]
 });
 

// home screen - 2
// createHome()

// choose game type 3
// in createGameOpponent.js

//choose opponent 4
// in createGameOpponent.js

//Friends list 5
// in opponentLists.js

//Community List 6
// in opponentLists.js

// New Game 7
// reference with gameCon

// Midrun 8
// reference with activeRunCon, built dynamically

//Active Game Overview List 9
// see 7

//Finished Run 10
// reference with inactiveGameCon, built dynamically

// Active Game my Run2 11
// see 9

//Trick 1  12
var mainColumnTrick1 = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin,
	 contents: [
	    manualLabel = new headerBarTemplate({header:"Trick Manual"}),
	    popularLabel = new Label({top: 5, left: 8,string: "Levels:", style: label2Style}),
    	
    	basicButton = new Line({left:0, right:0, height:53, active:true, 
    		contents: [
    			new BasicButton(),
    			
		  	],	  	
    	}),
    	intermediateButton = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new IntermediateButton(),
		  	],	  	
    	}),
    	advancedButton = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new AdvancedButton(),
		  	],	  	
    	}),
    	customButton = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new CustomButton(),
		  	],	  	
    	}),
    	popularLabel = new Label({top: 10, left: 8,string: "Popular Tricks:", style: label2Style}),
    	
    	fakieButton = new Line({top: 0, left:0, right:0, height:107, active:true,  
    		contents: [
    			new FakieButton(),
		  	],	  	
    	}),
    	noseButton = new Line({top: -69, left:0, right:0, height:30, active:true, 
    		contents: [
    			new NoseSlideButton(),
		  	],	  	
    	}),
    	
    	tailButton = new Line({top: 6, left:0, right:0, height:30, active:true, 
    		contents: [
    			new TailSlideButton(),
		  	],	  	
    	}),
    	new Container({top:7, bottom:55}),
    	originalNav = new navBar({index:12})
    ]
})

// profile 15
// create with createProfile()

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("skatedevice");
	},
	onQuit: function(application) {
		application.forget("skatedevice");
	},
})

application.behavior = new ApplicationBehavior();
createHome();

