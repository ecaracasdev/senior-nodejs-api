import mongoose from "mongoose";
import logger from "../utils/logger";
import ConfigManager from "../configurations/config.manager";
import Config from "../configurations/config.types";

async function connect() {
  const config: Config = ConfigManager.getConfiguration();
  const dbUri = config.dbUri;
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
