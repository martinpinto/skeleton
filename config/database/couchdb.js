// CouchDB ===========================================
var acquire = require('acquire');
var config = acquire('config');
var nano = require('nano')('http://' + config.database.couchdb.host + ":" + config.database.couchdb.port);

var databases = config.database.couchdb.databases;

if (databases !== 'undefined') {
    for (var database in databases) {
        if (nano.db.use(database) === 'undefined') {
            nanon.db.create(database);
            console.log('[couchdb] Created database \'' + database + '\'');
        }
    }
}

module.exports = nano;