module.exports = (sequelize, Sequelize) => {
    const productOrder = sequelize.define("productOrder", {
        productOrder_id: {
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
        order_id: {
            type: Sequelize.INTEGER,
            references:{
                model:'order',
                key:"order_id"
            }
        },
        order_status:{
            type: Sequelize.STRING,
            allowNull: false
        },
        product_id: {
            type: Sequelize.INTEGER,
            references:{
                model:'product',
                key:"product_id"
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
  
    return productOrder;
  };