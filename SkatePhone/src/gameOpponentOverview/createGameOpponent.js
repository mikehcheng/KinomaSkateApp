var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders'); 

var trickContestTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Picture({aspect: "fill", left: 34, height:70, width: 70, url: "resources/skateboard.jpg"}),
        new Label({top: 55, left: 118, string: "Trick Contest", style: miniTitleStyle})
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
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Picture({aspect: "fill", left: 36, height:70, width: 70, url: "resources/horse.png"}),
        new Label({top: 55, left: 119, string: "S.K.A.T.E", style: miniTitleStyle})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		trace("Not implemented\n");
        }}
     })
 }})
 
 var battleRoyaleTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Picture({aspect: "fill", left: 39, height:70, width: 70, url: "resources/battle.jpg"}),
        new Label({top: 55, left: 119,string: "Battle Royale", style: miniTitleStyle})
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
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Picture({aspect: "fill", left: 64, height:70, width: 70, url: "resources/friends.png"}),
        new Label({top: 95, left: 144,string: "Friends", style: miniTitleStyle})
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
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Picture({aspect: "fill", left: 44, height:70, width: 70, url: "resources/global.png"}),
        new Label({top: 95, left: 135,string: "Community", style: miniTitleStyle})
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
	 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton4,
                 new Label({top: 10, left: 5,string: "CHOOSE OPPONENT", style: titleStyle})
			]
		}),    	
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