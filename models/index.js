const Sequelize = require('sequelize');
const sequelize = new Sequelize('unicorn-rancher', 'sequelize', 'sosecret', {
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
const Unicorn = sequelize.define('unicorn', {
  name: Sequelize.STRING,
  coloring: Sequelize.STRING,
  food: Sequelize.STRING,
  location: Sequelize.STRING
});


module.exports = {
  sequelize,
  Unicorn
}
