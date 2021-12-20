module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        cart_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type:Sequelize.INTEGER,
            references:{
                model:'user',
                key:"user_id"
            }
        },
        product_id: {
            type : Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'product',
                key:"product_id"
            }
        },
        product_name: {
            type : Sequelize.STRING,
            allowNull: false
        },
        product_category: {
            type : Sequelize.STRING,
            allowNull: false
        },
        product_subcategory: {
            type : Sequelize.STRING,
            allowNull: true
        },
        image: {
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
        },
        quantity: {
            type : Sequelize.INTEGER,
            allowNull: false,
            default : 0
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
  
    return Cart;
  };