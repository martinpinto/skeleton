var toml = require('toml-require').install();
// parse toml main configuration file at ./config/default.toml
var config = require('./default.toml');
module.exports = config;