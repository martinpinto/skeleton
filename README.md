[![Build Status](https://travis-ci.org/martinpinto/skeleton.svg?branch=master)](https://travis-ci.org/martinpinto/skeleton) 

## Project description
This repository is a minimalistic stack for node.js, espress.js, and ElasticSearch or/and CouchDB. Express.js does not use the templating language Jade. The use of plain HTML is also possible (e.g. in combination with Angular.js). This project contains a sample AngularJS weather application.

In order to get this project running, you must have node.js and ElasticSearch or/and CouchDB installed on your computer. Install packages with: **npm install**.

## Project structure
The project is structured as follows:

```
|-- bin
|-- config
|-- src
|   |-- private
|   |-- public
```
* `/bin` - contains the backend starting script ./start.
* `/config` - contains all configuration files for the backend.
* `/src/private` - contains the backend application `app-backend.js` file and all necessary routes for the backend API.
* `/src/public` - contains the frontend application `app-frontend.js` and all frontend related files. 

*Note: the main configuration file can be found under `/config/default.toml`. This file contains all necessary configuration for the backend.*

## Choosing the database

### CouchDB
If you want to choose CouchDB make sure you have CouchDB installed and running (e.g. via brew install couchdb && couchdb).
The settings for CouchDB can be found under ./config/default.toml

### Elasticsearch
If you want to choose the ElasticSearch functionality, you must before install ElasticSearch and start the ElasticSearch server.
The settings for ElasticSearch can be found under: ./config/default.toml.

## Starting the project
Start the node server with: **node ./bin/start** from the command line or start the project in debug mode using: **DEBUG=es_template:* ./bin/start** or if you have nodemon installed use: **nodemon --debug ./bin/start**

Open the browser and navigate to **localhost:3000** and you are all set!

## TODO
[x] CouchDB Integration

[  ] Docker Integration

[x] TOML configuration

[  ] Better Logging

## Stack

[node.js](http://nodejs.org/)

[express.js](http://expressjs.com)

[ElasticSearch](http://elastic.co)

[CouchDB](http://couchdb.apache.org/)