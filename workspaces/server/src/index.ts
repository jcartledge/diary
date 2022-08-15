import { getConfiguredApp } from "./app";

getConfiguredApp().listen(4000, () => {
  console.log(`Diary server listening on port ${4000}`);
});
