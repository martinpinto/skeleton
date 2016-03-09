/********
 * Routes
 ********/
/**
 * This rounter handler manages all routes incoming from the web browser.
 */
var express = require('express');
var router = express.Router();
var config = require('config');

/************
 * API Routes
 ************/
/*
 * This router handler handles all calls to the API.
 */
var express = require('express');
var router = express.Router();
var elastic = require('../../config/elasticsearch');
var config = require('config');

// Elasticsearch information
var esIndex = config.get('engine.dbConfig.elasticsearch.index');
var esTypes = config.get('engine.dbConfig.elasticsearch.types');
var esTypeQuotes = esTypes[0]; // quotes elasticsearch type
var esTypeAuthors = esTypes[1]; // authors elasticsearch type
var esTypeTopics = esTypes[2]; // topics elasticsearch type


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

///////////////////////////////// AUTHORS /////////////////////////////////

/**
 * Fetches all authors
 * @param
 * @param
 * @param
 */
router.get('/authors/', function (req, res) {
  elastic.client.search({
    index: esIndex,
    type: esTypeAuthors,
    q: 'type:author',
    size: 1000
  }, function (error, response) {
    if (response) {
      res.jsonp(response.hits.hits);
    } else {
      res.send('Could not find any authors!');
    }
  });
});

/**
 *  Fetches an existing author by ID
 *  @param id the ID of the author of the quote
 */
router.get('/authors/:id', function (req, res, next) {
  elastic.client.get({
    index: esIndex,
    type: esTypeAuthors,
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
 *  Updates an existing author
 *  @param id the ID of the author
 */
router.put('/authors/:id', function (req, res) {

});

/**
 *  Inserts a new author
 *  @param
 *  @param
 *  @param
 */
router.post('/authors/', function (req, res, next) {
    console.log(req);
    console.log(res);
    elastic.client.index({
        index: esIndex,
        type: esTypeAuthors,
        body: {
            "tweet": {
                "user": req.query.user,
                "post_date": new Date(),
                "message": req.query.message
            }
        }
    }, function (error, response) {
        console.log(response);
        res.send(req.query.message);
    });
});

/**
 *  Deletes an existing author
 *  @param id the ID of the author
 */
router.delete('/authors/:id', function (req, res) {

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
  res.render('quotes');
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

///////////////////////////////// TOPICS /////////////////////////////////

/**
 * Fetches all topics
 * @param
 * @param
 * @param
 */
router.get('/topics/', function (req, res) {
  elastic.client.search({
    index: esIndex,
    type: esTypeTopics,
    q: 'type:topic',
    size: 1000
  }, function (error, response) {
    if (response) {
      res.json(response.hits.hits);
    } else {
      res.send('Could not find any topics!');
    }
  });
});

/**
 *  Fetches an existing topic by ID
 *  @param id the ID of the topic of the quote
 */
router.get('/topics/:id', function (req, res) {
  elastic.client.get({
    index: esIndex,
    type: esTypeTopics,
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
 *  Updates an existing topic
 *  @param id the ID of the topic
 */
router.put('/topics/:id', function (req, res) {

});

/**
 *  Inserts a new topic
 *  @param
 *  @param
 *  @param
 */
router.post('/topics/', function (req, res) {

});

/**
 *  Deletes an existing topic
 *  @param id the ID of the topic
 */
router.delete('/topics/:id', function (req, res) {

});

module.exports = router;
