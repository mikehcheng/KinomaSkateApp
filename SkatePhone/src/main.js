//@program

var SCROLLER = require('mobile/scroller');
var THEME = require('themes/sample/theme');
var BUTTONS = require("controls/buttons");

var blackSkin = new Skin({ fill: "black"});
var graySkin = new Skin({fill: "#3F3F3F"});
var whiteSkin = new Skin({fill: "white"});
var blueSkin = new Skin({ fill: "#4169E1"});
var cloudSkin = new Skin({fill:"#ECF0F1"});
var pbBlueSkin = new Skin({fill:"#3498db"});

var titleStyle = new Style( { font: "bold 25px", color:"white", horizontal:"center"});
var title2Style = new Style( { font: "20px", color:"black", horizontal:"center"});
var miniTitleStyle = new Style( { font: "bold 28px", color:"black"} );
var gameTitleStyle = new Style( { font: "bold 28px", color:"#3498db"} );

var textStyle = new Style( { font: "bold 25px", color:"#3498db"} );
var labelStyle = new Style( { font: "20px", color:"black" } );
var label2Style = new Style( { font: "bold 20px", color:"black" } );
var smallLabelStyle = new Style( { font: "14px", color:"black" } );
var smallTextStyle = new Style( { font: "bold  13px", color:"black"} );

var buttonStyle = new Style( { font: "bold 18px", color:"black" } );
var button2Style = new Style( { font: "bold 25px", color:"black" } );
var button3Style = new Style( { font: "bold 23px", color:"black" } );
var backButtonStyle = new Style( {font: "bold 35px", color:"white", horizontal:"right"} );

var blueBorderSkin = new Skin({fill:"white", borders: {top:2, bottom:2, left:2, right:2}, stroke: "#3498db"});
var blueBoldBorderSkin = new Skin({fill:"white", borders: {top:5, bottom:5, left:5, right:5}, stroke: "#3498db"});

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
include	("trickManual.js");
include ("data.js");
include ("home.js");
include ("profile.js");
include ("runOverview/game.js");
include	("runOverview/run.js");



include ("gameOpponentOverview/createGameOpponent.js");
include ("gameOpponentOverview/opponentLists.js");

var map = new Texture('resources/map2.png');


var mapSkin = new Skin(map, {x:0,y:0, height: 430, width:320});
var popped = false;
var parks = [{x: 90, y: 10, size: 15, height:30, width:30}, {x:150, y:70, size:30, height:40,width:40}, {x:300,y:80, size:14, height:20, width:20}];
var buttonText = new Style({font:"bold 15px", color:"blue"});
var button2Text = new Style({font:"bold 15px", color: "red"});

var smallL = new Texture('resources/1circle.png',);
var smallSkin = new Skin(smallL, {x:0,y:0,width:20,height:20});

var medL = new Texture('resources/3circle.png');
var medSkin = new Skin(medL, {x:0, y:0, width:30, height:30});

var largeL = new Texture('resources/4circle.png');
var largeSkin = new Skin(largeL, {x:0, y:0, width:40, height:40});

var currentpopup;
var checkButtonTemplate = BUTTONS.Button.template(function($){ return{
  top:55, bottom:15, left:15, right:15, skin: new Skin({fill:"white"}),
  contents:[
    new Label({left:0, right:0, height:15, string:$.textForLabel, style:$.style})
  ],
  behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    onTap: { value:  function(button){
      trace("Button was tapped.\n");
      var prev = parks[$.index].size;
      var checkins = parks[$.index].size + 1;
      parks[$.index].size= checkins;
      currentpopup.checkinnum.string = checkins + " check-ins";
      if (prev < 15 && parseInt(checkins) >= 15) {
      	 var over = new Park({skin: medSkin, top: parks[$.index].x, left: parks[$.index].y, width:30, height: 30, index: $.index}) //
    	 mapLine.add(over)
      }
      if (prev < 30 && parseInt(checkins) >= 30) {
      	var over = new Park({skin: largeSkin, top: parks[$.index].x, left: parks[$.index].y, width: 40, height: 40, index: $.index}) //
    	 mapLine.add(over)
      }
      var n = new Label({string:"Checked In", style:button2Text, skin:whiteSkin,top:55, bottom:15, left:15, right:15});
      currentpopup.add(n);
    }},
  })
}});


var popupStyle = new Style( { font: "15px", color:"black"} );
var popupTemplate = Container.template(function($) { return{
	top:$.t - 50, height:100, width:130, left:$.l + 60, skin:blueSkin,
	contents: [
		new Label({top:1,left:5, string: "Berkeley Skate Park", height:15,style: popupStyle}),
		new Label({top:15,left:5, string: "1100 Channing Way", height:15, style: popupStyle}),
		new Label({top:30,left:5, height:15, name: "checkinnum", string: parks[$.index].size + " check-ins", style: popupStyle}),
		new checkButtonTemplate({textForLabel:"Check In", style: buttonText, index:$.index})
	]
	}
});



       
var mapLine = new Container({top:5, bottom:5, left:15, right:15, height:400, skin: mapSkin,active:true, 
    		  contents:[
    	],
    	 behavior: Behavior({
    	 	onDisplayed: function(content){
    	 		if (popped == true){
    	 			mapLine.remove(currentpopup);
    	 			popped = false;
    	 		}
    	 	},
            onTouchEnded: function(content){
            	if (popped == true){
            		mapLine.remove(currentpopup);
            		popped = false;
            	}
            }
        })
    		
 });
 var m =  new Column({left:5,right:5,top:5,bottom:5, active:true, skin:blueBorderSkin,contents:[
		mapLine
        ]
       });
 

//map screen 1
var mainColumnMap = new Column({
    left: 0, right: 0, top: 0, bottom: 0, active: true, skin: cloudSkin,
    contents: [
        new headerBarTemplate({header:"Nearest Skate Parks"}),
        //m,
        m,
    	new navBar({index: 1})
    ]
 });



var Park = Content.template(function($) { return {
    top: $.top, left: $.left, width:$.width, height: $.height, skin: $.skin, index:$.index,  active: true, //population: $.population,
    behavior: Behavior({
            onTouchEnded: function(content){
            if (popped == false){
            	var x = new popupTemplate({t:$.top, l: $.left, index:$.index});
				currentpopup = x;
            	mapLine.add(x);
            	popped = true;
            }
            else{
            	mapLine.remove(currentpopup);
            	var x = new popupTemplate({t:$.top, l: $.left, index:$.index});
				currentpopup = x;
            	mapLine.add(x);
            	popped = true;
            }
           }
    })
}})


for (i=0; i < parks.length; ++i) {
    var skin = smallSkin
    if (parks[i].size >= 30) {
       skin = largeSkin
       
    }
    else if (parks[i].size >= 15) {
        skin = medSkin
    }
    var over = new Park({skin: skin, top: parks[i].x, left: parks[i].y, width: parks[i].width, height: parks[i].height, index: i}) //
    mapLine.add(over)
}


 

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
// in trickManual.js

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

