'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
import awsParamStrore from "../utils/paramStore";
const db: any = {};
let sequelize: any;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// awsParamStrore("").then(data => {
//   sequelize = new Sequelize("income_sequelize", "root", "root", {
//     host: "127.0.0.1",
//     dialect: "mysql"
//   });
//   return sequelize
// })


// sequelize = new Sequelize("income_sequelize", "root", "root", {
//   host: "127.0.0.1",
//   dialect: "mysql"
// });

export const dbCon = async () => {

  // * call secret
  const data = await awsParamStrore("/rest-server/dev/rds")
  if (data == undefined) return
  const rds = data.split(",");
  const dbUsername = rds[0]
  const dbPassword = rds[1]
  const dbName = rds[2]
  const dbHost = rds[3]


  // * init connection
  sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: false
  });

  fs
    .readdirSync(__dirname)
    .filter((file: string) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file: any) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db
}

// export default db









