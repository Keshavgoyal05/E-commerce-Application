module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();
  
    router.get("/getCarts/:id", cart.getCartsBasedOn_UserID);

    router.post("/getCartsBasedOn_UserID_ProductID", cart.getCartsBasedOn_UserID_ProductID);

    router.post("/insertCartItem",cart.insertCartItem);

    router.delete("/deleteCartItem/:id", cart.deleteCartItem);

    router.delete("/emptyCart/:userid", cart.emptyCart);

    router.put("/updateCartItem",cart.updateCartItem);
    
    app.use("/cart", router);
};