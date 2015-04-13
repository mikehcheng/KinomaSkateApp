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
var titleStyle = new Style( { font: "bold 25px", color:"white"});
var labelStyle = new Style( { font: "20px", color:"black" } );

include	("trickButtons.js");
include	("inserts.js");
include ("data.js");
include ("home.js");
include	("navbar.js");
include ("runOverview/game.js");
include	("runOverview/run.js");

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

var map = new Texture('resources/map.png');
var mapSkin = new Skin(map, {x:0,y:0, height: 430, width:320});


/*
INDEXES FOR THE SCREENS (for buttons)
1 map
home - 2
3 choose game
4 maincolumnopp - opponent 
5 maincolumnfriendLIST - friend list
6 maincolumncommlist - community list
7 maincolumnewgame
8maincolumnmidrun
9maincolumnactiveoverview 
10 maincolumnfinrun - finished run
11 maincolumnactivegame2 

12 maincolumntrick1 - trick main pg
13 trick2 - second trick screen
14 trick 3 - third trick screen
15 maincolumnprofile
*/

var backpic = new Texture('resources/back.png');
var backpicSkin = new Skin(backpic, {x:0,y:0,height:58,width:53});
var backButtonTemplate =  BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: backpicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
     		
        	if (this.data.index == 3){
        		application.remove(mainColumnChoose);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 4){
        		application.remove(mainColumnOpp);
        		application.add(mainColumnChoose);
        	}
        	if (this.data.index == 5){
        		application.remove(mainColumnFriendList);
        		application.add(mainColumnOpp);
        	}
        	if (this.data.index == 6){
        		application.remove(mainColumnCommList);
        		application.add(mainColumnOpp);
        	}
        	/*if (this.data.index == 7){
        		application.remove(mainColumnNewGame);
        		application.add(mainColumnHome);
        	}*/
        	
        	/*if (this.data.index == 9){
        		application.remove(mainColumnActiveOverview);
        		application.add(mainColumnHome);
        	}*/
        	/*if (this.data.index == 10){
        		application.remove(mainColumnFinRun);
        		application.add(mainColumnHome);
        	}*/
        	/*if (this.data.index == 11){
        		application.remove(mainColumnActiveGame2);
        		application.add(mainColumnHome);
        	
        	}*/
        	
        	if (this.data.index == 13){
        		application.remove(mainColumnTrick2);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 14){
        		application.remove(mainColumnTrick3);
        		application.add(mainColumnTrick2);	
        	}
        	
        }}
     })
 }})

//map screen which you go to if you click on the map button

var buttonText = new Style({font:"bold 15px", color:"#333333"});
var checkins = "50";
var checkButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:55, bottom:5, left:5, right:5, height:16,
  contents:[
    new Label({left:0, right:0, height:15, string:$.textForLabel, style:buttonText})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      trace("Button was tapped.\n");
      checkins = (parseInt(checkins) + 1).toString();
      popup.checkinnum.string = "Hot- " + checkins + " check-ins";
    }}
  })
}});

var checkbutton = new checkButtonTemplate({textForLabel:"CHECK IN"});

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

//map screen 1
var mainColumnMap = new Column({
    left: 0, right: 0, top: 0, bottom: 0, active: true, skin: blackSkin,
    contents: [
        new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                
                new Label({top: 10, left: 35,string: "NEAREST SKATE PARKS", style: titleStyle})
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, skin: mapSkin, active:true, name: "map",
    		/*contents:[
    			n
    		],*/
    		behavior:  Object.create(Behavior.prototype, {
 			 	onTouchEnded: {value:  function(line, id, x, y, ticks){
   					 trace("You touched at: " + x + ", " + y + "\n");
   					 if (x > 764 && x < 814 && y > 459 && y < 501 ) {
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
    	}),
    	new navBar({index: 1})
    ]
 });
 

//home screen - 2
var mainColumnHome = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 80,string: "ACTIVE GAMES", style: titleStyle})
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	new navBar({index: 2})
    ]
	
})

// choose game type 3
var backButton3 = new backButtonTemplate({index:3});
var mainColumnChoose = new Column({
 	left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton3,
                 new Label({top: 10, left: 5,string: "CHOOSE GAME", style: titleStyle})
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	new navBar({index: 3})
    ]
})



//choose opponent 4
var backButton4 = new backButtonTemplate({index:4});
var mainColumnOpp = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton4,
                 new Label({top: 10, left: 5,string: "CHOOSE OPPONENT", style: titleStyle})
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	new navBar({index: 4})
    ]
})

//Friends list 5
var backButton5 = new backButtonTemplate({index:5});
var mainColumnFriendList = new Column({
 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton5,
                 new Label({top: 10, left: 5,string: "FRIENDS", style: titleStyle})
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	new navBar({index: 5})
   
    ]
})

//Community List 6
var backButton6 = new backButtonTemplate({index:6});
var mainColumnCommList = new Column({
 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton6,
                 new Label({top: 10, left: 5,string: "COMMUNITY", style: titleStyle})
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	new navBar({index: 6})
   
    ]
})

// New Game 7
// build with createHome()

// Midrun 8
// no variable associated, built dynamically

//Active Game Overview List 9
// no variable associated, built dynamically

//Finished Run 10
// no variable associated, built dynamically

//Active Game my Run2 11
// no variable associated, built dynamically

var buttonStyle = new Style( { font: "bold 25px", color:"black" } );

//Trick 1  12
var mainColumnTrick1 = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	   manualLabel = new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 5,string: "TRICK MANUAL", style: titleStyle}),
                
			]
		}),    	
    	basicButton = new Line({left:0, right:0, height:107, active:true, 
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
    	popularLabel = new Label({top: -60, left: 8,string: "Popular Tricks:", style: titleStyle}),
    	
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

