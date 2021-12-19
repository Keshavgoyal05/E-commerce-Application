module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type : Sequelize.STRING,
            allowNull: false
        },
        subcategory: {
            type : Sequelize.STRING,
            allowNull: false
        },
        name: {
            type : Sequelize.STRING,
            allowNull: false
        },
        rating: {
            type : Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        image: {
            type : Sequelize.STRING,
            allowNull: false
        },
        description: {
            type : Sequelize.STRING,
            allowNull: true
        },
        available: {
            type : Sequelize.STRING,
            allowNull: true,
            default : "yes"
        },
        condition: {
            type : Sequelize.STRING,
            allowNull: true
        },
        color: {
            type : Sequelize.STRING,
            allowNull: true
        },
        price: {
            type : Sequelize.INTEGER,
            allowNull: false
        },
        discount: {
            type : Sequelize.INTEGER,
            allowNull: true
        } 
    },{
        timestamps : false,
        freezeTableName : true
    });
  
    return Product;
  };