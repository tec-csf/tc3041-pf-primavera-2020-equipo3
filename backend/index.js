const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');

const app = new express();
const { config, engine } = require("express-edge");

const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority";
var str = "";

var userLogin = [];
var port = 4000;
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

    userLogin.push(email);

    console.log(userLogin);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dB = db.db("tienda");
        var collection = dB.collection("users");

        collection.findOne({"Email":email}, function(err, doc){
            if(err) throw err;

            console.log(password);

            var passVer = passwordHash.verify(password, doc["Password"]);

            console.log(passVer);

            if(doc && doc._id){
                if (passVer == true) {
                    //console.log(doc);
                    //var string = encodeURIComponent(doc);
                    //console.log(userSession);
                    console.log("Correct login")
                    res.redirect("/home");
                }   else{
                    res.send("Invalid login, check your credentials");
                }
            }else{
                res.send("Invalid login, check your credentials");
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
        Password: passwordHash.generate(req.body.passwd)
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
        Price: parseFloat(req.body.price),
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


// Card settings
app.get('/cards', async(req, res)=>{
    console.log("Cards");
    console.log(userLogin);

    var userVer = userLogin.toString();

    var search = {
        uEmail: userVer
    };

    MongoClient.connect(url, async(err, db) => {
        if(err) throw err;
        
        console.log(search);
        
        var dB = db.db("tienda");

        var cards = await dB.collection("bank accounts").find(search).sort({_id:1}).toArray();

        console.log(cards);

        res.render('cards', {
            cards: cards
        })
    })
});

app.get('/addCard', async(req, res)=>{
    var userVer = userLogin.toString();
    console.log(userVer);

    res.render('addCard', {
        userVer
    })
});

app.post('/addCards/save', (req, res) =>{
    
    var userVer = userLogin.toString();

    var search = {
        Email: userVer
    }

    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        var dB = db.db("tienda");

        dB.collection("users").find(search).toArray(function(err,user){
            if (err) throw err;
            var user = user[0];

            var tarjeta = {
                uID: user._id,
                uEmail: userVer,
                cNumber: req.body.cNumber,
                bank: req.body.bank,
                expDate: req.body.expDate,
            };

            dB.collection("bank accounts").insertOne(tarjeta, function(err, result){
                if(err) throw err;

                console.log("Card added");
            })

            res.redirect('/cards');
        });
    })
})

app.get('/deleteCard', async(req, res)=>{
    
    var userVer = userLogin.toString();

    var search = {
        uEmail: userVer
    }

    MongoClient.connect(url, async function(err, db){
        if(err) throw err;

        var dB = db.db("tienda");
        
        dB.collection("bank accounts").find(search).toArray(function (err, card) {
            if (err) throw err;

            var cardDel = card[0];

            res.render('deleteCard', {
                cardDel
            })
        })
    })
});

app.post('/deleteCard/confirm', (req, res)=>{

    var userVer = userLogin.toString();
    
    var search = {
        Email: userVer
    };

    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dB = db.db("tienda");
        
        dB.collection("users").find(search).toArray(function(err, user){
            if (err) throw err;
            
            var userS = user[0];
            
            console.log(userS._id);
            
            var delCard = {
                uID: userS._id,
                uEmail: userVer,
                cNumber: req.body.cNumber,
                bank:   req.body.bank,
                expDate: req.body.expDate
            };

            console.log(delCard);

            dB.collection("bank accounts").remove(delCard, function(err, result){
                if (err) throw err;

                console.log("\nCard deleted");
            })

        });
        
    });

    res.redirect('/mainSettings');
});
//End cards

//Addresses
app.get('/address', async(req, res)=>{
    console.log("\nAddresses");
    console.log(userLogin);

    var userVer = userLogin.toString();

    var search = {
        uEmail: userVer
    };

    MongoClient.connect(url, async(err, db)=>{
        if(err) throw err;
        console.log(search);

        var dB = db.db("tienda");
        
        var addresses = await dB.collection("addresses").find(search).sort({_id:1}).toArray();

        res.render('address',{
            addresses: addresses
        })
    })
})

app.get('/newAddress', async(req, res)=>{
    var userVer = userLogin.toString();
    
    res.render('newAddress',{
        userVer
    })
});

app.post('/newAddress/save', async(req, res)=>{
    var userVer = userLogin.toString()

    var search={
        Email:userVer
    };

    MongoClient.connect(url, function(err, db){
        if (err) throw err;

        var dB = db.db("tienda");

        dB.collection("users").find(search).toArray(function(err, user){
            if(err) throw err;

            var user = user[0];

            var dir ={
                uID: user._id,
                uEmail: userVer,
                aName: req.body.name,
                street: req.body.street,
                intNumber: req.body.number,
                PC: req.body.pC,
                Country: req.body.country,
                State: req.body.state,
                City: req.body.city
            }

            console.log(dir);

            dB.collection("addresses").insertOne(dir, function(err, result){
                if (err) throw err;
                console.log("Address added")
            })
            res.redirect('/mainSettings');
        })
    })
})

app.get('/deleteAddress', async(req, res)=>{
    var userVer = userLogin.toString();

    var search = {
        uEmail: userVer
    };

    MongoClient.connect(url, async function(err, db){
        if (err) throw err;
        var dB = db.db("tienda")

        dB.collection("addresses").find(search).toArray(function(err, dir){
            if (err) throw err;

            var address = dir[0];

            res.render('deleteAddress', {
                address
            })
        })
    })
});

app.post('/deleteAddress/save', (req, res)=>{
    var userVer = userLogin.toString();

    console.log(userVer)

    var addressData = {
        _id: req.body.addressID
    }

    var searchUser = {
        Email: userVer
    }

    console.log(addressData);

    var dir = {
        uEmail: userVer,
        aName: req.body.name,
        street: req.body.street,
        intNumber: req.body.number,
        PC: req.body.pC,
        Country: req.body.country,
        State: req.body.state,
        City: req.body.city
    }

    MongoClient.connect(url, async function(err, db){
        if (err) throw err;
        var dB = db.db("tienda");

        dB.collection("users").find(searchUser).toArray(function(err, user){
            if (err) throw err;

            var usr = user[0];

            console.log(usr._id);

            var dir = {
                uID: usr._id,
                uEmail: userVer,
                aName: req.body.name,
                street: req.body.street,
                intNumber: req.body.intNumber,
                PC: req.body.pC,
                Country: req.body.country,
                State: req.body.state,
                City: req.body.city
            }

            dB.collection("addresses").remove(dir, function(err, result){
                if (err) throw err;

                console.log("Address deleted");
            })

        })
    })
    res.redirect('/mainSettings')
});
//Fin settings

//wishlist
/* app.get('/wishlist', async(req, res)=>{
    console.log(userLogin);

    var userVer = userLogin.toString();

    MongoClient.connect(url, async(err, db)=>{
        if (err) throw err;

        var dB = db.db("tienda");
        var collectionU = dB.collection("users");


    })
}) */

//Cart
app.get('/cart', async(req, res)=>{
    
    var userVer = userLogin.toString();

    var searchU = {
        uEmail: userVer
    };

    MongoClient.connect(url, async(err, db)=>{
        if (err) throw err;

        var dB = db.db("tienda");
        
        var cartI = await dB.collection("cart").find(searchU).sort({_id:-1}).toArray();

        res.render('cart', {
            cartI: cartI
        })
    })
});

//User logut
app.get('/logout',async(req, res)=>{
    userLogin = [];
    console.log(userLogin)
    res.redirect('login');
})

app.listen(port, () => {
    console.log('App is running in port ' + port)
});