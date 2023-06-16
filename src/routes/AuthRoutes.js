import AuthController from "../controllers/AuthController.js";
import RoutesConfig from "./RoutesConfig.js";

export default class AuthRoutes extends RoutesConfig {
  constructor(app) {
    super(app, "auth");
    this.initRoutes();
  }

  initRoutes() {
    this.app.post(`${this.getEndpoint()}/login`, AuthController.login);

    this.app.post(`${this.getEndpoint()}/register`, AuthController.register);
  }
}

