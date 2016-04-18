/**
 * Created by daniel.irwin on 4/3/16.
 */
module.exports = function datastore(options){
    var filters = options.filters || {};
    var onUpdate = options.onUpdate;
    var registrationFnc = options.registrationFnc;

    var data = {};

    if(!registrationFnc){
        throw new Error('Must include registrationFnc function w/'+
        'first parameter as filter, second as success, and third as failure');
    }

    if(!onUpdate){
        throw new Error('Must include onUpdate function, ' +
        'this gives you new data in a map');
    }

    var attrExtractor = require('./extract').extract(data,onUpdate);

    function register(filter) {
        registrationFnc(filter, attrExtractor(filter), function (err) {

        });
    }

    function start(){
        filters.forEach(function(filter){
           register(filter);
        });
    }

    function addFilter(filter){
        register(filter);
    }

    function getFilteredDataRange(filterName, datetimeRange){
        return data[filterName].filter(function(interval){
            return (interval >= datetimeRange || interval <= datetimeRange);
        });
    }

    function getData(){
        return data;
    }

    function setData(input){
        data = input;
    }

    function getDataRange(datetimeRange){
        var result = {};
        Object.keys(data).forEach(function(filterName){
            result[filterName] = getFilteredDataRange(datetimeRange);
        });
        return result;
    }

    return {
        addFilter : addFilter,
        getFilteredDataRange : getFilteredDataRange,
        getData : getData,
        getDataRange : getDataRange,
        start : start,
        setData : setData
    };
};