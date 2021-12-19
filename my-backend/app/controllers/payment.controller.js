const stripe = require("../configs/stripe.config").stripe;
const db = require("../models");
const Delivery = db.delivery;
exports.makePayment = (req, res, next) => {
    console.log("In ../paymentController.js/makePayment");
    stripe.charges.create({ 
        amount : req.body.amount*100, 
        currency : 'INR',
        description : 'One-time setup fee', 
        source : req.body.token.id 
    }, 
    (err)=>{
        if(err) {
            return res.json({
                success : false, 
                msg : ""+err
            })
        }
        res.json({
            success : true, 
            msg : "Payments Successfull"
        }) 
    })
};

