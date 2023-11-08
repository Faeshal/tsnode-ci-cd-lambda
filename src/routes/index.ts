import log4js from "log4js";
import express from "express"
import v1Route from "../routes/v1"
const router = express.Router()
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
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
    const secretName = "prod/dbserver";
    const client = new SecretsManagerClient({
      region: "ap-southeast-1",
    });
    log.warn("CLIENT NIH:🪀", client)

    var response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT",
      })
    );

    log.info("RESPONSE: ⭐", response);
    const secret = response.SecretString;

    res
      .status(200)
      .json({ success: true, message: secret });
  } catch (error) {
    log.error("error", error);
    res
      .status(500)
      .json({ success: true, message: "error" });
  }
});



router.get("/ping", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "pong" });
});

export default router;