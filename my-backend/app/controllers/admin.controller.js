const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => { 
  User.findAll({raw : true}).then ( data => { 
      console.log(data); 
      res.status (200).send(data) 
  }).catch ( err => { 
      console.error("There is an error getting data from db : "+err); 
      res.status (400).send (err); 
  }) 
};

//Inserts a record into the table insurancesequelize. 
exports.insert = (req, res) => {
    console.log("in insert");
    var userObj = User.build(
      req.body
  ); 
  userObj.save().then (data => { 
      var strmsg = "Record inserted successfully..."; 
      res.status (201).send (strmsg); 
  }).catch(err => { 
      console.error("Error is "+ err); 
      res.status (400). send (err); 
  }) 
};

//Update the record. 
exports.update = (req, res) => {
  User.update( req.body ,
      {
          where : {
              user_id : req.body.user_id
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
exports.delete = (req, res) => { 
  console.log("Entering deleteStudent"); 
  var id = req.params.id; 
  console.log("Given id is : "+id); 
  User.destroy ({where : {user_id : id}}).then ( data => { 
      console.log(data); 
      var strmsg = "Record deleted successfully..."; 
      res.status (200). send (strmsg); 
  }).catch ( err => { 
      console.error("There is an error deleting a record : "+err); 
      res.status (400).send (err); 
  }) 
};

