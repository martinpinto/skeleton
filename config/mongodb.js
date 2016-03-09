// MongoDB ===========================================

var mongoose = require('mongoose');
var dbconfig = require('./mongodb_config');
var db = mongoose.connection;

// make available in all moduls
global.db = db;

if (process.env.OPENSHIFT_NODEJS_IP === void 0) {
    mongoose.connect(dbconfig.url);
} else {
    mongoose.connect(dbconfig.urlprod);
}

// if connection is successful
db.on("connected", function (ref) {
    console.log("Connected to db");

    var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; // set our port
    var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

    // get all data/stuff of the body (POST) parameters
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({
        type: "application/vnd.api+json"
    })); // parse application/vnd.api+json as json
    app.use(bodyParser.urlencoded({
        extended: true
    })); // parse application/x-www-form-urlencoded

    // activate CORS for server
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // make a public folder for express available
    app.use(express.static(__dirname + "/public"));

    // routes ==================================================
    require("../../routes/mongodb")(app); // configure our routes

    // start app ===============================================
    app.listen(port, ip, function () {
        console.log("Server started on http://" + ip + ":" + port);
    });

});

// If the connection throws an error
db.on("error", function (err) {
    console.error("Failed to connect to db on startup ", err);
});

// When the connection is disconnected
db.on("disconnected", function () {
    console.log("Mongoose default connection to db disconnected");
});

var gracefulExit = function () {
    db
        .close(function () {
            console
                .log("Mongoose default connection with db is disconnected through app termination");
            process.exit(0);
        });
};