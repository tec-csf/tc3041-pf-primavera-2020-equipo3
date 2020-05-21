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
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority";
// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")))

//

MongoClient.connect(url, function(err, db){
    if (err) throw err;

    var dB = db.db("tienda");
    var collection = dB.collection("users");

    collection.find({
        Email: email
    }, {
        $exists: true
    }).toArray(function (err, doc) {
        if (doc) {
            //console.log(doc + "\n");

            collection.find({Password: password}, {$exists: true}).toArray(function(err, verified){
                if (verified) {
                    console.log(verified);
                } else if (!verified) {
                    console.log("Check your password once more");
                }
            })

        } else if (!doc) {
            console.log("Not in DB");
        }
        db.close();
    });
});