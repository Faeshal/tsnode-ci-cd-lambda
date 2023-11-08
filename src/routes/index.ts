import express from "express"
import v1Route from "../routes/v1"
const router = express.Router()
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import log4js from "log4js";
const log = log4js.getLogger("x:x");
log.level = "debug";


router.use("/api/v1", v1Route);

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to the Express API" });
});


router.get("/info", async (req, res, next) => {
  try {
    const secret_name = "prod/dbserver";
    const client = new SecretsManagerClient({
      region: "ap-southeast-1",
    });
    let response;

    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );

    log.info("RESPONSE:", response);
    const secret = response.SecretString;

    res
      .status(200)
      .json({ success: true, message: JSON.stringify(secret) });
  } catch (error) {
    log.error("error", error);
    res
      .status(500)
      .json({ success: true, message: "error" });
  }
});

export default router;