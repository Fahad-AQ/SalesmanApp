/// <reference path="./Server/typings/tsd.d.ts" />
import express = require("express");
import path = require("path");
import bodyParser = require("body-parser");
import mongoose = require("mongoose");
import {router} from "./Server/routes/general";
mongoose.connect("mongodb://faq:faq123@ds039155.mongolab.com:39155/faqdb");
 
var db = mongoose.connection;
 

let app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
 });
app.set("port", process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/Server/statics'));
app.use('/api', router)
app.get('/', (req: express.Request,res:express.Response)=>{
    res.sendFile(path.join(__dirname + '/Server/statics/index.html'))
})

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

app.listen(app.get("port"),()=>{
    console.log("Server is running on port", app.get("port"))
}) 