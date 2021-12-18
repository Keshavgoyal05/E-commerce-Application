const db = require("../models");
const sendmail = require("./mail.controller");
const Order = db.order;
const ProductOrder = db.productOrder;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;



//Get All Orders w.r.t userid
exports.getAllOrders = (req, res) => {
  var userid = req.params.userid;
  sequelize.query (`select o.order_id, o.purchase_date, o.delivery_address, o.payment_status, o.phone, po.order_status, po.product_id, po.quantity, po.price  from public."order" as o inner join public."productOrder" as po USING(order_id) where po.user_id=${userid};`, {type : sequelize. QueryTypes .SELECT} )
  .then(data => {
      console.log(data); 
      res.status(200).send(data) 
  }).catch ( err => { 
      console.error("There is an error getting delivery data from db : "+err); 
      res.status(400).send (err); 
  }) 
};  


//Post Order
exports.addOrder = (req, res) => {
  const order = req.body;
  Order.create(order)
  .then(data => {
    res.status(201).send({
      message: "order added Successfully.",
      order_id : data.order_id
    });
  })
  .catch(err => {
    console.log(err);
    res.status(400).send({
      message : "Error while adding order to DB.",
      error : err.message
    });
  });
};


//Post all  cart products to productOrder table
exports.addProductOrder = (req, res) => {
    ProductOrder. bulkCreate (req.body)
    .then ( (data) => { 
        res.status(201).send({
            message: "all cart products added to productOrder Table successfully"
          }); 
    }).catch ( (err) => {  
        console.log(err);
        res.status(400).send({
          message : "Unabled to add cart products to productOrder Table",
          error : err.message
        });
    })
};


