var ws281x = require('rpi-ws281x-native'),
    Color = require('./color'),
    _ = require('lodash')
;

var PixelStrip = function (numPixels) {
  this.numPixels = numPixels;
  this.pixelData = new Uint32Array(numPixels);

  ws281x.init(numPixels);

  // ---- trap the SIGINT and reset before exit
  process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
  });
}

_.extend(PixelStrip.prototype, {
  stop: function () {
    ws281x.reset();
  },

  setColor: function (pos, color) {
    this.pixelData[pos] = color.toInt();
  },

  getColor: function (pos) {
    return Color.fromInt(this.pixelData[pos]);
  },

  render: function () {
    ws281x.render(this.pixelData);
  },

  colors: function () {
    return _.map(this.pixelData, Color.fromInt);
  },

  setColors: function (colors) {
    if(colors.constructor === Array) {
      for(var i = 0; i < this.numPixels; i++) {
        this.setColor(i, colors[i]);
      }
    } else {
      for(var i = 0; i < this.numPixels; i++) {
        this.setColor(i, colors);
      }
    }
  },

  rotate: function () { 
    return _.map(this.colors(), function (color) {
      return color.rotate( 360 / this.numPixels );
    });
  },

  generateRainbow: function () {
    var numPixels = this.numPixels;

    return _.map(this.colors(), function (color, index) {
      return new Color().rgb(255, 0, 0).rotate((index / numPixels) * 360);
    });
  }

});

module.exports = PixelStrip;
