const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const productData = require("../../productData"); 

//Post all  products to product table
exports.addMockProductsToDB = (req, res) => {
    console.log("Mock Product Data : "+JSON.stringify(productData.products));
    Product. bulkCreate (productData.products)
    .then ( (data) => { 
        res.status(201).send({
            message: "all products added to product table"
          }); 
    }).catch ( (error) => {  
        console.log(error);
        res.status(400).send({
          message : "Unabled to add all products added to product table because "+error.message
        });
    })
};

exports.getAllProducts = (req, res) => { 
    Product.findAll({raw : true}).then ( data => { 
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
  console.log(req.body);
  productObj.save().then (data => { 
      var strmsg = "Record inserted successfully..."; 
      res.status (201).send (strmsg); 
  }).catch(err => { 
      console.error("Error is "+ err); 
      res.status (400). send (err); 
  }) 
};

exports.updateProduct = (req, res) => {
    console.log("In update Product - ");
    console.log(req.body);
    Product.update( req.body ,
        {
            where : {
                product_id : req.body.product_id
            }
        } 
    ).then (data => { 
        console.log(data); 
        var strmsg = "Product updated successfully.."; 
        res.status (201).send (strmsg); 
    }).catch ( err => { 
        console.error("There is an error updating Product : Reason : " + err); 
        res.status (400).send (err); 
    }) 
};
  
 
exports.deleteProducts = (req, res) => {
    console.log("In delete product - ");
    var id = req.params.productid; 
    console.log("Given id is : "+id); 
    Product.destroy ({where : {product_id : id}}).then ( data => { 
        console.log(data); 
        var strmsg = "product deleted successfully..."; 
        res.status (200). send (strmsg); 
    }).catch ( err => { 
        console.error("There is an error deleting product : "+err); 
        res.status (400).send (err); 
    })  
};