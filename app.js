var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var portNum = 1337;
var dataConfig = require('./dataConfig')();
var storedData = {};
var PUBNUB = require('pubnub');
var pubnub = PUBNUB.init({
    subscribe_key: dataConfig.subscribe_key,
    error: function (error) {
        console.log('Error:', error);
    }
});


app.use(express.static(path.join(__dirname, 'public')));

try{
    storedData = require('./saved.json');
}
catch(e){
    console.log('', e.stack);
}

var evilClient = null;

var dataStore = require('./datastore')({
    filters : dataConfig.filters,
    onUpdate : function(data){
        console.log('', data);
        if(evilClient){
            evilClient.write('data:'+JSON.stringify(data) + '\n\n');
        }
        fs.writeFileSync('saved.json', JSON.stringify(dataStore.getData(), null, 3));
    },
    registrationFnc : function register(filter, success, failure) {
        pubnub.subscribe({
            channel: filter.channel,
            message: function parseMessage(msg) {
                success(JSON.parse(msg));
            },
            error: failure
        });
    }
});

dataStore.setData(storedData);
dataStore.start();

var routes = {
    getAllData : function getAllData(req, res){
        if(dataStore){
            return res.json(dataStore.getData());
        }
        return res.json({
            message : 'data store is not loaded'
        });
    }
};

app.get('/data', routes.getAllData);

module.exports = app;

app.get('/watchForMessages', function(req, res) {
    req.socket.setTimeout(2147483647);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    res.write('\n');

    if(!evilClient){
        console.log('Evil Client Connected!');
        evilClient = res;
    }

    req.on("close", function() {
        console.log('Connection Closed');
        evilClient = null;
    });

});

/**
 *  @returns {undefined} nothing
 */
function bootstrap() {
    console.log('Energy Profiling POC listening on port ' + portNum + '!');
}

app.listen(portNum, bootstrap);