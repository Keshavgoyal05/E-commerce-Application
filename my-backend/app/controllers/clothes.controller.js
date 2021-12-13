const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
//const jwt = require('jsonwebtoken');


exports.getAllClothes = (req, res) => { 
    Product.findAll({where : {category : 'clothes'},raw : true}).then ( data => { 
        console.log(data); 
        res.status (200).send(data) 
    }).catch ( err => { 
        console.error("There is an error getting data from db : "+err); 
        res.status (400).send (err); 
    }) 
};

//Inserts a record into the table insurancesequelize. 
exports.insertProducts = (req, res) => {
    console.log("in insert of products");
    var productObj = Product.build(
      req.body
  ); 
  productObj.save().then (data => { 
      var strmsg = "Record inserted successfully..."; 
      res.status (201).send (strmsg); 
  }).catch(err => { 
      console.error("Error is "+ err); 
      res.status (400). send (err); 
  }) 
};