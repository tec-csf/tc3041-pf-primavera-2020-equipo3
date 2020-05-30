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


var search = {
    Email: email
}

var searchBA = {
    uEmail: email
}


MongoClient.connect(url, async function (err, db) {

    var dB = db.db("tienda");

    var collection = dB.collection('users'); // get reference to the collection
    collection.find(search, {$exists: true}).toArray(function (err, doc) //find if a value exists
        {
             console.log(doc.Email);
             console.log(doc)

             if (doc.Email) {
                 console.log("Else")
                 res.send("Enter a valid email address");
            } else {
                console.log("That email is already being used.");
            }

        });
});
                /*  dB.collection("users").insertOne(user, function (err, result) {
                     if (err) throw err;
                     console.log("User created");
                     db.close();
                     res.redirect('/');
                 }); */
