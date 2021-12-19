const db = require("../models");
const sendmail = require("./mail.controller");
const whatsapp = require("./whatsapp.controller");
const User = db.users;
const Op = db.Sequelize.Op;

const bcrypt = require ('bcryptjs'); 
const uuid = require ('uuid');
const jwt = require('jsonwebtoken');

//Register User
exports.register1 = (req, res) => {
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
exports.login1 = (req, res) => {
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
          return res.status(401).send({
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



//register using jwt
exports.register = (req, res) => {
  const user = req.body;
  bcrypt.hash(user.password, 10, (err, hash) =>{ 
    if (err) {
      res.status (500).send ({
        message : err
      });
    } 
    else { 
      //Insert this data in the db.
      user.password=hash;
      User.create(user)
      .then ( function (data) {
        res.status(201).send({
          message: "User Registered Successfully."
        });
      }).catch(err => {
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
    }
  })
};


//login using jwt
exports.login = (req, res) => { 
  var strusername = req.body.email; 
  var strpassword = req.body.password; 
  User.findAll({where : {email : strusername},raw : true})
  .then ((result) => { 
    console.log("Received data "+JSON.stringify(result)); 
    console.log("Count of the records are : " + result.length); 
    if (result.length < 1) { 
      console.log ("User not found");
      return res.status(400).send({
        message: "user not found"
      }); 
    } 
    console.log("Password in db is "+result[0].password); 
    bcrypt.compare(strpassword, result[0].password)
    .then ( function (bResult) { 
      console.log("Password is right : "+bResult); 
      if (bResult) { 
        const token = jwt.sign(
          {
            username : result[0].username, 
            id : result[0].id
          }, 
          'SECRETKEY', 
          { 
            expiresIn : '30s' 
          } 
        ); 
        res.status(200).send({
          message: "logged in successfully",
          token : token,
          username: result[0].firstName,
          userid: result[0].user_id,
          login : true
        }); 
      } 
      else 
      { 
        res.status(400).send({
          message: "wrong password"
        }); 
      } 
    })
    .catch (err => { 
      console.log("The error is "+err);
      res.status(400).send({
        message: "unable to create token"
      }); 
    }) 
  })
  .catch ( (err) => { 
    console.error(err);
    res.status(500).send({
      message: "some error while logging in : "+err
    }); 
  })
};


const authenticateJWT = (req, res, next)=> { 
  const authHeader = req.headers. authorization; 
  console.log("req data"+ req); console.log("AuthHeader "+authHeader); 
  //Header, payload, signature 
  if (authHeader) { const token = authHeader.split (' ')[1]; 
    console.log("Given token is : "+token); 
    jwt.verify(token, 'SECRETKEY', (err, user) => { 
      if (err) {
        return res.status (403).send("Invalid token, can not access data..."); 
      }
      req.user = user; 
      console.log("Given data from jwt verify is "+JSON.stringify(user)); 
      next(); 
    }) 
  } 
  else 
    res.sendStatus (401); 
}
