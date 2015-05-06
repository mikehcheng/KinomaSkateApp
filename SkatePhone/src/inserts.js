// KPR Script file
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
    	
var steps = new Label({top: 10, left: 5,string: "Steps:", style: titleStyle});
var ollieText = new Label({top: 10, left: 5,string: "1. Place your back foot on", style: titleStyle});
var ollieText2 = new Label({top: 5, left: 5,string: "the tail of the board.", style: titleStyle});
var ollieText3 = new Label({top: 20, left: 5,string: "2. Put your front foot", style: titleStyle});
var ollieText4 = new Label({top: 5, left: 5,string: "between the middle and", style: titleStyle});
var ollieText5 = new Label({top: 5, left: 5,string: "front trucks of your", style: titleStyle});
var ollieText6 = new Label({top: 5, left: 5,string: "skateboard.", style: titleStyle});

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
	 left: 0, right: 0, top: 0, bottom: 0, contents:[
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
	 left: 0, right: 0, top: 0, bottom: 0, contents:[
	 	new headerBarTemplateWithBack({header: "OLLIE", index:14}),
	 	olliePic,
	 	steps,
	 	ollieText,
	 	ollieText2,
	 	ollieText3,
	 	ollieText4,
	 	ollieText5,
	 	ollieText6,
	 	new Container({top:7, bottom:55}),
	 	new navBar({index:14})
	 ]});