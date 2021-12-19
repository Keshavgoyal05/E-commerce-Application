module.exports = app => {
    const products = require("../controllers/product.controller");
  
    var router = require("express").Router();
  
    router.post("/addMockProducts", products.addMockProductsToDB);

    router.get("/getAllProducts", products.getAllProducts);

    router.post("/insertProduct", products.insertProducts);

    router.put("/updateProduct", products.updateProduct);

    router.delete("/deleteProduct/:productid", products.deleteProducts);

    
    app.use("/products", router);
};

// Link to add all products to product DB : http://localhost:8000/products/addMockProducts