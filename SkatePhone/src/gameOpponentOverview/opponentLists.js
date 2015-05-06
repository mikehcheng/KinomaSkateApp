var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders'); 
var textStyle = new Style( { font: "bold 25px", color:"#3498db"} );

function createGameData(player) {
	return {
		gameIndex: user.games.length,
		opName: player,
		opPic: "resources/mike.jpg",
		gameType: "Trick Contest",
		myScore: 0,
		opScore: 0,
		myTurn: 1,
		myRuns: [
		],
		opRuns: [
		],
	}
}

var opponentButtonTemplate = BUTTONS.Button.template(function($){ return{
	left: 0,  right: 0, height:40, skin:blueBorderSkin,
	contents: [
		new Label({top:6, left:15, string: $.player, style: textStyle}),
		new Label({top:6, left:237, string: $.score, style:textStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		application.remove(eval($.screen));
    		var newGame = createGameData($.player);
    		user.games.push(newGame);
    		createGame(newGame);
        }}
     })
 }})

var cathyButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:36, skin:blueBorderSkin,
    contents: [
		new Label({top: 6, left: 9,string: "Cathy", style: textStyle}),
		new Label({top: 6, left: 234,string: "16", style: textStyle}),
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		application.remove(mainColumnFriendList);
    		var newGame = {
				gameIndex: user.games.length,
				opName: "Cathy",
				opPic: "resources/mike.jpg",
				myScore: 0,
				opScore: 0,
				myTurn: 1,
				myRuns: [
				],
				opRuns: [
				],
			};
    		user.games.push(newGame);
    		createGame(newGame);
        }}
     })
 }})

var mainColumnFriendList = new Column({
 left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin,
	 contents: [
	  	new headerBarTemplateWithBack({header:"Friends", index:5}),   	  	
    	new Line({top:7, left:0, right:0, height:40, skin:cloudSkin, active:true, 
    		contents:[
    			new Label({top: 10, left: 15,string: "Name", style: miniTitleStyle}),
    			new Label({top: 10, left: 100,string: "Avg Score", style: miniTitleStyle}),	
    		]
    	}),    	
    	new opponentButtonTemplate({player: "Rahul", score: "10", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Angelica", score: "11", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Sam", score: "15", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Michael", score: "15", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Cathy", score: "16", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Tom", score: "24", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Joe", score: "35", screen: "mainColumnFriendList"}),
    	new opponentButtonTemplate({player: "Sarah", score: "55", screen: "mainColumnFriendList"}),
    	new Line({top:11, left:0, right:0, height:53, skin: cloudSkin,}),
    	new navBar({index:5})
    ]
})
  


//Community List 6
var mainColumnCommList = new Column({
 left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin,
	 contents: [
	  	new headerBarTemplateWithBack({header:"Community", index:6}),   	
    	new Line({top:7, left:0, right:0, height:40, skin: cloudSkin, active:true, 
    		contents:[
    			new Label({top: 10, left: 15,string: "Name", style: miniTitleStyle}),
    			new Label({top: 10, left: 100,string: "Avg Score", style: miniTitleStyle}),	
    		]
    	}),    	
    	new opponentButtonTemplate({player: "Kevin", score: "11", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Natalea", score: "14", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Jennifer", score: "17", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Joe", score: "18", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Helen", score: "23", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Bob", score: "27", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Sue", score: "36", screen: "mainColumnCommList"}),
		new opponentButtonTemplate({player: "Julie", score: "41", screen: "mainColumnCommList"}),
    	new Line({top:11, left:0, right:0, height:53, skin: cloudSkin,}),
    	new navBar({index:6})
    ]
})