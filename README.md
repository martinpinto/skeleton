## Project description
This repository uses node.js, espress.js and Elasticsearch as its stack.

In order to get this project running, you must have node.js and Elasticsearch installed on your computer.
The node_modules can be installed using: **npm install**

## Choosing the database

### Elasticsearch
If you want to choose the Elasticsearch functionality, you must before install Elasticsearch and start the Elasticsearch server.
The settings for MongoDB can be found under: ./bin/config/elasticsearch_config.js.
In order to use MongoDB just active Elasticsearch and its routes in app.js.

## Starting the project
Start the node server with: **node server.js** from the command line or start the project in debug mode using: **DEBUG=es_template:* ./bin/www** or if you have nodemon installed use: **nodemon --debug ./bin/www**

Open the browser and navigate to **localhost:3000** and you are all set!

### Stack

[node.js](http://nodejs.org/)
[express.js](http://expressjs.com)
[Elasticsearch](http://elasticsearch.org)
