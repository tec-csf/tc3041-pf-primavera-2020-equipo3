const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const { config, engine } = require("express-edge");

const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority";
var str = "";

var userLogin = [];

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

//  Login
app.get('/', async (req, res) => {
    console.log(userLogin);
  res.render('login');
});

app.get('/login', async (req, res) => {
    res.render('login');
});

app.post('/loginValidate', async(req, res) => {
    
    userLogin = [];

    var email = req.body.email;
    var password = req.body.passwd;

    console.log(email);

    console.log(password);

    userLogin.push(email);

    console.log(userLogin);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dB = db.db("tienda");
        var collection = dB.collection("users");

        collection.findOne({"Email":email}, function(err, doc){
            if(err) throw err;

            if(doc && doc._id){
                if (password == doc["Password"]) {
                    //console.log(doc);
                    //var string = encodeURIComponent(doc);
                    //console.log(userSession);
                    console.log("Correct login")
                    res.redirect("/home");
                }else{
                    res.send("Invalid login, check your password");
                }
            }else{
                res.send("Invalid login, check your email");
            }
        });
    }); 
});

//In case there's a login error
app.get('/loginerror', (req, res)=>{
    res.render('loginerror')
})

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

//  Home Screen
app.get('/home', async (req, res) => {

    console.log("Home");
    console.log(userLogin);

    var userVer = userLogin.toString();

    mongo.connect(url, async(err, db) =>{
        
        console.log(userVer);

        if (err) throw err;
        var dB = db.db("tienda");
        var collectionUsers = dB.collection("users");

        var products = await dB.collection('products').find({}).sort({_id:1}).toArray();
        var user = await collectionUsers.findOne({"Email": userVer});

        console.log(user);

        console.log(products);

        res.render('home', {
            user,
            products: products
        })
    })
});

//  Screens Settings
app.get('/mainSettings', async(req,res)=>{
    //res.render('mainSettings');
    var userVer = userLogin.toString();
    console.log(userVer);

    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        var dB = db.db("tienda");
        var collection = dB.collection("users");

        var search={
            Email:userVer
        };

        collection.find(search).toArray(function(err, userS){
            if(err) throw err;

            var user = userS[0];

            console.log(user);
            res.render('mainSettings',{
                user
            });
        })
    })
});

//Solo para añadir productos
app.get('/products', async(req, res)=>{
    res.render('productos');
});

app.post('/addProducts/save', (req, res) => {
    var product = {
        Name: req.body.name,
        Brand: req.body.brand,
        Price: req.body.price,
        Description: req.body.description,
        Rating: req.body.rating,
        Availability: req.body.availability,
        Image: req.body.image
    };

    console.log(product);

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dB = db.db("tienda");
        dB.collection("products").insertOne(product, function (err, result) {
            if (err) throw err;
            console.log("Product created");
            db.close();
        });
    });
    res.redirect('/home');
});

app.get('/cards', async(req, res)=>{
    res.render('cards')
});


//User logut
app.get('/logout',async(req, res)=>{
    userLogin = [];
    console.log(userLogin)
    res.render('login');
})

app.listen(4000, () => {
    console.log('App is running in port 4000')
});