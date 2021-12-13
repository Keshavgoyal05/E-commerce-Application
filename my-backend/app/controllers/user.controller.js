const { user } = require("../db.config");
const db = require("../models");
const sendmail = require("./mail.controller");
const whatsapp = require("./whatsapp.controller");
const User = db.users;
const Op = db.Sequelize.Op;
//const jwt = require('jsonwebtoken');


//Register User
exports.register = (req, res) => {
  const user = req.body;
  User.create(user)
  .then(data => {
    whatsapp.sendMsg(user.whatsappNo,"Hi "+user.firstName+"\n Welcome to ShopQuick.");
    sendmail.NewUserMail(user.email,user.firstName);
    res.status(201).send({
      message: "User Registered Successfully."
    });
  })
  .catch(err => {
    console.log(err);
    if(err=='SequelizeUniqueConstraintError: Validation error'){
      return res.status(201).send({
        message:
          "Email already exist"
      });
    }
    res.status(201).send({
      message : "Error while registering neww user.",
      error : err.message
    });
  });
};

//login user
exports.login = (req, res) => {
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(user => {
      if (!user) {
        console.log("user not found");
        return res.status(201).send({
        message: "User Not Found"
        });
      }
      else{
        if(user.password==req.body.password){
          console.log("log in success");
          return res.status(201).send({
            message: "Logged in Successfully",
            username: user.firstName,
            userid: user.user_id,
            login : true
          });
        }
        else{
          console.log("wrong password");
          return res.status(201).send({
          message: "Wrong Password"
          });
        }
      }
    })
    .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
          message: "Server error"
          });
        }
        return res.status(500).send({
        message: "Error retrieving User with id " + req.params.id
        });
    });
};

//send email for forgot password
exports.sendOtp = async (req, res) => {
  User.findOne({
      where: {
      email: req.body.email
      }
  }).then( async user => {
    if (!user) {
      console.log("user not found");
      return res.status(201).send({
        message: "User Not Found",
      });
    }
    else{
      var otp = Math.floor(100000 + Math.random() * 900000);
      whatsapp.sendMsg(user.whatsappNo,"Otp to reset your password on shopquick : "+otp);
      if(await sendmail.ForgotPasswordMail( user.email,otp)){
        console.log("email sent with otp : "+otp);
        return res.status(201).send({
          message: "OTP sent on this mail id.",
          flag : true,
          email : user.email,
          otp : otp
        });
      }
      else{
        return res.status(201).send({
          message: "try later, unable to send mail."
        });
      } 
    }
  })
  .catch(err => {
    if (err.kind === "ObjectId") {
        return res.status(404).send({
        message: "Server error"
        });
      }
    return res.status(500).send({
    message: "Error retrieving User with id " + req.params.id
    });
  });
};

//update Password
exports.updatePassword = (req, res) => {
  User.update({
    password : req.body.password},{
      where : {
        email: req.body.email
      }
  }).then(async user => {
    sendmail.PasswordUpdateMail(req.body.email);
    res.status(201).send({
      message: "Password updated successfully."
    }); 
  }).catch(err => {
    res.status(201).send({
      message: "Error updating Password with " + req.body.email
    });
  });
};

