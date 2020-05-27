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

const prodName = Oreo;

MongoClient.connect(url, async function (err, db) {
    if (err) throw err;

    var dB = db.db("tienda");

    var searchU = {
        Email: userVer
    };
    var searchG = {
        uEmail: userVer
    };

    var searchC = {
        uEmail: userVer,
        pName: prodName
    };

    dB.collection("users").find(searchU).toArray(function (err, userS) {
        var user = userS[0];

        console.log(user)

        dB.collection("addresses").find(searchG).toArray(function (err, addS) {
            var add = addS[0];

            console.log(add);

            dB.collection("bank accounts").find(searchG).toArray(function (err, ba) {
                var card = ba[0];

                console.log(card);

                dB.collection("cart").find(searchC).toArray(function (err, ca) {
                    var car = ca[0];
                    console.log(car);

                    var total = parseFloat(car.quantity) * parseFloat(car.price);

                    var status = "4-6 weeks thanks to the outbreak";

                    var pedido = {
                        uID: user._id,
                        aID: add._id,
                        cID: card._id,
                        uEmail: userVer,
                        aName: add.aName,
                        toPay: total,
                        Status: status
                    }

                    console.log(total);
                    console.log(pedido);
                })
            })
        })
    })
})

console.log(prodName);