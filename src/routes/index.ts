import express from "express"
import v1Route from "../routes/v1"
const router = express.Router()


router.use("/api/v1", v1Route);

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to the Express API" });
});

router.get("/api/v1/info", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "build with express typescript", timestamp: Date.now() });
});

export default router;