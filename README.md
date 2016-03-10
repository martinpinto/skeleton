## Project description
This repository is a minimalistic stack for node.js, espress.js, and MongoDB or Elastic. Express.js does not use the templating language Jade. Instead Hogan can be optionally used. The use of plain HTML is also possible (e.g. in combination with Angular.js).

In order to get this project running, you must have node.js and MongoDB or Elastic installed on your computer. The node_modules are already installed in the repository and therefore it is not necessary to install them with npm. If required however, you can remove packages and reinstall them with: **npm install**.

## Choosing the database

### CouchDB
[ ] Integration coming soon

### MongoDB
If you want to choose the MongoDB functionality, you must before install MongoDB and start the mongod server. The settings for MongoDB can be found under: ./bin/config/mongodb_config.js. In order to use MongoDB just active MongoDB and its routes in app.js.

### Elasticsearch
If you want to choose the Elasticsearch functionality, you must before install Elasticsearch and start the Elasticsearch server.
The settings for MongoDB can be found under: ./bin/config/elasticsearch_config.js.
In order to use MongoDB just active Elasticsearch and its routes in app.js.

## Starting the project
Start the node server with: **node server.js** from the command line or start the project in debug mode using: **DEBUG=es_template:* ./bin/www** or if you have nodemon installed use: **nodemon --debug ./bin/www**

Open the browser and navigate to **localhost:3000** and you are all set!

### TODO
[ ] CouchDB Integration
[ ] Docker Integration

### Stack

[node.js](http://nodejs.org/)

[express.js](http://expressjs.com)

[Elastic](http://elastic.co)

[MongoDB](http://mongodb.org)

[Mongoose](http://mongoosejs.com/)