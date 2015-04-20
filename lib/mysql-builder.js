var URL = require('url');
var path = require('path');

var isDefined = function(v) {
  return v !== null && typeof(v) !== 'undefined';
}

module.exports = function(mysql) {
  var builder = function(config) {
    if (config === null || config === undefined) { config = {}; }
    if (typeof(config) === 'string') { config = {url: config}; }
    
    var urlConfig = config.url ? module.exports.parseURL(config.url) : {};
    
    [
      'host', 'port', 'user', 'password', 'database',
      'localAddress', 'socketPath', 'charset', 'timezone', 'connectTimeout',
      'stringifyObjects', 'insecureAuth', 'typeCast', 'queryFormat', 'supportBigNumbers',
      'bigNumberStrings', 'dateStrings', 'debug', 'trace', 'multipleStatements', 'flags', 'ssl'
    ].forEach(function(k) {
      if (!isDefined(urlConfig[k]) && isDefined(config[k])) {
        urlConfig[k] = config[k];
      }
    });
    
    console.log(urlConfig);
    return mysql.createConnection(urlConfig);
  };
  
  builder.parseURL = module.exports.parseURL;
  
  return builder;
};

module.exports.parseURL = function(url) {
  var parsed = URL.parse(url);
  
  var config = {
    host: parsed.hostname || 'localhost',
    port: parseInt(parsed.port) || 3306
  };
  
  if (parsed.auth) {
    config.user = parsed.auth.split(':')[0];
    config.password = parsed.auth.split(':')[1];
  }
  
  config.database = parsed.pathname.slice(1);
  
  return config;
};
