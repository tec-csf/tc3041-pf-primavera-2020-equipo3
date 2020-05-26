const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const {
    config,
    engine
} = require("express-edge");

const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url =
    "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority";
// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));

//
var email = "daniel.roa98@gmail.com";
var password = "admin1234";

MongoClient.connect(url, function (err, db) {
    
    if (err) throw err;

    var dB = db.db("tienda");

    var search ={
        Email: email
    };

    dB.collection("users").find(search).toArray(function(err, user) {
        if(err) throw err;

        var user = user[0];

        console.log(user)
    })
});