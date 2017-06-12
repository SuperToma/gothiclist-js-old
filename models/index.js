import config from '../config.json'
import Sequelize from 'sequelize'

var sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    port: config.mysql.port,
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('✔ Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var db = {};

//db['Artists'] = sequelize.import('./Artists')
db['Masters'] = sequelize.import('./Masters')
//db['Releases'] = sequelize.import('./Releases')
//db['User'] = sequelize.import('./User')

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;