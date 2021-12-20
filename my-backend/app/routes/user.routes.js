module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/register", users.register);

    router.post("/login", users.login);

    router.post("/sendOtp", users.sendOtp);

    router.put("/updatePassword", users.updatePassword);

    router.get("/getAllUsers", users.getAllUsers);

    router.put("/updateUser", users.updateUser);

    router.delete("/deleteUser/:id", users.deleteUser);
  
    app.use("/users", router);
  };