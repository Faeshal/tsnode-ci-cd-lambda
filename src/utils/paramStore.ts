import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import Keyv from "keyv";
import log4js from "log4js";
const keyv = new Keyv();
const log = log4js.getLogger("utils:ssm");
log.level = "debug";

const awsParamStrore = async (pathName: string) => {
    try {
        log.info("aws param utils:", pathName)




        // * check cache
        const cache = await keyv.get(pathName);
        log.debug("CACHE", cache)
        if (cache == undefined) {
            log.warn("getting from aws call")
            // call aws secret
            const client = new SSMClient({ region: "ap-southeast-1" });
            const input = {
                Name: pathName,
                WithDecryption: true,
            };
            const command = new GetParameterCommand(input)
            const data = await client.send(command);
            const value = data.Parameter?.Value || ""
            log.warn("value from aws:", value)

            // set cache
            await keyv.set(pathName, value);



            // set env
            if (value == undefined) return
            const rds = value.split(",");
            process.env.DB_HOST = rds[0]
            process.env.DB_PASSWORD = rds[1]
            process.env.DB_NAME = rds[2]
            process.env.DB_HOST = rds[3]

            return value
        } else {
            // set env
            const rds = cache.split(",");
            process.env.DB_HOST = rds[0]
            process.env.DB_PASSWORD = rds[1]
            process.env.DB_NAME = rds[2]
            process.env.DB_HOST = rds[3]

            return cache
        }
    } catch (err: any) {
        log.error(err);
        return null
    }
}

export default awsParamStrore
