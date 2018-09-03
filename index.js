const path = require('path'),
    _ = require('lodash');

module.exports = function (config) {

    let args = process.argv.slice(_.findIndex(process.argv, a => path.resolve(__dirname, a) === __filename) + 1);

    global.args = {};

    for (let arg of args) {
        if (arg.indexOf('=') !== -1) {
            let parts = arg.split('=');
            let key = parts[0];
            key = _.camelCase(key);
            let value = parts[1];
            if (value && (value[0]==='[' || value[0] === '{')){
                try {
                    //value = value.replace(/'/g, '"');
                    value = JSON.parse(value);
                } catch(exp){
                    console.error('bad json');
                }
            }
            if (!isNaN(value)){
                value = +value;
            }
	        if (value === 'false' || value === 'true'){
		        value = (value !== 'false');
	        }
            _.set(config, key, value);
        } else {
            global.args[arg] = true;
        }
    }

    _.each(process.env, function(value, key){
        key = _.camelCase(key);

        if (config.hasOwnProperty(key)){

            if (value && (value[0] === '{' || value[0] === '[')){
                try {
                    value = JSON.parse(value);
                } catch(exp){
                    console.log('error parsing config: ' + key + ', value: ' + value);
                }
                config[key] = value;
            } else if (value === 'false' || value === 'true'){

                config[key] = value === 'true';

            } else {
                if (!isNaN(value)){
                    value = +value;
                }
                config[key] = value;
            }

        }

    });

}