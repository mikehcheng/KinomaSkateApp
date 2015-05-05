// KPR Script file
var royalBlueSkin = new Skin({ fill: "#66FFCC"});
var yellowSkin = new Skin({fill:"#ECF0F1"}); 
var basicLabel = new Line({top: 40, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 5,string: "BASICS", style: titleStyle}),
                
			]
		}); 
		
var ollieLabel = new Line({top: 40, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 5,string: "OLLIE", style: titleStyle}),
                
			]
		}); 
		
var ollieInsert = new Line({left:0, right:0, height:107, active:true, 
    		contents: [
    			new OllieButton(),
    			
		  	],	  	
    	});
    	
    	//10,10,5,20,5,5,5
var steps = new Label({top: 5, left: 5,string: "Steps:", style: titleStyle});
var ollieText = new Label({top: 5, left: 5,string: "1. Place your back foot on", style: title2Style, skin: yellowSkin});
var ollieText2 = new Label({top: 5, left: 5,string: "the tail of the board.", style: title2Style, skin: yellowSkin});
var ollieText3 = new Label({top: 5, left: 5,string: "2. Put your front foot", style: title2Style, skin: yellowSkin});
var ollieText4 = new Label({top: 5, left: 5,string: "between the middle and", style: title2Style, skin: yellowSkin});
var ollieText5 = new Label({top: 5, left: 5,string: "front trucks of your", style: title2Style, skin: yellowSkin});
var ollieText6 = new Label({top: 5, left: 5,string: "skateboard.", style: title2Style, skin: yellowSkin});

var kickInsert = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new KickTurnButton(),
		  	],	  	
    	});
var grindInsert = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new GrindButton(),
		  	],	  	
    	});
var boardInsert = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new BoardSlideButton(),
		  	],	  	
    	});
var manualInsert = new Line({top: -70, left:0, right:0, height:107, active:true, 
    		contents: [
    			new ManualsButton(),
		  	],	  	
    	});
    	
var mainColumnTrick2 = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, skin:whiteSkin, contents:[
	 	new headerBarTemplateWithBack({header: "BASICS", index:13}),
		ollieInsert,		
		kickInsert,		
		grindInsert,		
		boardInsert,	
		manualInsert,
		new Container({top:7, bottom:55}),
		new navBar({index:13})
	 ]});
	 
var mainColumnTrick3 =  new Column({
	 left: 0, right: 0, top: 0, bottom: 0, skin:whiteSkin, contents:[
	 	new headerBarTemplateWithBack({header: "OLLIE", index:14}),
	 	new Line({top:0, left:10, right:10, height:150, skin: royalBlueSkin,contents:[
	 		olliePic,
	 		]
	 	}),
	 	new Column({top:`0, left:10, right:10, height:300, skin: yellowSkin, contents:[
	 	new Line({top:20, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 		steps,
	 	]
	 	}),
	 	new Line({top:40, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 	ollieText,
	 	]
	 	}),
	 	new Line({top:23, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 	ollieText2,
	 	]
	 	}),
	 	new Line({top:23, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 	ollieText3,
	 	]
	 	}),
	 	new Line({top:23, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 	ollieText4,
	 	]
	 	}),
	 	new Line({top:23, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 	ollieText5,
	 	]
	 	}),
	 	new Line({top:23, left: 10, right:10, height:0, skin: yellowSkin,contents:[
	 	ollieText6,
	 	]
	 	}),
	 	]
	 	}),
	 	
	 	new Container({top:7, bottom:55}),
	 	new navBar({index:14})
	 ]});