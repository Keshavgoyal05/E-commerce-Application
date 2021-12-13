module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
  
    router.get("/getAllUsers", admin.getAll);

    router.post("/insertUser", admin.insert);

    router.put("/updateUser", admin.update);

    router.delete("/deleteUser/:id", admin.delete);
  
    app.use("/admin", router);
  };