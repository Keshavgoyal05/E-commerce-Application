module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    var router = require("express").Router();

    router.post("/addOrder", order.addOrder);

    router.post("/addProductOrder", order.addProductOrder);

    router.get("/getAllOrders/:userid", order.getAllOrders);

    app.use("/order", router);
};