#! /usr/local/bin/node

var _ = require ('lodash');

function Timer (options) {
  options = options || {};

  this.tickLength = options.tickLength || 50; // 50ms
  this.timeoutLength = options.timeoutLength || 30000; // 5min
  this.lastKeepAlive = (+new Date);
  this.intervalObject = null;

  this.callbacks = {
    'tick': new Array(),
    'timeout': new Array()
  };
}

Timer.prototype.isRunning = function () {
  return this.intervalObject !== null;
}

Timer.prototype.keepAlive = function () {
  this.lastKeepAlive = (+new Date);

  if(!this.isRunning()) {
    this.start();
  }
}

Timer.prototype.tick = function () {
  this.trigger("tick");

  if(this.timeoutLength >= 0 && (this.lastKeepAlive - (new Date)) > this.timeoutLength) {
    this.trigger("timeout");
    this.stop();
  }
}

Timer.prototype.on = function (event, callback) {
  this.callbacks[event].push(callback);
}

Timer.prototype.trigger = function (event) {
  _.forEach(this.callbacks[event], function (event) { event();  });
}

Timer.prototype.start = function () {
  if(!this.isRunning()) {
    var beacon = this;

    this.intervalObject = setInterval(function () {
      beacon.tick();
    }, this.tickLength);
  }
}

Timer.prototype.stop = function () {
  if(!this.isRunning()) {
    clearInterval(this.intervalObject);
    this.intervalObject = null;
  }
}

module.exports = Timer;
