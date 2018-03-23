const Sequelize = require('sequelize');
const sequelize = new Sequelize('practice-pen', 'sequelize', 'sosecret', {
  host: 'localhost',
  dialect:'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
});

// define models in file because look how easy life is
const Product = sequelize.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER
});


module.exports = {
  sequelize,
  Product
}
