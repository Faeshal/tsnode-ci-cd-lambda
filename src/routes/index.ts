import log4js from "log4js";
import express from "express"
import v1Route from "../routes/v1"
const router = express.Router()
import awsParam from "../utils/paramStore";
const log = log4js.getLogger("routes:index");
log.level = "debug";


router.use("/api/v1", v1Route);

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to the Express API" });
});


router.get("/info", async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "info" });
  } catch (error) {
    log.error("error", error);
    res
      .status(500)
      .json({ success: true, message: "error" });
  }
});

router.get("/ping", async (req, res, next) => {
  const data = await awsParam("/rest-server/dev/dbpassword")
  log.warn("DATA", data)
  res
    .status(200)
    .json({ success: true, message: data });
});

export default router;