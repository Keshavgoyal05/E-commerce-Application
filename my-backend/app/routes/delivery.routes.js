module.exports = app => {
    const delivery = require("../controllers/delivery.controller.js");
  
    var router = require("express").Router();

    router.post("/insertDeliveryAddress", delivery.insertDelivery);

    router.put("/updateDeliveryAddress", delivery.updateDelivery);

    router.get("/getDeliveryData/:userid", delivery.getDeliveryData);

    router.get("/getDeliveryDataById/:userid/:deliveryid", delivery.getDeliveryDataById);
    
    router.delete("/deleteDeliveryAddress/:userid/:deliveryid", delivery.deleteDeliveryAddress);

    app.use("/delivery", router);
};