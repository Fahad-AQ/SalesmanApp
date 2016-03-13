/// <reference path="./Server/typings/tsd.d.ts" />
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var general_1 = require("./Server/routes/general");
mongoose.connect("mongodb://faq:faq123@ds039155.mongolab.com:39155/faqdb");
var db = mongoose.connection;
var app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Server/statics'));
app.use('/api', general_1.router);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/Server/statics/index.html'));
});
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});
app.listen(app.get("port"), function () {
    console.log("Server is running on port", app.get("port"));
});
