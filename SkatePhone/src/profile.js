var profileCon;

/*#########################################
			SKINS & STYLES
#########################################*/

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var infoBox = Container.template(function($){ return {skin: boxSkin, width: 145, top: $.top, left: $.left, right: $.right,
	contents:[
		Column($, {left: 5, top: 5, bottom: 5, right: 5, contents: [
			Text($, {top: 0, left:0, right:0, height: $.titleHeight,
				style: $.titleStyle, string: $.title}),
		].concat(("contents" in $) ? $.contents : [])})
	]
}});

/*#########################################
				HANDLERS
#########################################*/


/*#########################################
		GAME SCREEN INSTANTIATION
#########################################*/

function createProfile(){
	var profile = user.profile;
	profileCon = new Column({left: 0, right: 0, bottom: 0, top: 0, skin: cloudSkin, contents: [
		new headerBarTemplate({header:"Profile"}), 
		new Thumbnail({top: 10, width: 60, height: 60, aspect: 'fit', url: profile.pic }),
		new Label({style: labelStyle, string: profile.name}),
		new Container({left: 10, name:"bar", width: 300, top: 0, contents: [
			new Label({string: "Won", style: labelStyle, top: 0, left: 10}),
			new Label({string: "Lost", style: labelStyle, top: 0, right: 10}),
			new Container({top: 20, left: 10, right:10, height: 20, skin: boxSkin, contents:[
				new Container({name:"greenbar", left: 2, top: 2, width: 300*(profile.won/(profile.won + profile.lost)), bottom: 2, skin: new Skin({fill: "green"})})
			]})
		]}),
		new Line({top: 10, left: 20, right: 20, skin: cloudSkin, contents: [
			new infoBox({left: 0, right: 10, top: 0, titleHeight:25, titleStyle: new Style({font: "20px", horizontal: "center", color:"black" }),
				title: "Highest Score", contents: [new Label({top: 10, style: infoStyle, string: profile.hScore})]}),
			new infoBox({right: 0, left: 0, top: 0, titleHeight:25, title: "Most Consistent Trick",
				titleStyle: new Style({font: "16px", color:"black", horizontal: "center" }),
				contents: [
					new Container({left: 2, right:2, top:10, contents: [
						new Label({left: 0, style: infoStyle, string: profile.cTrick}),
						new Label({right: 0, style: infoStyle, string: profile.consistentTrick[profile.cTrick]})
					]})
				]})
		]}),
		new Line({top: 10, left: 20, right: 20, contents: [
			new infoBox({left: 0, right: 10, top: 0, titleHeight:25, titleStyle: new Style({font: "20px", horizontal: "center", color:"black" }),
				title: "Unique Tricks", contents: [new Label({top: 10, style: infoStyle, string: profile.uniqueTricks})]}),
			new infoBox({right: 0, left: 0, top: 0, titleHeight:25, title: "Most Difficult Trick",
				titleStyle: new Style({font: "16px", color:"black", horizontal: "center" }),
				contents: [
					new Container({left: 2, right:2, top:10, contents: [
						new Label({left: 0, style: infoStyle, string: profile.dTrick}),
						new Label({right: 0, style: infoStyle, string: profile.difficultTrick[profile.dTrick]})
					]})
				]})
		]}),
		new Container({height:101, bottom: 55, left:0, right:0, skin: cloudSkin}),
		new navBar({index: 15})
	]});
	
	application.add(profileCon);
}