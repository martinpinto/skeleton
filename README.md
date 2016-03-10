## Project description
This repository is a minimalistic stack for node.js, espress.js, and MongoDB or Elastic or CouchDB. Express.js does not use the templating language Jade. The use of plain HTML is also possible (e.g. in combination with Angular.js).

In order to get this project running, you must have node.js and MongoDB or Elastic or CouchDB installed on your computer. Install packages with: **npm install**.

## Choosing the database

### CouchDB
[  ] Integration coming soon

### MongoDB
If you want to choose the MongoDB functionality, you must before install MongoDB and start the mongod server. The settings for MongoDB can be found under: ./bin/config/mongodb_config.js. In order to use MongoDB just active MongoDB and its routes in app-backend.js.

### Elasticsearch
If you want to choose the ElasticSearch functionality, you must before install Elasticsearch and start the Elasticsearch server.
The settings for ElasticSearch can be found under: ./bin/config/database/elasticsearch.js.

## Starting the project
Start the node server with: **node ./bin/start** from the command line or start the project in debug mode using: **DEBUG=es_template:* ./bin/start** or if you have nodemon installed use: **nodemon --debug ./bin/start**

Open the browser and navigate to **localhost:3000** and you are all set!

### TODO
* [  ] CouchDB Integration
* [  ] Docker Integration
* [x] TOML configuration
* [  ] Better Logging

### Stack

[node.js](http://nodejs.org/)

[express.js](http://expressjs.com)

[ElasticSearch](http://elastic.co)

[MongoDB](http://mongodb.org)

[Mongoose](http://mongoosejs.com/)

[CouchDB](http://couchdb.apache.org/)