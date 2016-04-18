/**
 * Created by daniel.irwin on 4/3/16.
 */

module.exports = function mod(callback, onUpdate) {
    var WinkAPI = require('node-winkapi');

    config = require('./config.json');

    var winky = new WinkAPI.WinkAPI(config);

    winky.login(config.userName, config.passPhrase, loggedIn)
        .on('error', function (err) {
            console.log('background error: ' + err.message);
        });

    function loggedIn() {

        function getDevices(callback) {
            winky.getDevices(function data(err, devices) {
                if (err) {
                    console.log('an error has occured');
                }
                else {
                    //console.log('devices', JSON.stringify(devices));
                    callback(devices);
                }
            });

            winky.getDevice({path : "/binary_switches/174261"}, function(err, device){
                if(err){
                    return console.log('', err);
                }
                console.log('', device);
            });
        }

        var linkedService = {
            field : 'type',
            value : 'linked_service'
        };

        var configForDataStore = require('./dataConfig.js')();

        var dataStore = require('./datastore')();


        callback(dataStore);

    }
};