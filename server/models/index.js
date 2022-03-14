/* Will be complete representation of mysql db - treat as if database to which queries are made from db-files.  */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file.indexOf('ModelBase') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const Model = require(path.join(__dirname, file));
    const model = new Model();

    db[model.getName()] = model.define(sequelize);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.itemImage.belongsTo(db.item, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE'
});
db.item.hasMany(db.itemImage);

db.item.belongsTo(db.user, {
  foreignKey: { allowNull: false, onDelete: 'CASCADE' }
});
db.user.hasMany(db.item);

db.bid.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE'
});
db.bid.belongsTo(db.item, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE'
});

db.item.hasMany(db.bid);
db.user.hasMany(db.bid);

db.item.hasMany(db.auction);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
