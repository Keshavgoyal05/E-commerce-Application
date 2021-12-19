module.exports = app => {
    const clothes = require("../controllers/clothes.controller.js");
  
    var router = require("express").Router();
  
    router.get("/getAllClothes", clothes.getAllClothes);
    
    app.use("/clothes", router);
};

