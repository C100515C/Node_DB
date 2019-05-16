const defaultConfig = './configs/config_default.js';
const testConfig = './configs/config_test.js';
const overrideConfig = './configs/config_override.js';
const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test'){
    console.log(`Loading test ${testConfig}...`);
    config = require(testConfig);
}else{
    console.log(`Loading default ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()){
            console.log(`Loading override ${overrideConfig}...`);
            config = require(overrideConfig);
        }
    } catch (err) {
        console.log(`Can not load override ${overrideConfig}`);
    }
}

module.exports = config;