module.exports = app => {
    const clothes = require("../controllers/clothes.controller.js");
  
    var router = require("express").Router();
  
    router.get("/getAllClothes", clothes.getAllClothes);

    router.post("/insertProducts", clothes.insertProducts);
    
    app.use("/clothes", router);
};