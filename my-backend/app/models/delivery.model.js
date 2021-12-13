module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define("Delivery", {
        delivery_id: {
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
        name: {
            type : Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type : Sequelize.STRING,
            allowNull: false,
            validate: {
                max: 9999999999,                  
                min: 0000000001,
            }
        },
        address: {
            type : Sequelize.STRING,
            allowNull: false
        },
        city: {
            type : Sequelize.STRING,
            allowNull: false
        },
        state: {
            type : Sequelize.STRING,
            allowNull: false
        },
        zip: {
            type : Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
  
    return Delivery;
  };