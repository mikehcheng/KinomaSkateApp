//@module
// The trick BLL abstracts the translation of inputs received from the
// array of sensors we would have on the board.

var THEME = require ("themes/flat/theme");
var CONTROL = require ("mobile/control");
var PinsSimulators = require ("PinsSimulators");
var buttonStyle = new Style({ font:"bold 20px", color:["white","white","black"], horizontal:"center" });
var OrientationBehavior = function(column, data) {
  Behavior.call(this, column, data);
}
OrientationBehavior.prototype = Object.create(Behavior.prototype, {
  onCreate: { value: function(column, data) {
    column.partContentsContainer.add(new OrientationLine(data)); 
  }},
});

var OrientationButton = Container.template(function($) { return {
    width:100, height:30, active:true, skin:THEME.buttonSkin,
    behavior: Object.create(CONTROL.ButtonBehavior.prototype, {
      onCreate: { value: function(container, $) {
        CONTROL.ButtonBehavior.prototype.onCreate.call(this, container, $.data);
        this.value = $.value;
      }},
      onTap: { value: function(container) {
        this.data.value = this.value;
      }},
    }),
    contents: [
      Label($, { top:0, bottom:0, style:buttonStyle, string:$.string }),
    ]
}});

var OrientationLine = Container.template(function($) { return {
  left:0, right:0, height:260,
  contents: [
    Label($, { left:0, right:0, top:0, height:30, style:THEME.labeledButtonStyle, string:"Tricks" }),
    Container(null, {
      left:0, right:0, top:30, height:200,
      contents: [
        OrientationButton({ data:$, string:"Kickflip", value:"Kickflip" }, { top:0 }),
        OrientationButton({ data:$, string:"Tailslide", value: "Tailslide" }, { top: 40 }),
        OrientationButton({ data:$, string:"Ollie", value: "Ollie" }, { top: 80 }),
        OrientationButton({ data:$, string:"Nosegrind", value: "Nosegrind" }, { top: 120 }),
        OrientationButton({ data:$, string:"McTwist", value: "McTwist" }, { top: 160 }),
      ],
    }),
  ],
}});

exports.configure = function(configuration) {
	this.data = {
      id: 'trick',
      behavior: OrientationBehavior,
      header : { 
        label : this.id, 
        name : "trick", 
        iconVariant : PinsSimulators.SENSOR_KNOB 
      },
      value: undefined
  	};
    this.container = shell.delegate("addSimulatorPart", this.data);
  }

exports.pins = {
	sensors: { type: "I2C" , address: 0x42}
};

exports.close = function() {
    shell.delegate("removeSimulatorPart", this.container);
}
exports.read = function() {
    var value = this.data.value;
    this.data.value = undefined;
    return value;
}

