var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders'); 
var smallTextStyle = new Style( { font: "bold  13px", color:"black"} );
var gameTitleStyle = new Style( { font: "bold 28px", color:"#3498db"} );
var pbBlueSkin = new Skin({ fill: "#3498db"}); //#4169E1
var gsGreenSkin = new Skin({ fill: "#16a085"});
var turSkin = new Skin({fill: "#1abc9c"});
var steelBlueSkin = new Skin({fill:"#76DEA2"}); //#4682B4



var trickContestTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:30, bottom:0, left: 5,  right: 5, height:40, skin: blueBorderSkin,
    contents: [
        new Picture({aspect: "fill", left: 34, height:30, width: 55, url: "resources/skateboard.png"}),
        new Label({top: 35, left: 118, string: "Trick Contest", style: gameTitleStyle}),
        new Label({top: 69, left: 110, string: "Perform tricks with other skaters", style: smallTextStyle})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		application.remove(mainColumnChoose);
    		application.add(mainColumnOpp);
        }}
     })
 }})

var skateGameTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:15, bottom:7, left: 5,  right: 5, height:50, skin: blueBorderSkin,
    contents: [
        new Picture({aspect: "fill", left: 36, height:70, width: 70, url: "resources/horse.png"}),
        new Label({top: 40, left: 143, string: "S.K.A.T.E", style: gameTitleStyle}),
        new Label({top: 74, left: 102, string: "Mimic or outperform your opponent", style: smallTextStyle})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		trace("Not implemented\n");
        }}
     })
 }})
 
 var battleRoyaleTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:10, bottom:15, left: 5,  right: 5, height:50, skin: blueBorderSkin,
    contents: [
        new Picture({aspect: "fill", left: 39, height:70, width: 70, url: "resources/battle.png"}),
        new Label({top: 35, left: 119,string: "Battle Royale", style: gameTitleStyle}),
        new Label({top: 69, left: 130, string: "Be the first to land a trick", style: smallTextStyle})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		trace("Not implemented\n");
        }}
     })
 }})

// choose game type 3
var trickContestGameType = new trickContestTemplate({index: 3});
var skateGameType = new skateGameTemplate({index: 3});
var battleRoyaleGameType = new battleRoyaleTemplate({index: 3});
var mainColumnChoose = new Column({
 	left: 0, right: 0, top: 0, bottom: 0, skin: cloudSkin,
	 contents: [
	    new headerBarTemplateWithBack({header:"CHOOSE GAME", index:3}),	
    	new Line({top:3, left:0, right:0, height:142, active:true, 
    		contents:[
    			trickContestGameType,
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:141, active:true, 
    		contents:[
    			skateGameType,
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:141, active:true, 
    		contents:[
    			battleRoyaleGameType,
    		]
    	}),
        new navBar({index:3})
    ]
})

var friendsButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:30, bottom:10, left: 5,  right: 5, height:50, skin: blueBorderSkin,
    contents: [
        new Picture({aspect: "fill", left: 64, height:70, width: 70, url: "resources/friends.png"}),
        new Label({top: 80, left: 144,string: "Friends", style: gameTitleStyle})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		application.remove(mainColumnOpp);
    		application.add(mainColumnFriendList);
        }}
     })
 }})

var communityButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:5, bottom:30, left: 5,  right: 5, height:50, skin: blueBorderSkin,
    contents: [
        new Picture({aspect: "fill", left: 44, height:70, width: 70, url: "resources/global.png"}),
        new Label({top: 80, left: 135,string: "Community", style: gameTitleStyle})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		application.remove(mainColumnOpp);
    		application.add(mainColumnCommList);
        }}
     })
 }})

//choose opponent 4
var friendsButton = new friendsButtonTemplate({index: 4});
var communityButton = new communityButtonTemplate({index: 4});
var backButton4 = new backButtonTemplate({index:4});
var mainColumnOpp = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, skin: cloudSkin,
	 contents: [
	  	new headerBarTemplateWithBack({header:"Opponents", index:4}), 	
    	new Line({top:3, left:0, right:0, height:212, active:true, 
    		contents:[
    			//new friendsButtonTemplate({index: 4}),
    			//new Label({top: 10, left: 5,string: "CHOOSE", style: titleStyle}),
    			friendsButton,
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:212, active:true, 
    		contents:[
    			//new Label({top: 10, left: 5,string: "OPPONENT", style: titleStyle})
    			communityButton,
    		]
    	}),
    	
    	new navBar({index: 4})
   
    ]
})