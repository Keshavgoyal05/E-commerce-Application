const express = require("express");

const app = express();
const cors = require('cors');
//const authjwt = require('./app/helpers/authjwt');

app.use(express.json());
app.use(cors());
app.options('*', cors());
//app.use(authjwt());

const db = require("./app/models");
//db.sequelize.sync();


require("./app/routes/user.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/clothes.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/delivery.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/products.routes")(app);




app.listen(8000, () => {
    console.log("Server is running on port 8000, http://localhost:8000");
});