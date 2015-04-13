// KPR Script file

function clearPage() {
		//trick manual
		mainColumnTrick1.remove(manualLabel);
		mainColumnTrick1.remove(basicButton);	
		mainColumnTrick1.remove(intermediateButton);
		mainColumnTrick1.remove(advancedButton);
		mainColumnTrick1.remove(customButton);
		mainColumnTrick1.remove(popularLabel);
		mainColumnTrick1.remove(fakieButton);
		mainColumnTrick1.remove(tailButton);
		mainColumnTrick1.remove(originalNav);		
}

function clearBasics() {
			mainColumnTrick1.remove(basicLabel);
			mainColumnTrick1.remove(ollieInsert);		
			mainColumnTrick1.remove(kickInsert);		
			mainColumnTrick1.remove(grindInsert);		
			mainColumnTrick1.remove(boardInsert);	
			mainColumnTrick1.remove(manualInsert);	
			mainColumnTrick1.remove(second);	
			
}

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

var second = new Line({top:180, bottom:0, left:0, right:0, height: 50, skin: graySkin,
    		contents:[
    		]
    	});
var third = new Line({top:78, bottom:0, left:0, right:0, height: 50, skin: graySkin,
    		contents:[
    		]
    	});
