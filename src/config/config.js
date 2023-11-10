// require("dotenv").config();
// import awsParamStrore from "../utils/paramStore";
// import log4js from "log4js";
// const log = log4js.getLogger("config:config");
// log.level = "debug";

// // var DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST;

// // const secret = async () => {
// //   DB_USERNAME = await awsParamStrore("/rest-server/rds/dbusername");
// //   DB_PASSWORD = await awsParamStrore("/rest-server/rds/dbpassword");
// //   DB_NAME = await awsParamStrore("/rest-server/rds/dbname");
// //   DB_HOST = await awsParamStrore("/rest-server/rds/dbhost");
// //   log.info("DB USERNAME", DB_USERNAME);
// // };
// // secret();

// // log.info("DBUSERNAME", DB_USERNAME);

// async function paramStore() {
//   var DB_USERNAME = await awsParamStrore("/rest-server/rds/dbusername");
//   return DB_USERNAME;
// }

// function configDb() {
//   const a = paramStore().then((data) => {
//     log.warn(data);
//   });

//   return {
//     development: {
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       host: process.env.DB_HOST,
//       dialect: "mysql",
//       logging: false,
//     },
//     test: {
//       username: "root",
//       password: null,
//       database: "database_test",
//       host: "127.0.0.1",
//       dialect: "mysql",
//     },
//     production: {
//       username: "root",
//       password: null,
//       database: "database_production",
//       host: "127.0.0.1",
//       dialect: "mysql",
//     },
//   };
// }

// const data = configDb();

// module.exports = data;

// // const returnSequelizeConfig = async () => {
// //   // DB_USERNAME = await awsParamStrore("/rest-server/rds/dbusername");
// //   // DB_PASSWORD = await awsParamStrore("/rest-server/rds/dbpassword");
// //   // DB_NAME = await awsParamStrore("/rest-server/rds/dbname");
// //   // DB_HOST = await awsParamStrore("/rest-server/rds/dbhost");

// //   return {
// //     development: {
// //       username: process.env.DB_USERNAME,
// //       password: process.env.DB_PASSWORD,
// //       database: process.env.DB_NAME,
// //       host: process.env.DB_HOST,
// //       dialect: "mysql",
// //       logging: false,
// //     },
// //     test: {
// //       username: "root",
// //       password: null,
// //       database: "database_test",
// //       host: "127.0.0.1",
// //       dialect: "mysql",
// //     },
// //     production: {
// //       username: "root",
// //       password: null,
// //       database: "database_production",
// //       host: "127.0.0.1",
// //       dialect: "mysql",
// //     },
// //   };
// // };

// // module.exports = returnSequelizeConfig;
