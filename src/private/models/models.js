/**
 * All mongoose models are here defined.
 * There is no need to put them in separate files yet.
 * This way you can get the models pretty quick and use them with:
 *            var models = require("../../models/models");
 *            models.polls.find({});
 */

var db = global.db;

var mongoose = require("mongoose");

// users model
var usersSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    surname: String,
    email: String,
    preferences: {
        allergies: String

    }
});
exports.users = db.model("users", usersSchema);

// choices model
var choicesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    label: {
        en: String,
        de: String
    },
    count: Number
});
exports.choices = db.model("choices", choicesSchema);