module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'Admin@keshav',
    database: 'training',
    dialect: 'postgres',
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    }
};
