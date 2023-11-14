"use strict";
import "dotenv/config";
import PrettyError from "pretty-error"
import express, { Request, Response, NextFunction } from "express";
import ServerlessHttp from "serverless-http"
import { AppDataSource } from "./data-source";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import log4js from "log4js";
import paginate from "express-paginate";
import dayjs from "dayjs";
import { errorHandler } from "./middleware/errorHandler";
import route from "./routes/index"
const PORT: any = process.env.PORT || 3000;
const pe = new PrettyError();
const app: any = express();
const log = log4js.getLogger("entrypoint");
log.level = "info";

// * Security, Compression & Parser
pe.start();
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Http Logger
morgan.token("time", (req: Request) => {
  let user = "anonym";
  if (req.user) {
    user = req.user.username || "anonym";
  }
  const time = dayjs().format("h:mm:ss A") + " - " + user;
  return time;
});
app.use(morgan("morgan: [:time] :method :url - :status"));

// * Paginate
app.use(paginate.middleware(10, 30));

// * Route
app.use(route);

// * Custom Error Handler
app.use(errorHandler);

// * db sync
(async () => {
  try {
    const db = await AppDataSource()
    await db.initialize()
    log.info("MariaDB Connected ✅");
  } catch (error) {
    log.error("MariaDB Failure 🔥", error);
    return
  }
})();


// * Server Listen
app.listen(PORT, (err: any) => {
  if (err) {
    log.error(`Error : ${err}`);
    process.exit(1);
  }
  log.info(`✅ Server is Running On Port: ${PORT}`);
});

// export default app;
module.exports.handler = ServerlessHttp(app);