import { getAppWithRoutes } from "./app";
import { PORT } from "./config";

getAppWithRoutes().listen(PORT, () => {
  console.log(`Diary server listening on port ${PORT}`);
});
