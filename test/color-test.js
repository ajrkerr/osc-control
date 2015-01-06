var expect = require('chai').expect,
    Color = require('../lib/color')
;

describe('Color', function () {
  describe('#new', function () {
    it("should create a new color with r, g, b", function () {
      var color = Color.fromRGB(1, 2, 3);
      
      expect(color.red()).to.eq(1);
      expect(color.green()).to.eq(2);
      expect(color.blue()).to.eq(3);
    });
  });

  describe("#fromInt", function () {
    it("sets r, g, b to 0 if int is 0", function () {
      var color = Color.fromInt(0);
      
      expect(color.red()).to.eq(0);
      expect(color.green()).to.eq(0);
      expect(color.blue()).to.eq(0);
    });

    it("sets the correct values to r, g, b", function () {
      var color = Color.fromInt(0x010203);
      
      expect(color.red()).to.eq(1);
      expect(color.green()).to.eq(2);
      expect(color.blue()).to.eq(3);
    });

    it("sets r, g, b to 255 if the int is 0xffffff", function () {
      var color = Color.fromInt(0xffffff);
      
      expect(color.red()).to.eq(255);
      expect(color.green()).to.eq(255);
      expect(color.blue()).to.eq(255);
    });
  });

  describe("#toInt", function () {
    it("returns 0 if red green an dblue are 0", function () {
      var color = Color.fromRGB(0, 0, 0);
      expect(color.toInt()).to.eq(0);
    });

    it("returns 0xffffff if red greena nd blue are 255", function () {
      var color = Color.fromRGB(255, 255, 255);
      expect(color.toInt()).to.eq(0xffffff);
    });

    it("sets the correct int value", function () {
      var color = Color.fromRGB(1, 2, 3);
      expect(color.toInt()).to.eq(0x010203);
    });
  });
});
