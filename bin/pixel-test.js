#! /usr/local/bin/node

require('daemon')();

// Config //
var config = require('../config'),
    rabbit_url = config.rabbit.url,
    exchange_name = config.rabbit.exchange;


// Logging //
var winston = require('winston');
var curentFilename = __filename.split("/").pop(),
    logFile = __dirname + "/../" + config.logs.directory + currentFilename + ".log";

winston.add(winston.transports.File, { filename: logFile, timestamp: true });
winston.info("Logging on " + logFile);
winston.info("Connecting to MQ at " + rabbit_url + " on exchange " + exchange_name);


// Setup beacon //
var beacon = require("../lib/beacon");

function messageReceived(message) { 
  if(message.passing) {
    beacon.triggerSuccess();
  } else {
    beacon.triggerFailure();
  }
}

beacon.triggerFailure();

var listener = new TestStatusListener(rabbit_url, exchange_name, messageReceived);
