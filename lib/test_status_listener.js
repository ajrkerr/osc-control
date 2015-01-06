#! /usr/local/bin/node

var amqp = require('amqp');

function TestStatusListener(rabbit_url, exchange_name, callback) {
  var connection = amqp.createConnection({ host: rabbit_url });

  connection.on('ready', function () {
    connection.queue('', { exclusive: true }, function (q) {
      console.log("Queue " + q.name + " is open");

      q.bind(exchange_name, "#");
      console.log("Bound to: " + exchange_name); 

      q.subscribe({ exclusive: true }, function (message) {
        console.log("Received: " + JSON.stringify(message));

        callback(message);
      });
    });
  });
}

module.exports = TestStatusListener;
