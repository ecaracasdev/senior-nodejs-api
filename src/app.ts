import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import createServer from "./utils/server";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running att http://localhost:${port}`);
  await connect();
});
