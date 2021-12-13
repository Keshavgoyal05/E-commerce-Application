const db = require("../models");
const Delivery = db.delivery;



exports.getDeliveryData = (req, res) => { 
  var userid = req.params.userid;
  Delivery.findAll({where : {user_id: userid},raw : true}).then ( data => { 
      console.log(data); 
      res.status (200).send(data) 
  }).catch ( err => { 
      console.error("There is an error getting delivery data from db : "+err); 
      res.status (400).send (err); 
  }) 
};

exports.getDeliveryDataById = (req, res) => { 
  console.log("in getDeliveryDataById");
  var userid = req.params.userid;
  var deliveryid = req.params.deliveryid;
  Delivery.findAll({where : {user_id: userid, delivery_id : deliveryid},raw : true}).then ( data => { 
    console.log(data); 
    res.status (200).send(data) 
  }).catch ( err => { 
    console.error("There is an error getting  Delivery data  userid and delivery id : "+err); 
    res.status (400).send (err); 
  }) 
};


exports.insertDelivery = (req, res) => {
    console.log("in insert delivery address");
    const delivery = req.body;
    Delivery.create(delivery)
    .then(data => {
    console.log("address added successfully");
      res.status(201).send({
        message: "Delivery address added Successfully.",
        delivery_data : data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(201).send({
        message : "Error while adding delivery address.",
        error : err.message
      });
    });
};


exports.updateDelivery = (req, res) => {
  console.log("in update delivery address");
  Delivery.update( req.body ,
    {
        where : {
            user_id : req.body.user_id,
            delivery_id : req.body.delivery_id
        }
    } 
  ).then (data => { 
    console.log("address updated successfully");
    res.status(201).send({
      message: "Delivery address updated Successfully."
    }); 
  }).catch ( err => { 
    console.log(err);
    res.status(201).send({
      message : "Error while updating delivery address.",
      error : err.message
    });
  })
};

exports.deleteDeliveryAddress = (req, res) => {
  console.log("in getDeliveryDataById");
  var userid = req.params.userid;
  var deliveryid = req.params.deliveryid;
  console.log(userid,deliveryid)
  Delivery.destroy ({where : {user_id: userid, delivery_id : deliveryid}}).then ( data => {  
    console.log("address updated successfully");
    res.status(200).send({
      message: "Delivery address deleted Successfully."
    });  
  })
  .catch ( err => { 
    console.error("There is an error getting  Delivery data  userid and delivery id : "+err); 
    console.log("address deleted successfully");
    res.status(400).send({
      message: "Delivery address delete failed.",
      error : err
    });  
  })
};