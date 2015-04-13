// KPR Script file
var homepic = new Texture('resources/homeIcon.png');
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
 
 
var profpic = new Texture('resources/proficon.png');
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
 
 
 
var mappic = new Texture('resources/mapicon.png');
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
 
 
 
var tutpic = new Texture('resources/bookicon.png');
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

var navBar = Line.template(function($) { return {
	bottom:0, left:0, right:0, height: 55, skin: graySkin,
	contents: [
		homeButtonTemplate($,{index: $.index}),
		profButtonTemplate($,{index: $.index}),
		mapButtonTemplate($,{index: $.index}),
		tutButtonTemplate($,{index: $.index}),
	]
}});
