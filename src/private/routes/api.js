/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
var express = require('express');
var router = express.Router();
var acquire = require('acquire');
var config = acquire('config');

// Elasticsearch information
// docs: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-2-2.html
var elastic = acquire('elasticsearch');

var esIndex = config.database.elasticsearch.index;
var esTypes = config.database.elasticsearch.types;
var esTypeQuotes = esTypes[0]; // quotes elasticsearch type

// CouchDB information
// docs: https://github.com/dscape/nano
var couchdb = acquire('couchdb');

/**
 *  Test route
 *  sends HTTP status 200 to show server is working OK.
 *  @return an HTTP status 200
 */
router.get('/', function (req, res) {
    console.log(req.query.name);
    console.log(req.query);
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.send(200);
});

///////////////////////////////// COUCHDB /////////////////////////////////
// always make sure couchdb is running in the background
router.get('/couchdb', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    var testdb = couchdb.db.use('test');
    testdb.view('getAll','getAll',function (error, body, headers) {
        res.status(200).send(body);
    });
});

/**
 *  Test route
 *  sends HTTP status 200 to show server is working OK.
 *  @return an HTTP status 200
 */
router.get('/couchdb/insert', function (req, res) {
    var testdb = couchdb.db.use('test');
    
    testdb.insert({crazy: true}, 'rabbit', function (err, body, header) {
       if (err) {
           console.log('[test.insert] ', err.message);
           return;
       }
       console.log(body);
       return;
    });
    res.sendStatus(200);
});

//////////////////////////////// ELASTICSEARCH ////////////////////////////////
// always make sure ElasticSearch is running in the background

/**
 * Searches quotes
 * @param
 * @param
 * @param
 */
router.get('/elastic/search', function (req, res) {
    elastic.search({
        index: esIndex,
        q: req.params.q
    }, function (error, response) {
        console.log(response);
        if (response) {
            console.log('quote: ' + response._source);
        } else {
            console.log('Could not find any quotes!');
        }
    });    
  res.send(200);
});

/**
 * Fetches all quotes
 * @param
 * @param
 * @param
 */
router.get('/elastic', function (req, res) {
  elastic.search({
    index: esIndex,
    type: esTypeQuotes,
    q: 'type:quote',
    size: 1000
  }, function (error, response) {
    if (response) {
      //res.json(response.hits.hits);
      var data = response.hits.hits;
    } else {
      res.send('Could not find any quotes');
    }
    res.jsonp(data);
  });
});

/**
 *  Fetches an existing quote by ID
 *  @param id the ID of the quote
 */
router.get('/elastic/:id', function (req, res) {
  elastic.get({
    index: esIndex,
    type: esTypeQuotes,
    id: req.params.id
  }, function (error, response) {
    console.log(response);
    if (response) {
      res.json(response._source);
    } else {
      res.send('Could not find any quotes!');
    }
  });
});

/**
 *  Inserts a new quote
 *  @param
 *  @param
 *  @param
 */
router.post('/elastic', function (req, res) {
  var message, topic, hashtags, source, author, type;
  if (req.body) {
    message = req.body.message;
    topic = req.body.topic;
    hashtags = req.body.hashtags;
    source = req.body.source;
    author = req.body.author;
    type = 'quote';
    console.log(req.body.message);
  }

  elastic.client.index({
    index: esIndex,
    type: esTypeQuotes,
    body: {
        "type": type,
        "data": {
            "message": message,
            "topic": topic,
            "hashtags": hashtags,
            "source": source,
            "author": author
        }
    }}, function (error, response) {
        console.log(response);
        res.send(req.query.message);
  });
  var responseMessage = "Quote successfully added!";
  res.redirect('/quotes?message=' + responseMessage);
});

module.exports = router;
