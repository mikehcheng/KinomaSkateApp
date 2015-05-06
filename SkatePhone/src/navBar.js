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
	3: "mainColumnChoose",
	4: "mainColumnOpp",
	5: "mainColumnFriendList",
	6: "mainColumnCommList",
	7: "gameCon",
	8: "activeRunCon",
	10: "inactiveRunCon",
	12: "mainColumnTrick1",
	13: "mainColumnTrick2",
	14: "mainColumnTrick3",
	15: "profileCon",
};

var backButtonTemplate =  BUTTONS.Button.template(function($){ return{
	index: $.index,
    left:0,top:0, bottom:0, height:50, width: 20,
    contents: [
        new Label({left:0, right:0, top:0, bottom:0, skin: pbBlueSkin, style:backButtonStyle, string:"<"})
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
        	if (this.data.index == 3){
        		application.remove(mainColumnChoose);
        		createHome();
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
        	if (this.data.index == 7){
        		application.remove(gameCon);
        		createHome();
        	}
        	if (this.data.index == 8){
        		application.remove(activeRunCon);
        		createGame(user.games[this.data.game]);
        	}
        	if (this.data.index == 10){
        		application.remove(inactiveRunCon);
        		createGame(user.games[this.data.game]);
        	}
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

var headerBarTemplateWithBack = Line.template(function($) { return {
	top:0, left:0, right:0, height:50, skin: pbBlueSkin, contents: [
		new backButtonTemplate({index: $.index, game: (('game' in $) ? $.game : undefined)}),
		new Label({top:0, bottom:0,left:50, right:50, style: (('tStyle' in $) ? $.tStyle : titleStyle), string: $.header}),
		new Container({right:0, top:0, bottom:0, width:20})
	]
}});

var headerBarTemplate = Line.template(function($) { return {
	top:0, left:0, right:0, height:50, skin: pbBlueSkin, contents: [
		new Label({top:0, bottom:0, left:0, right:0, style: titleStyle, string: $.header})
	]
}});

var homepic = new Texture('resources/homeIcon.png');
var homepicSkin = new Skin(homepic, {x:0,y:0, height:58, width:53});
var homepicselected = new Texture('resources/homeIconSelected.png');
var homepicSkinSelected = new Skin(homepicselected, {x:0,y:0, height:58, width:53});
var homeButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: (($.screenIndex == 2)? homepicSkinSelected : homepicSkin)})
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
var profpicselected = new Texture('resources/proficonSelected.png');
var profpicSkinSelected = new Skin(profpicselected, {x:0,y:0, height:58, width:53});
var profButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:5, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, bottom:3, height:42, skin: (($.screenIndex == 15)? profpicSkinSelected : profpicSkin)})
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
var mappicselected = new Texture('resources/mapiconSelected.png');
var mappicSkinSelected = new Skin(mappicselected, {x:0,y:0, height:58, width:53});
var mapButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, height:45, skin: (($.screenIndex == 1)? mappicSkinSelected : mappicSkin)})
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
var tutpicselected = new Texture('resources/bookiconSelected.png');
var tutpicSkinSelected = new Skin(tutpicselected, {x:0,y:0, height:58, width:53});
var tutButtonTemplate = BUTTONS.Button.template(function($){ return{
    top:2, bottom:2, left: 8,  right: 8, height:50, skin: whiteSkin,
    contents: [
        new Label({left:0, right:0, top:7, bottom: 1,height:52, skin: (($.screenIndex == 12)? tutpicSkinSelected : tutpicSkin)})
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
	bottom:0, left:0, right:0, height: 55, skin: whiteSkin,
	contents: [
		new homeButtonTemplate({screenIndex: $.index}),
		new profButtonTemplate({screenIndex: $.index}),
		new mapButtonTemplate({screenIndex: $.index}),
		new tutButtonTemplate({screenIndex: $.index}),
	]
}});
