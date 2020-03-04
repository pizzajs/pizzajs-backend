module.exports = {
    dialect: 'postgres',
    host: 'db',
    username: 'username',
    password: 'pizza',
    database: 'pizzajs',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};