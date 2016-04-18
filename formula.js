/**
 * Created by daniel.irwin on 4/7/16.
 */
module.exports.formula =     function handleFormula(data, name, attr, obj, v) {
    console.log('',attr.to);
    var result = v;
    if (attr.formula) {
        var form = attr.formula.split(',');
        form.forEach(function (fnc) {
            var param = fnc.split(':');
            var functionParameter = param[1];
            var lastKey = (name + '_' + functionParameter.replace('$', '') + '_last');
            var param2 = data[lastKey];
            console.log('did we get something', param2);
            if (functionParameter.indexOf('$') === -1) {
                param2 = obj[functionParameter];
            }

            var opperator = param[0];
            if(param2){
                if (opperator === 'div') {
                    result = result / param2;
                }
                else if (opperator === 'min') {
                    result = result - param2;
                }
                else if(opperator === 'or'){
                    if(!result){
                        result = data[lastKey];
                    }
                }
            }
            else{
                console.log('formula skipped on ['+attr.to+']' +
                ' as param2 was falsey w/ '
                + opperator + ' : ' + functionParameter);
            }
        });
    }
    return result;
};