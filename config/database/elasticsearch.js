// Elasticsearch ===========================================

var elasticsearch = require('elasticsearch');
var acquire = require('acquire');
var config = acquire('config');

var host = config.database.elasticsearch.host;
var port = config.database.elasticsearch.port;
var log = config.database.elasticsearch.log;

module.exports.client = new elasticsearch.Client({
  host: host + ':' + port,
  log: log
});
