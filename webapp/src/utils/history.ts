import { createBrowserHistory, History } from "history";

import { appConfig } from "../config";

const history: History = createBrowserHistory({
  basename: appConfig.publicPath,
});

export default history;
