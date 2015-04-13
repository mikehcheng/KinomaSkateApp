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

include	("trickButtons.js");
include	("inserts.js");

deviceURL = "";
var receivedTrick = undefined;

var labelStyle = new Style( { font: "20px", color:"black" } );

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


var map = new Texture('map.png');
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

var backpic = new Texture('back.png');
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

var homepic = new Texture('homeIcon.png');
var homepicSkin = new Skin(homepic, {x:0,y:0, height:58, width:53});
var homeButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: homepicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
     		if (this.data.index == 1){
        		application.remove(mainColumnMap);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 3){
        		application.remove(mainColumnChoose);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 4){
        		application.remove(mainColumnOpp);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 5){
        		application.remove(mainColumnFriendList);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 6){
        		application.remove(mainColumnCommList);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 7){
        		application.remove(mainColumnNewGame);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 8){
        		application.remove(mainColumnMidRun);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 9){
        		application.remove(mainColumnActiveOverview);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 10){
        		application.remove(mainColumnFinRun);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 11){
        		application.remove(mainColumnActiveGame2);
        		application.add(mainColumnHome);
        	
        	}
        	if (this.data.index == 12){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 13){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnHome);
        	}
        	if (this.data.index == 14){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnHome);	
        		
        	}
        	if (this.data.index == 15){
        		application.remove(mainColumnProfile);
        		application.add(mainColumnHome);	
        	}
        }}
     })
 }})
 
 
var profpic = new Texture('proficon.png');
var profpicSkin = new Skin(profpic, {x:0,y:0, height:58, width:53});
var profButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, bottom:3, height:42, skin: profpicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
     		if (this.data.index == 1){
        		application.remove(mainColumnMap);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 2){
        		application.remove(mainColumnHome);
        		application.add(mainColumnProfile);	
        	}
        	if (this.data.index == 3){
        		application.remove(mainColumnChoose);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 4){
        		application.remove(mainColumnOpp);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 5){
        		application.remove(mainColumnFriendList);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 6){
        		application.remove(mainColumnCommList);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 7){
        		application.remove(mainColumnNewGame);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 8){
        		application.remove(mainColumnMidRun);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 9){
        		application.remove(mainColumnActiveOverview);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 10){
        		application.remove(mainColumnFinRun);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 11){
        		application.remove(mainColumnActiveGame2);
        		application.add(mainColumnProfile);
        	
        	}
        	if (this.data.index == 12){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 13){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnProfile);
        	}
        	if (this.data.index == 14){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnProfile);	
        	}
        	
        	
        }}
     })
 }})
 
 
 
var mappic = new Texture('mapicon.png');
var mappicSkin = new Skin(mappic, {x:0,y:0, height:58, width:53});
var mapButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: mappicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
     		
        	if (this.data.index == 2){
        		application.remove(mainColumnHome);
        		application.add(mainColumnMap);	
        	}
        	if (this.data.index == 3){
        		application.remove(mainColumnChoose);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 4){
        		application.remove(mainColumnOpp);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 5){
        		application.remove(mainColumnFriendList);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 6){
        		application.remove(mainColumnCommList);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 7){
        		application.remove(mainColumnNewGame);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 8){
        		application.remove(mainColumnMidRun);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 9){
        		application.remove(mainColumnActiveOverview);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 10){
        		application.remove(mainColumnFinRun);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 11){
        		application.remove(mainColumnActiveGame2);
        		application.add(mainColumnMap);
        	
        	}
        	if (this.data.index == 12){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 13){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnMap);
        	}
        	if (this.data.index == 14){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnMap);	
        	}
        	if (this.data.index == 15){
        		application.remove(mainColumnProfile);
        		application.add(mainColumnMap);
        	}
        }}
        	
       })
 }})
 
 
 
var tutpic = new Texture('bookicon.png');
var tutpicSkin = new Skin(tutpic, {x:0,y:0, height:58, width:53});
var tutButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 8,  right: 8, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, top:7, bottom: 1,height:52, skin: tutpicSkin})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
     		if (this.data.index == 1){
        		application.remove(mainColumnMap);
        		application.add(mainColumnTrick1);
        	
        	}
        	if (this.data.index == 2){
        		application.remove(mainColumnHome);
        		application.add(mainColumnTrick1);	
        	}
        	if (this.data.index == 3){
        		application.remove(mainColumnChoose);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 4){
        		application.remove(mainColumnOpp);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 5){
        		application.remove(mainColumnFriendList);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 6){
        		application.remove(mainColumnCommList);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 7){
        		application.remove(mainColumnNewGame);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 8){
        		application.remove(mainColumnMidRun);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 9){
        		application.remove(mainColumnActiveOverview);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 10){
        		application.remove(mainColumnFinRun);
        		application.add(mainColumnTrick1);
        	}
        	
        	if (this.data.index == 11){
        		application.remove(mainColumnActiveGame2);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 13){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnTrick1);
        	}
        	if (this.data.index == 14){
        		application.remove(mainColumnTrick1);
        		application.add(mainColumnTrick1);	
        	}
        	if (this.data.index == 15){
        		application.remove(mainColumnProfile);
        		application.add(mainColumnTrick1);
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
var homeButton1 = new homeButtonTemplate({index: 1});
var profButton1 = new profButtonTemplate({index: 1});
var mapButton1 = new mapButtonTemplate({index: 1});
var tutButton1 = new tutButtonTemplate({index: 1});

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
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton1,
    			profButton1,
    			mapButton1,
    			tutButton1
    		]
    	}),
   
    ]
 });
 

//home screen - 2
var homeButton2 = new homeButtonTemplate({index: 2});
var profButton2 = new profButtonTemplate({index: 2});
var mapButton2 = new mapButtonTemplate({index: 2});
var tutButton2 = new tutButtonTemplate({index: 2});
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
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton2,
    			profButton2,
    			mapButton2,
    			tutButton2
    		]
    	})
   
    ]
	
})

// choose game type 3
var homeButton3 = new homeButtonTemplate({index: 3});
var profButton3 = new profButtonTemplate({index: 3});
var mapButton3 = new mapButtonTemplate({index: 3});
var tutButton3 = new tutButtonTemplate({index: 3});
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
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton3,
    			profButton3,
    			mapButton3,
    			tutButton3
    		]
    	})
   
    ]
})



//choose opponent 4
var homeButton4 = new homeButtonTemplate({index: 4});
var profButton4 = new profButtonTemplate({index: 4});
var mapButton4 = new mapButtonTemplate({index: 4});
var tutButton4 = new tutButtonTemplate({index: 4});
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
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton4,
    			profButton4,
    			mapButton4,
    			tutButton4
    		]
    	})
   
    ]
})

//Friends list 5
var homeButton5 = new homeButtonTemplate({index: 5});
var profButton5 = new profButtonTemplate({index: 5});
var mapButton5 = new mapButtonTemplate({index: 5});
var tutButton5 = new tutButtonTemplate({index: 5});
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
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton5,
    			profButton5,
    			mapButton5,
    			tutButton5
    		]
    	})
   
    ]
})

//Community List 6
var homeButton6 = new homeButtonTemplate({index: 6});
var profButton6 = new profButtonTemplate({index: 6});
var mapButton6 = new mapButtonTemplate({index: 6});
var tutButton6 = new tutButtonTemplate({index: 6});
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
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton6,
    			profButton6,
    			mapButton6,
    			tutButton6
    		]
    	})
   
    ]
})

//New Game 7
var homeButton7 = new homeButtonTemplate({index: 7});
var profButton7 = new profButtonTemplate({index: 7});
var mapButton7 = new mapButtonTemplate({index: 7});
var tutButton7 = new tutButtonTemplate({index: 7});
var mainColumnNewGame = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
               
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton7,
    			profButton7,
    			mapButton7,
    			tutButton7
    		]
    	})
   
    ]
})

//midrun   8
var homeButton8 = new homeButtonTemplate({index: 8});
var profButton8 = new profButtonTemplate({index: 8});
var mapButton8 = new mapButtonTemplate({index: 8});
var tutButton8 = new tutButtonTemplate({index: 8});
var mainColumnMidRun = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton8,
    			profButton8,
    			mapButton8,
    			tutButton8
    		]
    	})
   
    ]
})

//Active Game Overview List 9
var homeButton9 = new homeButtonTemplate({index: 9});
var profButton9 = new profButtonTemplate({index: 9});
var mapButton9 = new mapButtonTemplate({index: 9});
var tutButton9 = new tutButtonTemplate({index: 9});
var mainColumnActiveOverview = new Column({
 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton9,
    			profButton9,
    			mapButton9,
    			tutButton9
    		]
    	})
   
    ]
})

//Finished Run 10
var homeButton10 = new homeButtonTemplate({index: 10});
var profButton10 = new profButtonTemplate({index: 10});
var mapButton10 = new mapButtonTemplate({index: 10});
var tutButton10 = new tutButtonTemplate({index: 10});
var mainColumnFinRun = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton10,
    			profButton10,
    			mapButton10,
    			tutButton10
    		]
    	})
   
    ]
})

//Active Game my Run2 11
var homeButton11= new homeButtonTemplate({index: 11});
var profButton11 = new profButtonTemplate({index: 11});
var mapButton11 = new mapButtonTemplate({index: 11});
var tutButton11 = new tutButtonTemplate({index: 11});
var mainColumnActiveGame2 = new Column({
 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton11,
    			profButton11,
    			mapButton11,
    			tutButton11
    		]
    	})
   
    ]
})

var buttonStyle = new Style( { font: "bold 25px", color:"black" } );




//Trick 1  12
var homeButton12 = new homeButtonTemplate({index: 12});
var secondHome = new homeButtonTemplate({index: 13});
var thirdHome = new homeButtonTemplate({index: 14});

var profButton12 = new profButtonTemplate({index: 12});
var secondProf = new profButtonTemplate({index: 13});
var thirdProf = new profButtonTemplate({index: 14});

var mapButton12= new mapButtonTemplate({index: 12});
var secondMap= new mapButtonTemplate({index: 13});
var thirdMap= new mapButtonTemplate({index: 14});

var tutButton12 = new tutButtonTemplate({index: 12});
var secondTut = new tutButtonTemplate({index: 13});
var thirdTut = new tutButtonTemplate({index: 14});


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
    	 	
    	originalNav = new Line({top:148, bottom:0, left:0, right:0, height: 50, skin: graySkin,
    		contents:[
    			homeButton12,
    			profButton12,
    			mapButton12,
    			tutButton12
    		]
    	})
   
    ]
})



//profile 15
var homeButton15 = new homeButtonTemplate({index: 15});
var profButton15 = new profButtonTemplate({index: 15});
var mapButton15 = new mapButtonTemplate({index: 15});
var tutButton15 = new tutButtonTemplate({index: 15});

var mainColumnProfile = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 5,string: "PROFILE", style: titleStyle})
                
			]
		}),    	
    	new Line({top:3, left:0, right:0, height:430, active:true, 
    			
    	}),
    	
    	  	
    	new Line({top:3, bottom:0, left:0, right:0, height: 57, skin: graySkin,
    		contents:[
    			homeButton15,
    			profButton15,
    			mapButton15,
    			tutButton15
    		]
    	})
   
    ]
})



var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("skatedevice");
	},
	onQuit: function(application) {
		application.forget("skatedevice");
	},
})

application.behavior = new ApplicationBehavior();
application.add(mainColumnMap);
