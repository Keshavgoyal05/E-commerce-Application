const jwt = require('jsonwebtoken');

const secretkey = 'SECRETKEY';
const jwtObj = {'jwt':jwt,'secretkey':secretkey};

authenticateJWT = (req, res, next)=> { 
    const authHeader = req.headers.authorization; 
    console.log("req data"+ req); console.log("AuthHeader "+authHeader); 
    //Header, payload, signature 
    if (authHeader) { const token = authHeader.split (' ')[1]; 
      console.log("Given token is : "+token); 
      jwt.verify(token, secretkey, (err, user) => { 
        if (err) {
          console.log(err.name);
          return res.status (403).send(
            "Invalid token, can not access data..."); 
        }
        req.user = user; 
        console.log("Given data from jwt verify is "+JSON.stringify(user)); 
        next(); 
      }) 
    } 
    else{
        console.log("JWT authentication failed");
        res.status(401).send("JWT authentication failed");
    }       
}

module.exports = { jwtObj , authenticateJWT };