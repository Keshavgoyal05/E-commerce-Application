module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        user_id: {
            type:Sequelize.INTEGER,
            references:{
                model:'user',
                key:"user_id"
            }
        },
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchase_date: {
            allowNull: false,
            type: Sequelize.DATE
        },
        delivery_address: {
            type : Sequelize.STRING,
            allowNull: false
        },
        payment_status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type : Sequelize.STRING,
            allowNull: false,
            validate: {
                max: 9999999999,                  
                min: 0000000001,
            }
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
  
    return Order;
  };