const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const { config, engine } = require("express-edge");

const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority";
// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

//  Login
app.get('/', async (req, res) => {
  res.render('login');
});

app.get('/login', async (req, res) => {
    res.render('login');
});

app.post('/login/validate', async(req, res) => {
    
    var email = req.body.email;
    var password = req.body.passwd;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dB = db.db("tienda");
        var collection = dB.collection("users");

        collection.find({
            Email: email
        }, {
            $exists: true
        }).toArray(function (err, doc) {
            //console.log(doc);
            if (doc) {
                //console.log(doc + "\n");

                collection.find({
                    Password: password
                }, {
                    $exists: true
                }).toArray(function (err, verified) {
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
    res.redirect('/home');
});

//  Register a new user
app.get('/newUser', (req, res) => {
    res.render('newUser');
});

app.post('/newUser/save', (req, res) => {
    var user = {
        Name: req.body.name,
        LastName: req.body.lname,
        Email: req.body.email,
        Password: req.body.passwd
    };

    console.log(user);

    mongo.connect(url, function(err, db){
        if (err) throw err;
        var dB = db.db("tienda");
        dB.collection("users").insertOne(user, function (err, result) {
          if (err) throw err;
          console.log("User created");
          db.close();
        });
    });
    res.redirect('/');
});
//  End register a new user

app.get('/home', async (req, res) => {


    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("tienda");

        var user = await dB.collection('users').find({}).sort({_id: 1});

        console.log(usuarios);
        res.render('home', {
            usuario: user
        })
    })
    res.render('home');
})

app.listen(4000, () => {
    console.log('App is running in port 4000')
});