#! /usr/local/bin/node

var _ = require('lodash');

var PixelStrip = require("../lib/pixel-strip"),
    Color = require('../lib/color'),
    Timer = require('../lib/timer')
;


function Beacon (options) {
  options = options || {};

  this.numLeds = options.numLeds || 240;

  this.color = Color.fromRGB(0, 0, 255);
  this.highlight = Color.fromRGB(0, 0, 255);
  this.position = 0;
  
  this.strip = new PixelStrip(this.numLeds);

  // Setup Timer //
  this.timer = new Timer({
    tickLength: options.tickLength || 50, // 50ms
    timeoutLength: options.timeout || 30000 // 5min
  });
  this.timer.on("tick", _.bind(this.tick, this));
  this.timer.on("timeout", _.bind(this.triggerUnknown, this));
  this.timer.start();
};

_.extend(Beacon.prototype, {
  tick: function () {
    this.strip.setColor(this.position, this.color);
    this.position = (this.position + 1) % this.numLeds; 
    this.strip.setColor(this.position, this.highlight);
    this.strip.render();
  },

  triggerUnknown: function () {
    this.color = new Color("hsl(210,100%,10%);");
    this.highlight = new Color("hsl(210,100%,50%);");
  },

  triggerSuccess: function () {
    this.color = new Color("hsl(120,100%,10%);");
    this.highlight = new Color("hsl(120,100%,50%);");
    this.timer.resetTimeout();
  },

  triggerFailure: function () {
    this.color = new Color("hsl(0,100%,10%);");
    this.highlight = new Color("hsl(0,100%,50%);");
    this.timer.resetTimeout();
  }
});


module.exports = Beacon;
