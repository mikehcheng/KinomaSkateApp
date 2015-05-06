// LIGHTS CODE

function resetColors() {
	application.invoke(new Message(deviceURL + "resetBoard"));
}

function setColors(colorDict) {
	var msg = new Message(deviceURL + "colorBoard");
	msg.requestText = JSON.stringify(colorDict);
	application.invoke(msg, Message.JSON);
}

var shadedBlueBorderSkin = new Skin({fill:"#663498db", borders: {top:2, bottom:2, left:2, right:2}, stroke: "#3498db"});
var selectedIndex = -1;
var colorTextButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top: 10, skin: blueBorderSkin,
	contents: [
		new Text({string: $.text, left:0, right:0, top:3, bottom: 3})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: {value : function(button) {
			if (selectedIndex != button.index) { //if this doesn't work, hardcode some index and keep running list of buttons
				if (selectedIndex != -1) { button.container[selectedIndex].skin = blueBorderSkin; }
				button.skin = shadedBlueBorderSkin;
				selectedIndex = button.index;
				trace("Attempting to color\n");
				setColors($.colorDict);
			} else {
				trace("Resetting color\n");
				button.skin = blueBorderSkin;
				resetColors();
				selectedIndex = -1;
			}
		}}
	})
}})

ollieSteps = [
	"1. Position your back foot near the tail of the board, and your front foot near the middle.",
	"2. Jump first with your front foot.",
	"3. Immediately after, jump with your back foot.",
	"4. Push down on the front of the board to level it.",
]

ollieColors = [
	{'tl': 'green', 'bl': 'green', 'trc': 'green', 'brc': 'green'},
	{'tl': 'yellow', 'bl': 'yellow', 'trc': 'green', 'brc': 'green'},
	{'trc': 'yellow', 'brc': 'yellow'},
	{'tlc': 'green', 'blc': 'green'},
]


// ORIGINAL INSERTS
var yellowSkin = new Skin({fill:"#ECF0F1"}); 
var basicLabel = new Line({top: 40, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 5,string: "Basics", style: titleStyle}),
                
			]
		}); 
		
var ollieLabel = new Line({top: 40, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                 new Label({top: 10, left: 5,string: "Ollie", style: titleStyle}),
                
			]
		}); 
		
var ollieInsert = new Line({left:0, right:0, height:107, active:true, 
    		contents: [
    			new OllieButton(),
    			
		  	],	  	
    	});

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
	 left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin, contents:[
	 	new headerBarTemplateWithBack({header: "Basics", index:13}),
		ollieInsert,		
		kickInsert,		
		grindInsert,		
		boardInsert,	
		manualInsert,
		new Container({top:7, bottom:55}),
		new navBar({index:13})
	 ]});

var mainColumnTrick3 =  new Column({
	left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin, contents:[
	 	new headerBarTemplateWithBack({header: "Ollie", index:14}),
	 	new Column({top:0, left:0, right:0, skin: whiteSkin, contents:[
	 		olliePic,
	 		new Label({top: 5, left: 5, string: "Steps:", style: miniTitleStyle}),
	 		new colorTextButton({text: ollieSteps[0], colorDict: ollieColors[0]}),
	 		new colorTextButton({text: ollieSteps[1], colorDict: ollieColors[1]}),
	 		new colorTextButton({text: ollieSteps[2], colorDict: ollieColors[2]}),
	 		new colorTextButton({text: ollieSteps[3], colorDict: ollieColors[3]}),
	 	]}),
	 	new Container({top:7, bottom:55}),
	 	new navBar({index:14})
	]});