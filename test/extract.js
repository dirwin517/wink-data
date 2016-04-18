/**
 * Created by daniel.irwin on 4/7/16.
 */
describe('test extractor', function(){

    /**
     * Created by daniel.irwin on 4/7/16.
     */
    describe('test', function(){

        var formula = require('./../extract').extract;

        /**
         * If no formula skip and return original value
         */
        it('function parser', function(){
            var data = {};
            var form = { to : ''};
            var inputObj = {};
            var currentValue = 5;
            var fieldName = '';

            var result = formula(data, fieldName, form, inputObj, currentValue);

            if(result !== 5){
                throw new Error('You done fucked up');
            }

        });

        function assertResult(result, expected){
            if(result !== expected){
                throw new Error('Expected: <'+expected+'> but was: <' + result + '>');
            }
        }

        it('function parser minus last value', function(){
            var data = {
                'test-old-last': 2
            };
            var form = {
                formula : 'min:$old'
            };
            var inputObj = {

            };
            var currentValue = 5;
            var fieldName = 'test';

            var result = formula(data, fieldName, form, inputObj, currentValue);

            assertResult(result, 3)

        });


        it('function parser minus other attribute', function(){
            var data = {};
            var form = {
                formula : 'min:old'
            };
            var inputObj = {
                old: 7
            };
            var currentValue = 5;
            var fieldName = 'test';

            var result = formula(data, fieldName, form, inputObj, currentValue);

            assertResult(result, -2)

        });

        it('function parser minus last value, then other attribute', function(){
            var data = {'test-old-last': 2};
            var form = {
                formula : 'min:$old,min:old'
            };
            var inputObj = {
                old: 7
            };
            var currentValue = 5;
            var fieldName = 'test';

            var result = formula(data, fieldName, form, inputObj, currentValue);

            assertResult(result, -4)

        });


        it('function parser minus other attribute, then last value', function(){
            var data = {'test-old-last': 2};
            var form = {
                formula : 'min:old,min:$old'
            };
            var inputObj = {
                old: 7
            };
            var currentValue = 5;
            var fieldName = 'test';

            var result = formula(data, fieldName, form, inputObj, currentValue);

            assertResult(result, -4)

        });

    });

});