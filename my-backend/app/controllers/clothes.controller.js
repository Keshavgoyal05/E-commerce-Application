const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op; 


exports.getAllClothes = (req, res) => { 
    Product.findAll({where : {category : 'clothes'},raw : true}).then ( data => { 
        console.log(data); 
        res.status (200).send(data) 
    }).catch ( err => { 
        console.error("There is an error getting data from db : "+err); 
        res.status (400).send (err); 
    }) 
};
