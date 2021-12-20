const {authenticateJWT} = require("../configs/jwt.config");
module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();

    router.post("/getCartsBasedOn_UserID_ProductID", cart.getCartsBasedOn_UserID_ProductID);
  
    router.get("/getCarts/:id",authenticateJWT, cart.getCartsBasedOn_UserID);

    router.post("/insertCartItem",authenticateJWT,cart.insertCartItem);

    router.delete("/deleteCartItem/:id",authenticateJWT, cart.deleteCartItem);

    router.delete("/emptyCart/:userid",authenticateJWT, cart.emptyCart);

    router.put("/updateCartItem",authenticateJWT,cart.updateCartItem);
    
    app.use("/cart", router);
};