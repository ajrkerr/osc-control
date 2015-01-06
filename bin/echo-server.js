#! /usr/local/bin/node

var osc = require('osc-min'),
    udp = require('udp'),
    dgram = require('dgram');


var server = dgram.createSocket("udp4");

server.on("message", function (message, rinfo) {
  var error;

  try { 
    console.log(osc.fromBuffer(message));
  } catch (_error) {
    error = _error;
    console.log("Invalid OSC Packet: ");
    console.log(error);
  }
});

server.bind(8000);

