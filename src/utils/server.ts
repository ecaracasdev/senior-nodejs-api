import express from "express";
import deserializerUser from "../middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConfigManager from "../configurations/config.manager";
import Config from "../configurations/config.types";

function createServer() {
  const app = express();

  const loadConfig = new Promise((resolve, reject) => {
    return resolve(ConfigManager.loadConfig());
  });

  loadConfig.then(() => console.log('config loaded')).catch(e=>console.log(e.message));

  const config:Config = ConfigManager.getConfiguration()
  console.log('config:', {
    port: config.port,
    origin: config.origin,
    dbUri: config.dbUri,
    cookiesDomain: config.cookiesDomain
  })

  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());
  app.use(deserializerUser);
  routes(app);

  return app;
}

export default createServer;
