var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mydb = mongojs('hybrid', ['users, products']);
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/hybrid";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

 mydb.products.insert(	
		[{
		"name":"Schooter",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"137",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"Jacket",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"550",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"Shoes",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"65",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"Socks",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"85",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"Car",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"110",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"House",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"120",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"Bus",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"112",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		},{
		"name":"bicycle",
		"Desc":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"price":"100",
		"discount1":"0.25%",
		"discount2":"0.50%",
		"discount3":""
		}]
, function(err, doc) {
    
  });

 mydb.users.insert(
		[{
		"name":"Wandile",
		"username":"wandile",
		"surname":"Chamane",
		"addr":"1 Simmons, Johannesburg",
		"cellphone":"100",
		"balance":800,
		"isAdmin": true,
		"username":"wandile",
		"password":"password1"
		},{
		"name":"Steve",
		"username":"steve",
		"surname":"Smith",
		"addr":"8 Simmons, Johannesburg",
		"cellphone":"100",
		"balance":800,
		"isAdmin":false,
		"username":"steve",
		"password":"password2"
		},{
		"name":"John",
		"username":"john",
		"surname":"Thomas",
		"addr":"4 Simmons, Johannesburg",
		"cellphone":"100",
		"balance":800,
		"isAdmin":false,
		"username":"john",
		"password":"password4"
		}]
, function(err, doc) {
    
  });

  db.close();
});