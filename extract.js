/**
 * Created by daniel.irwin on 4/7/16.
 */
module.exports.extract = function extract(data, onUpdate) {

    var handleFormula = require('./formula').formula;

    function lastKeyGen(name, attribute) {
        return (name + '_' + attribute + '_last');
    }

    function getDeepProperty(entity, accessor){
        if(!entity || !accessor){
            return undefined;
        }
        var arr = (accessor && accessor.constructor === Array) ? accessor : accessor.split('.');
        while(arr.length && (entity = entity[arr.shift()]));
        return entity;
    }

    return function go(filter){
        return function ex(object) {
            var obj = {
                system_ts: new Date().getTime()
            };

            var update = {};

            var noChange = true;
            filter.attributes.forEach(function (attr) {
                //console.log('attr', attr);
                var v = getDeepProperty(object, attr.from);
                var lastKey = lastKeyGen(object.name, attr.to);

                if (attr.formula) {
                    v = handleFormula(data, object.name, attr, obj, v);
                }

                obj[attr.to] = v;
                noChange = noChange && (data[lastKey] === v);
                data[lastKey] = v;

            });

            if (!noChange) {
                update[filter.name] = obj;

                if (!data[filter.name]) {
                    data[filter.name] = [];
                }

                data[filter.name].push(obj);


                onUpdate(update);
            }
            else {
                console.log('', 'no change was made');
            }
        };
    };
};