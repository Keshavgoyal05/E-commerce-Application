module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type : Sequelize.STRING,
            allowNull: false,
            validate: {
                max: 9999999999,                  
                min: 0000000001,
            }
        },
        whatsappNo: {
            type : Sequelize.STRING,
            allowNull: true,
            validate: {
                max: 9999999999,                  
                min: 0000000001,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }  
    },{
        timestamps : false,
        freezeTableName : true
    });
  
    return User;
  };