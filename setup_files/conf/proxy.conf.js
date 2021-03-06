require('dotenv').config();
var fs = require('fs');

// Read in the browser configs
var browsers = JSON.parse(fs.readFileSync('./browsers.json', 'utf8'));

// Read in the common nightwatch configuration
var nightwatch_config = require('./common-config');

Object.assign(nightwatch_config.test_settings.default, {
  proxy: {
    protocol: 'http',
    host: 'www-cache.reith.bbc.co.uk',
    port: '80',
  },
});

var config = nightwatch_config.test_settings || {};

browsers.forEach(function (browser) {
  config[browser.name] = {};
  config[browser.name].selenium_host = nightwatch_config.selenium.host;
  config[browser.name].selenium_port = nightwatch_config.selenium.port;
  config[browser.name].desiredCapabilities = browser.desiredCapabilities || {};
  for (var i in nightwatch_config.common_capabilities) {
    config[browser.name].desiredCapabilities[i] = nightwatch_config.common_capabilities[i];
  }
});

module.exports = nightwatch_config;
