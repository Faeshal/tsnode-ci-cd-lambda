import express from "express"
import v1Route from "../routes/v1"
const router = express.Router()
import awsParamStrore from "../utils/paramStore";


router.use("/api/v1", v1Route);

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to the Express API", host: process.env.DB_HOST });
});


router.get("/api/v1/info", async (req, res, next) => {
  const data = await awsParamStrore("/rest-server/dev/rds")
  console.warn("DATA ⭐⭐⭐⭕⭐⭐⭐", data)
  res
    .status(200)
    .json({ success: true, data: { ip: req.ip, path: req.path, timestamp: new Date() } });
});


export default router;