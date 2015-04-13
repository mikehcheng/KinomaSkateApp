/*
INDEXES FOR THE SCREENS (for buttons)
1 map
2 home
3 choose game
4 maincolumnopp - opponent 
5 maincolumnfriendLIST - friend list
6 maincolumncommlist - community list
7 maincolumnewgame
8 maincolumnmidrun
9 maincolumnactiveoverview = 7
10 maincolumnfinrun - finished run
11 n/a = 7
12 maincolumntrick1 - trick main pg
13 trick2 - second trick screen = 12
14 trick3 - third trick screen = 12
15 maincolumnprofile
*/

var screenDictionary = {
	1: "mainColumnMap",
	2: "homeCon",
	7: "gameCon",
	8: "activeRunCon",
	10: "inactiveRunCon",
	12: "mainColumnTrick1",
	15: "profileCon", //not implemented
};

var iconTemplate = Skin.template(function($) { return {
	texture: new Texture($.source), bounds: {x:0, y:0, height:58, width:53}
}});

var homepic = new Texture('resources/homeIcon.png');
var homepicSkin = new Skin.template(homepic, {x:0,y:0, height:58, width:53});
var homeButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: homepicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	screenIndex: $.screenIndex,
     	onTap: {value : function(button){
     		if($.screenIndex != 2) {
     			createHome();
     			application.remove(eval(screenDictionary[$.screenIndex]));
     		}
        }}	
     })
 }})
 
 
var profpic = new Texture('resources/proficon.png');
var profpicSkin = new Skin(profpic, {x:0,y:0, height:58, width:53});
var profButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, bottom:3, height:42, skin: profpicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	screenIndex: $.screenIndex,
     	onTap: {value : function(button){
     		if($.screenIndex != 15) {
     			createProfile();
     			application.remove(eval(screenDictionary[$.screenIndex]));
     		}
        }}	
     })
 }})
 
 
 
var mappic = new Texture('resources/mapicon.png');
var mappicSkin = new Skin(mappic, {x:0,y:0, height:58, width:53});
var mapButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: mappicSkin})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	screenIndex: $.screenIndex,
     	onTap: {value : function(button){
     		if($.screenIndex != 1) {
     			application.add(mainColumnMap);
     			application.remove(eval(screenDictionary[$.screenIndex]));
     		}
        }}	
	})
}})
 
 
 
var tutpic = new Texture('resources/bookicon.png');
var tutpicSkin = new Skin(tutpic, {x:0,y:0, height:58, width:53});
var tutButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 8,  right: 8, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, top:7, bottom: 1,height:52, skin: tutpicSkin})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	screenIndex: $.screenIndex,
     	onTap: {value : function(button){
     		if($.screenIndex != 12) {
     			application.add(mainColumnTrick1);
     			application.remove(eval(screenDictionary[$.screenIndex]));
     		}
        }}	
	})
}})

var navBar = Line.template(function($) { return {
	bottom:0, left:0, right:0, height: 55, skin: graySkin,
	contents: [
		new homeButtonTemplate({screenIndex: $.index}),
		new profButtonTemplate({screenIndex: $.index}),
		new mapButtonTemplate({screenIndex: $.index}),
		new tutButtonTemplate({screenIndex: $.index}),
	]
}});
