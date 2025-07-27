import routerRiddles from "./riddlesRoutes.js";
import routerPlayers from "./playerRoutes.js";

const routsinit = (app) => {
  app.use("/riddles", routerRiddles);
  app.use("/players", routerPlayers);};

export default routsinit;