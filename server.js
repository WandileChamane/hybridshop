//server file for node

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('hybrid', ['users, products, history']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

app.get('/getProducts', function (req, res) {
  console.log('I received a GET request');
  db.products.find(function (err, docs) {
    res.json(docs);
  });
});

app.get('/getProduct/:id', function (req, res) {
  var id = req.params.id;
  db.products.find({_id: mongojs.ObjectId(id)},function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/addHistory', function (req, res) {
  db.history.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/addProduct', function (req, res) {
  db.products.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.post('/login', function (req, res) {
  db.users.find(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/register', function (req, res) {
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.get('/getUpdatedUser/:id', function (req, res) {
  var id = req.params.id;
  db.users.find({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.post('/updateBalance', function (req, res) {
  var id = req.body.id;
  console.log(req.body)
  db.users.update({_id: mongojs.ObjectId(id)},{$set: {balance: req.body.balance}},function(err, doc) {
    res.json(doc);
  });
});

app.get('/getHistory/:id', function (req, res) {
	var id = req.params.id;
  	db.history.find({userId: id},function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/checkuser/:username', function (req, res) {
	var username = req.params.username;
  	db.users.find({username: username},function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});




app.listen(3000);
console.log("Server running on port 3000");