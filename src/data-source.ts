import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Income } from "./entity/Income"
import { Category } from "./entity/Category"
import awsParamStrore from "./utils/paramStore"
import log4js from "log4js";
const log = log4js.getLogger("utils:dataSource");
log.level = "info";

// * default style from type ORM
// export const AppDataSource = new DataSource({
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: 3306,
//     username: "admin",
//     password: "Password1!",
//     database: "income",
//     synchronize: true,
//     logging: false,
//     entities: [User, Income, Category],
//     migrations: [],
//     subscribers: [],
// })


// return new DataSource({
//     type: "mysql",
//     host: "office-db.cbmyrn7cw8vh.ap-southeast-1.rds.amazonaws.com",
//     port: 3306,
//     username: "admin",
//     password: "Password1!",
//     database: "income",
//     synchronize: true,
//     logging: true,
//     entities: [User, Income, Category],
//     migrations: [],
//     subscribers: [],
// })


// return new DataSource({
//     type: "mysql",
//     host: "office-db.cbmyrn7cw8vh.ap-southeast-1.rds.amazonaws.com",
//     port: 3306,
//     username: "admin",
//     password: "Password1!",
//     database: "income",
//     synchronize: true,
//     logging: true,
//     entities: [User, Income, Category],
//     migrations: [],
//     subscribers: [],
// })


export const AppDataSource = async () => {
    const data = await awsParamStrore("/rest-server/dev/rds")
    log.warn("DATA ⭐⭐⭐⭕⭐⭐⭐", data)
    const rds = data.split(",");
    const dbUsername = rds[0]
    const dbPassword = rds[1]
    const dbName = rds[2]
    const dbHost = rds[3]

    log.warn("dbUsername ⭐:", dbUsername)
    log.warn("dbPassword ⭐:", dbPassword)
    log.warn("dbName ⭐:", dbName)
    log.warn("dbHost ⭐:", dbHost)

    return new DataSource({
        type: "mysql",
        host: dbHost,
        port: 3306,
        username: dbUsername,
        password: dbPassword,
        database: dbName,
        synchronize: true,
        logging: true,
        entities: [User, Income, Category],
        migrations: [],
        subscribers: [],
    })


}
