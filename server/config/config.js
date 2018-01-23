module.exports = {
    development: {
        url: 'localhost',
        database: 'home_gestion',
        dialect: 'mysql',
        username: 'root',
        password: '',
        port: 3006
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'mysql'
    },
    staging: {
        url: process.env.DATABASE_URL,
        dialect: 'mysql'
    },
    test: {
        url: process.env.DATABASE_URL || '',
            dialect: 'mysql'
    }
};