// LIGHTS 

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
		new Text({string: $.text, left:0, right:0, top:3, bottom: 3, style: title2Style})
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

// TRICK MANUAL 

var mainColumnTrick1;
var mainColumnTrick2
var mainColumnTrick3;
    	
var tableEntryButton = BUTTONS.Button.template(function($){ return{
	left: 5, right:5, top:5, height:45, skin: blueBorderSkin,
	contents: [
		new Label({left:5, height:45, string:$.string, style: buttonStyle}),
		new Label({top: 15, right: 5,string: ">", style: buttonStyle}),
	],
	behavior: $.behavior
}}); 

var basicsButtonBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		mainColumnTrick2 = basicsColumn;
    		application.remove(mainColumnTrick1);
    		application.add(mainColumnTrick2);
        }}
     });
     
var ollieButtonBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		mainColumnTrick3 = ollieColumn;
    		ollieVid.time = 0;
    		application.remove(mainColumnTrick2);
    		application.add(mainColumnTrick3);
        }}
     });

var unimplementedBasicBehavior =  Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: { value: function(button){
    		mainColumnTrick2 = createNotImplementedColumn(button.first.string, 13)
    		application.remove(mainColumnTrick1);
    		application.add(mainColumnTrick2);
        }}
     });

var unimplementedOllieBehavior = Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: { value: function(button){
     		mainColumnTrick3 = createNotImplementedColumn(button.first.string, 14)
    		application.remove(mainColumnTrick2);
    		application.add(mainColumnTrick3);
     	}}
     });
    	
var mainColumnTrick1 = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin,
	 contents: [
	    new headerBarTemplate({header:"Trick Manual"}),
	    
	    new Label({top: 5, left: 8,string: "Levels:", style: label2Style}),
    	new tableEntryButton({string: "Basics", behavior: basicsButtonBehavior}),
    	new tableEntryButton({string: "Intermediate", behavior: unimplementedBasicBehavior}),
    	new tableEntryButton({string: "Advanced", behavior: unimplementedBasicBehavior}),
    	new tableEntryButton({string: "Custom", behavior: unimplementedBasicBehavior}),

    	new Label({top: 10, left: 8,string: "Popular Tricks:", style: label2Style}),
    	new tableEntryButton({string: "Fakie", behavior: unimplementedBasicBehavior}),
    	new tableEntryButton({string: "Noseslide", behavior: unimplementedBasicBehavior}),
    	new tableEntryButton({string: "Tailslide", behavior: unimplementedBasicBehavior}),
    	
    	new Container({top:7, bottom:55}),
    	new navBar({index:12})
    ]
});
    	
var basicsColumn = new Column({
	 left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin, contents:[
	 	new headerBarTemplateWithBack({header: "Basics", index:13}),
		new tableEntryButton({string: "Ollie", behavior: ollieButtonBehavior}),	
		new tableEntryButton({string: "Kickflip", behavior: unimplementedOllieBehavior}),
		new tableEntryButton({string: "50-50 Grind", behavior: unimplementedOllieBehavior}),
		new tableEntryButton({string: "Boardslide", behavior: unimplementedOllieBehavior}),
		new tableEntryButton({string: "Pop Shuv-it", behavior: unimplementedOllieBehavior}),
		new Container({top:7, bottom:55}),
		new navBar({index:13})
	 ]
});

//var olliePic = new Picture({aspect: "fill", height:130, left: 10, right:10, top: 15, width: 150, url: "resources/ollie.png"}),

// VIDEO SOURCE: https://www.youtube.com/watch?v=Jig3uiYsb4w
var ollieVid = new Media({aspect: "fill", height:130, left:10, right:10, top:15, width: 150, url: "resources/ollie.mp4",
		behavior: Object.create( Behavior.prototype, {
			onLoaded: {value: function(media) {
				media.start();
				//media.state = media.PAUSED;
			}}, 
			onFinished: {value: function(media) {
				media.time = 0;
			}}, 
		})
});
var ollieColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin, contents:[
	 	new headerBarTemplateWithBack({header: "Ollie", index:14}),
	 	new Column({top:0, left:0, right:0, skin: whiteSkin, contents:[
	 		ollieVid,
	 		new Label({top: 5, left: 5, string: "Steps:", style: miniTitleStyle}),
	 		new colorTextButton({text: ollieSteps[0], colorDict: ollieColors[0]}),
	 		new colorTextButton({text: ollieSteps[1], colorDict: ollieColors[1]}),
	 		new colorTextButton({text: ollieSteps[2], colorDict: ollieColors[2]}),
	 		new colorTextButton({text: ollieSteps[3], colorDict: ollieColors[3]}),
	 	]}),
	 	new Container({top:7, bottom:55}),
	 	new navBar({index:14})
	]
});

// indexOfLevel = 13 if on level with basics, 14 if on level with ollie
function createNotImplementedColumn(title, indexOfLevel) { return new Column({
	left: 0, right: 0, top: 0, bottom: 0, skin:cloudSkin, contents:[
		new headerBarTemplateWithBack({header: title, index: indexOfLevel}),
		new Text({top: 55, bottom:60, left:10, right:10, style: title2Style,
			string: "We have not included this screen in the final trick manual. " +
					"For a representative example, navigate to Basics > Ollie."}),
		new navBar({index: indexOfLevel})
	]
})};