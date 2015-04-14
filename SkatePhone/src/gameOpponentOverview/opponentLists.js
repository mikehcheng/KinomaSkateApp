var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders'); 

/**
var TOOL = require('mobile/tool');
var MODEL = require('mobile/model');
var graySkin = new Skin({ fill: 'gray',});
//var Background = Content.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, skin: graySkin, }});
var MyMenuButton = TOOL.MenuButton.template(function($) { return { left: 0, top: 0, }});
var standardsMenuData = {
			action: "/selectStandard?standard=",
			items: [
				{ title: "Top Rated", value: "top_rated" },
				{ title: "Top Favorites", value: "top_favorites" },
				{ title: "Most Popular", value: "most_popular" },
				{ title: "Most Discussed", value: "most_discussed" },
				{ title: "Most Responded", value: "most_responded" },
			],
			selection: 0,
		};
//var background = new Background();
//application.add( background );
var menuButton = new MyMenuButton( standardsMenuData ); 
*/


/**Handler.bind("/selectStandard", Object.create(MODEL.CommandBehavior.prototype, {
	onQuery: { value: function(handler, query) {
				var selection = query.standard;
				trace( "\n selected: " + selection );
			}}
}));*/

var cathyButtonTemplate = BUTTONS.Button.template(function($){ return{
	index: $.index,
    top:2, bottom:2, left: 5,  right: 5, height:50, skin: whiteSkin,
    contents: [
		new Label({top: 6, left: 9,string: "Cathy", style: textStyle}),
		new Label({top: 6, left: 234,string: "16", style: textStyle}),
    ],
     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
     	onTap: {value : function(button){
    		application.remove(mainColumnFriendList);
    		application.add(mainColumnNewGame);
        }}
     })
 }})

//Friends list 5
var dropDown = new Line({top:20, left:0, right:0, height:50, skin:whiteSkin, active:true, 
			contents:[	
				new Picture({aspect: "fill", height:25, width: 90, top: 12, left: 110, url: "resources/dropDown.png"}),
				//menuButton
			]	
    	}),   
var cathyButton = new cathyButtonTemplate({index: 5});
var backButton5 = new backButtonTemplate({index:5});
var mainColumnFriendList = new Column({
 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  	new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton5,
                 new Label({top: 10, left: 5,string: "FRIENDS", style: titleStyle})
                
			]
		}),    	
    	dropDown,     	
    	new Line({top:3, left:0, right:0, height:40, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 10, left: 15,string: "Name", style: miniTitleStyle}),
    			new Label({top: 10, left: 100,string: "Avg Score", style: miniTitleStyle}),	
    		]
    	}),    	
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Rahul", style: textStyle}),
    			new Label({top: 6, left: 160,string: "10", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Angelica", style: textStyle}),
    			new Label({top: 6, left: 131,string: "11", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Sam", style: textStyle}),
    			new Label({top: 6, left: 176,string: "15", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 14,string: "Michael", style: textStyle}),
    			new Label({top: 6, left: 143,string: "15", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			cathyButton,	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Tom", style: textStyle}),
    			new Label({top: 6, left: 178,string: "24", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Joe", style: textStyle}),
    			new Label({top: 6, left: 184,string: "35", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 5, left: 15,string: "Sarah", style: textStyle}),
    			new Label({top: 5, left: 160,string: "55", style: textStyle}),	
    		]
    	}),
    	
    	new navBar({index:5})
    ]
})
  


//Community List 6
var dropDownComm = new Line({top:20, left:0, right:0, height:50, skin:whiteSkin, active:true, 
			contents:[	
				new Picture({aspect: "fill", height:25, width: 90, top: 12, left: 110, url: "resources/dropDown.png"}),
				//menuButton
			]	
    	}),  
var homeButton6 = new homeButtonTemplate({index: 6});
var profButton6 = new profButtonTemplate({index: 6});
var mapButton6 = new mapButtonTemplate({index: 6});
var tutButton6 = new tutButtonTemplate({index: 6});
var backButton6 = new backButtonTemplate({index:6});
var mainColumnCommList = new Column({
 left: 0, right: 0, top: 0, bottom: 0, 
	 contents: [
	  new Line({top: 0, left: 0, right:0, height: 50, skin: graySkin,
            contents:[
                backButton6,
                 new Label({top: 10, left: 5,string: "COMMUNITY", style: titleStyle})
                
			]
		}),
		dropDownComm,    	
    	new Line({top:3, left:0, right:0, height:40, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 10, left: 15,string: "Name", style: miniTitleStyle}),
    			new Label({top: 10, left: 100,string: "Avg Score", style: miniTitleStyle}),	
    		]
    	}),    	
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Kevin", style: textStyle}),
    			new Label({top: 6, left: 156,string: "10", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Natalea", style: textStyle}),
    			new Label({top: 6, left: 138,string: "11", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Joe", style: textStyle}),
    			new Label({top: 6, left: 178,string: "15", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:37, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Jennifer", style: textStyle}),
    			new Label({top: 6, left: 131,string: "15", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Helen", style: textStyle}),
    			new Label({top: 6, left: 157,string: "16", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Bob", style: textStyle}),
    			new Label({top: 6, left: 175,string: "24", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 6, left: 15,string: "Sue", style: textStyle}),
    			new Label({top: 6, left: 178,string: "35", style: textStyle}),	
    		]
    	}),
    	new Line({top:3, left:0, right:0, height:36, skin:whiteSkin, active:true, 
    		contents:[
    			new Label({top: 5, left: 15,string: "Julie", style: textStyle}),
    			new Label({top: 5, left: 167,string: "55", style: textStyle}),	
    		]
    	}),
    	
    	new navBar({index:6})
   
    ]
})