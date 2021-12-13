const db = require("../models");
const Cart = db.carts;
const Op = db.Sequelize.Op;

exports.getCartsBasedOn_UserID = (req, res) => { 
    var id = req.params.id; 
    Cart.findAll({where : {user_id: id},raw : true}).then ( data => { 
      console.log(data); 
      res.status (200).send(data);
    }).catch ( err => { 
      console.error("There is an error getting data from db based on user id: "+err); 
      res.status (400).send (err); 
    }) 
};

exports.getCartsBasedOn_UserID_ProductID = (req, res) => { 
    Cart.findAll({where : {user_id: req.body.user_id, product_id : req.body.product_id},raw : true}).then ( data => { 
        console.log(data); 
        res.status (200).send(data) 
    }).catch ( err => { 
        console.error("There is an error getting data from db based on userid and product id : "+err); 
        res.status (400).send (err); 
    }) 
  };

//Inserts a record into the table insurancesequelize. 
exports.insertCartItem = (req, res) => {
    console.log("in insert");
    var carObj = Cart.build(
      req.body
  ); 
  carObj.save().then (data => { 
      var strmsg = "Added to cart successsfully"; 
      res.status (201).send (strmsg); 
  }).catch(err => { 
      console.error("Error is "+ err); 
      res.status (400). send (err); 
  }) 
};

//Update the record. 
exports.updateCartItem = (req, res) => {
  Cart.update( {
      quantity : req.body.quantity,
    },{
        where : {
            user_id : req.body.user_id,
            cart_id : req.body.cart_id
        }
    } 
  ).then (data => { 
      console.log(data); 
      var strmsg = "Record updated successfully.."; 
      res.status (201).send (strmsg); 
  }).catch ( err => { 
      console.error("There is an error updating table : Reason : " + err); 
      res.status (400).send (err); 
  }) 
};

//Delete the record by ID. 
exports.deleteCartItem = (req, res) => { 
  console.log("Entering deleteStudent"); 
  var id = req.params.id; 
  console.log("Given id is : "+id); 
  Cart.destroy ({where : {cart_id : id}}).then ( data => { 
      console.log(data); 
      var strmsg = "Record deleted successfully..."; 
      res.status (200). send (strmsg); 
  }).catch ( err => { 
      console.error("There is an error deleting a record : "+err); 
      res.status (400).send (err); 
  }) 
};

