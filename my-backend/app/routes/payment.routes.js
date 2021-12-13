module.exports = app => {
    const payments = require("../controllers/payment.controller.js");
  
    var router = require("express").Router();
  
    router.post("/stripePayment", payments.makePayment);

    
    
    app.use("/payment", router);
};