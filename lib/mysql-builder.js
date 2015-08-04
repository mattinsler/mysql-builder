var URL = require('url');
var path = require('path');

var POOL_OPTIONS = ['acquireTimeout', 'waitForConnections', 'connectionLimit', 'queueLimit'];
var CONNECTION_OPTIONS = [
  'host', 'port', 'user', 'password', 'database',
  'localAddress', 'socketPath', 'charset', 'timezone', 'connectTimeout',
  'stringifyObjects', 'insecureAuth', 'typeCast', 'queryFormat', 'supportBigNumbers',
  'bigNumberStrings', 'dateStrings', 'debug', 'trace', 'multipleStatements', 'flags', 'ssl'
];

var isDefined = function(v) {
  return v !== null && typeof(v) !== 'undefined';
}

var mergeOptions = function(dest, src, options) {
  options.forEach(function(opt) {
    if (!isDefined(dest[opt]) && isDefined(src[opt])) {
      dest[opt] = src[opt];
    }
  });
};

module.exports = function(mysql) {
  var builder = function(config) {
    return mysql.createConnection(builder.parseConfig(config));
  };

  builder.pool = function(config, opts) {
    var urlConfig = builder.parseConfig(config);

    mergeOptions(urlConfig, config, POOL_OPTIONS);
    mergeOptions(urlConfig, opts || {}, POOL_OPTIONS);

    return mysql.createPool(urlConfig);
  };
  
  builder.parseURL = module.exports.parseURL;
  builder.parseConfig = module.exports.parseConfig;
  
  return builder;
};

module.exports.parseConfig = function(config) {
  if (config === null || config === undefined) { config = {}; }
  if (typeof(config) === 'string') { config = {url: config}; }
  
  var urlConfig = config.url ? module.exports.parseURL(config.url) : {};
  mergeOptions(urlConfig, config, CONNECTION_OPTIONS);

  return urlConfig;
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
