var profileCon;

/*#########################################
			SKINS & STYLES
#########################################*/

/*#########################################
			GENERIC CONSTRUCTORS
#########################################*/

var infoBox = Container.template(function($){ return {skin: boxSkin, contents:[
	Column($, {left: 5, top: 5, bottom: 5, right: 5, contents: [
		Label($, {top: 0, style: (("titleStyle" in $) ? $.titleStyle : labelStyle), string: $.title}),
	].concat(("contents" in $) ? $.contents : [])})
]}});

/*#########################################
				HANDLERS
#########################################*/

Handler.bind("/trackRun", {
	onInvoke: function(handler, message){
		trace("Tracking Run: Please enter proper behavior here...\n")
	},
	onComplete: function(handler, message, json){
	}
});

/*#########################################
		GAME SCREEN INSTANTIATION
#########################################*/

function createProfile(){
	var profile = user.profile;
	profileCon = new Column({left: 0, right: 0, bottom: 55, top: 0, skin: whiteSkin, contents: [
		new Container({top: 0, left: 0, right: 0, height: 50, skin:new Skin({fill: "black"})}),
		new Thumbnail({top: 10, width: 60, height: 60, aspect: 'fit', url: profile.pic }),
		new Label({style: labelStyle, string: profile.name}),
		new Container({left: 10, right: 10, top: 10, contents: [
			new Label({string: "Won", style: labelStyle, top: 0, left: 10}),
			new Label({string: "Lost", style: labelStyle, top: 0, right: 10}),
			new Container({top: 20, left: 10, right:10, height: 20, skin: boxSkin, contents:[]}),
		]}),
	]});
	
	application.add(profileCon);
}