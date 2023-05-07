import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import ConfigManager from "./configurations/config.manager";
import Config from "./configurations/config.types";

const app = createServer();
const config: Config = ConfigManager.getConfiguration();
const port = config.port;

app.listen(port, '0.0.0.0', async () => {
  logger.info(`App is running at port:${port}`);
  await connect();
});
