import { getAppWithRoutes } from "./app";
import { port } from "./config";

getAppWithRoutes().listen(port, () => {
  console.log(`Diary server listening on port ${port}`);
});
