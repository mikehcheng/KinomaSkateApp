// PHONE MAIN

var labelStyle = new Style( { font: "20px", color:"black" } );
var whiteSkin = new Skin( { fill:"white" } );
var blackSkin = new Skin({ fill: "black"});
var graySkin = new Skin({fill: "#696969"});
var titleStyle = new Style( { font: "bold 40px", color:"black" } );

var mainColumn = new Column({
	left: 0, right: 0, top: 55, bottom: 55, active: true, skin: whiteSkin,
	contents: [
		new Label({left:0, right:0, height:40, string:"Skatey", style: titleStyle}),
		new Picture({aspect: "fill", height:70, top: 15, width: 70, url: "icon_skateboard.png"}),
		new Label({left:0, right:0, height:10, top: 25, string:"Learn, Compete, Skate.", style: labelStyle}),
		new Label({left:0, right:0, height:10, top: 45, string:"Previous Trick:", style: labelStyle})
	]
});

application.add(mainColumn);

