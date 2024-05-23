import { initServer } from "./app/index";
async function init() {
  const app = await initServer();
  app.listen(4000, () => console.log("Server listening on PORT: 4000"));
}
init();
