var _ = require('lodash'),
    Color = require('color')
;

Color.fromRGB = function (r, g, b) {
  return new Color().rgb(r, g, b);
}

Color.fromInt = function (num) {
  return new Color.fromRGB(
    (num >> 16) & 0xff,
    (num >>  8) & 0xff,
    num & 0xff
  );
}

_.extend(Color.prototype, {
  toInt: function () { return ((this.red() & 0xff) << 16) + ((this.green() & 0xff) << 8) + (this.blue() & 0xff); }
});

module.exports = Color;
