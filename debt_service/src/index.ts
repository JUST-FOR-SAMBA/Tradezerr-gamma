import {app} from "./app";
import config from "./config/config"
import {logging} from "./config/logging";

const start = async () => {
    app.listen(config.server.port, () => logging.info(`Debt Server is running ${config.server.host}:${config.server.port}`));
}

start();