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
var email = "a01021960@itesm.mx";
var password = "admin1234";
var cNumber = "1234567890098765";
var bank = "CitiBanamex";
var expDate = "2020-12";

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

MongoClient.connect(url, async function (err, db) {
    if (err) throw err;

    var dB = db.db("tienda");

    dB.collection("bank accounts").find(searchBA).toArray(function (err, card) {
        if (err) throw err;

        var cardDel = card[0];
        console.log(cardDel);
    })

    /* dB.collection("users").find(search).toArray(function (err, user){
        if (err) throw err;

        var userS = user[0];

        console.log(userS);

        var searchBA = {
            uEmail: userVer
        }

        
    }) */
})

/* MongoClient.connect(url, async function (err, db) {
    if (err) throw err;

    var dB = db.db("tienda");

    dB.collection("users").find(search).toArray(function(err, user){
        if(err) throw err;

        var userS = user[0];

        console.log(user);
        console.log(userS);

        var cardDel = {
            uID: userS._id,
            uEmail: userVer,
            cNumber: cNumber,
            bank: bank,
            expDate: expDate,
        };

        console.log(cardDel);

    })
}) */

/* MongoClient.connect(url, async function (err, db) {
    if (err) throw err;

    var dB = db.db("tienda");

    dB.collection("users").find(search).toArray(function(err, user){
        if (err) throw err;

        var user = user[0];

        var delCard = {
            uID: user._id,
            uEmail: userVer,
            cNumber: cNumber,
            bank: bank,
            expDate: expDate,
        };

        console.log(delCard);

        dB.collection("bank accounts").deleteOne(delCard, function(err, result){
            if (err) throw err;
            console.log("\n"+ result + "\nCard deleted")
        })
        
        console.log(user);
    });
}) */