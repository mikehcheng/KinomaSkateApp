//@module
// The alt trick BLL abstracts the translation of inputs received from the
// array of sensors we would have on the board, but in portions

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
  left:0, right:0, height:560,
  contents: [
    Label($, { left:0, right:0, top:0, height:30, style:THEME.labeledButtonStyle, string :"Horizontal Rotation" }),
    Container(null, {
      left:0, right:0, top:30, height:110,
      contents: [
        OrientationButton({ data:$, string:"0°", value: "Test" }, { top: 0 }),
        OrientationButton({ data:$, string:"180°", value: "Tailslide" }, { }),
        OrientationButton({ data:$, string:"360°", value: "Nosegrind" }, { bottom: 0 }),
      ],
    }),
    Label($, { left:0, right:0, top:150, height:30, style:THEME.labeledButtonStyle, string :"Vertical Rotation" }),
    Container(null, {
      left:0, right:0, top:190, height:110,
      contents: [
        OrientationButton({ data:$, string:"0 spins", value: "Test" }, { top: 0 }),
        OrientationButton({ data:$, string:"1 spin", value: "Tailslide" }, { }),
        OrientationButton({ data:$, string:"2 spins", value: "Nosegrind" }, { bottom: 0 }),
      ],
    }),
    Label($, { left:0, right:0, top:310, height:30, style:THEME.labeledButtonStyle, string:"Orientation" }),
    Container(null, {
      left:0, right:0, top:340, height:110,
      contents: [
        OrientationButton({ data:$, string:"Neutral", value: "Test" }, { top: 0 }),
        OrientationButton({ data:$, string:"Left Up", value: "Tailslide" }, { }),
        OrientationButton({ data:$, string:"Right Up", value: "Nosegrind" }, { bottom: 0 }),
      ],
    }),
    Label($, { left:0, right:0, top:450, height:30, style:THEME.labeledButtonStyle, string:"Stance" }),
    Container(null, {
      left:0, right:0, top:480, height:70,
      contents: [
        OrientationButton({ data:$, string:"Regular", value: "Test" }, { top: 0 }),
        OrientationButton({ data:$, string:"Mongo", value: "Nosegrind" }, { bottom: 0 }),
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

