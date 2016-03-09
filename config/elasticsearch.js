// Elasticsearch ===========================================

var elasticsearch = require('elasticsearch');
var config = require('config');

var host = config.get('engine.dbConfig.elasticsearch.host');
var port = config.get('engine.dbConfig.elasticsearch.port');
var log = config.get('engine.dbConfig.elasticsearch.log');

module.exports.client = new elasticsearch.Client({
  host: host + ':' + port,
  log: log
});
