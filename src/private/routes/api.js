/********
 * Routes
 ********/
/**
 * This rounter handler manages all routes incoming from the web browser.
 */
var express = require('express');
var router = express.Router();
var acquire = require('acquire');
var config = acquire('config');

/************
 * API Routes
 ************/
/*
 * This router handler handles all calls to the API.
 */

var elastic = acquire('elasticsearch');

// Elasticsearch information
var esIndex = config.database.elasticsearch.index;
var esTypes = config.database.elasticsearch.types;
var esTypeQuotes = esTypes[0]; // quotes elasticsearch type

/**
 *  Test route
 *  sends HTTP status 200 to show server is working OK.
 *  @return an HTTP status 200
 */
router.get('/', function (req, res) {
    console.log(req.query.name);
    console.log(req.query);
    res.send(200);
});

///////////////////////////////// QUOTES /////////////////////////////////

/**
 * Searches quotes
 * @param
 * @param
 * @param
 */
router.get('/quotes/search', function (req, res) {
  elastic.client.search({
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
});

/**
 * Fetches all quotes
 * @param
 * @param
 * @param
 */
router.get('/quotes', function (req, res) {
  elastic.client.search({
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
router.get('/quotes/:id', function (req, res) {
  elastic.client.get({
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
 *  Updates an existing quote
 *  @param id the ID of the quote
 */
router.put('/quotes/:id', function (req, res) {
  console.log(req.params.id);
});

/**
 *  Inserts a new quote
 *  @param
 *  @param
 *  @param
 */
router.post('/quotes', function (req, res) {
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

/**
 *  Deletes an existing quote
 *  @param id the ID of the quote
 */
router.delete('/quotes/:id', function (req, res) {

});

module.exports = router;
