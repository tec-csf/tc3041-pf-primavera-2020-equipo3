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
var password = "admin1234";
var email = "a01021960@itesm.mx";
var cNumber = "1234098756789012";
var bank = "Scotiabank";
var expDate = "2019-03";


var userVer = email;

/* MongoClient.connect(url, function (err, db) {
    
    if (err) throw err;

    var dB = db.db("tienda");

    var search ={
        Email: email
    };

    dB.collection("users").find(search).toArray(function(err, user) {
        if(err) throw err;

        var user = user[0];

        var tarjeta = {
            uID: user._id,
            uEmail: email,
            cNumber: parseFloat(cNumber),
            bank: bank,
            expDate: expDate,
        };

        console.log(tarjeta)
    })
}); */

var search = {
    Email: email
}

var searchBA = {
    uEmail: email
}

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dB = db.db("tienda");

    dB.collection("users").find(search).toArray(function (err, user) {
        if (err) throw err;

        var userS = user[0];

        console.log(userS._id);

        var delCard = {
            uID: userS._id,
            uEmail: userVer,
            cNumber: cNumber,
            bank: bank,
            expDate: expDate,
        };

        console.log(delCard);

        dB.collection("bank accounts").remove(delCard, function (err, result) {
            if (err) throw err;

            console.log(result[0]);

            console.log("\nCard deleted");
        })

    });

});