#! /usr/local/bin/node

var _ = require('lodash')
;

var PixelStrip = require("../lib/pixel-strip"),
    Color = require('../lib/color')
;

var beacon = (function () {
  var stripLength = 240;
  var strip = new PixelStrip(stripLength);
  
  var color = Color.fromRGB(0, 0, 255);
  var highlight = Color.fromRGB(0, 0, 255);

  var position = 0;
  var tickLength = 50;

  function tick() {
    strip.setColor(position, color);
    position = (position + 1) % stripLength; 
    strip.setColor(position, highlight);
    strip.render();
  }

  setInterval(tick, tickLength);

  return {
    triggerSuccess: function () {
      color = new Color("hsl(120,100%,10%);");
      highlight = new Color("hsl(120,100%,50%);");
    },

    triggerFailure: function () {
      color = new Color("hsl(0,100%,10%);");
      highlight = new Color("hsl(0,100%,50%);");
    }
  };
})();


module.exports = beacon;
