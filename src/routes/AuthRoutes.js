import AuthController from '../controllers/AuthController';
import RoutesConfig from './RoutesConfig';

export default class AuthRoutes extends RoutesConfig {
  constructor(app) {
    super(app, 'auth');
    this.initRoutes();
  }

  initRoutes() {
    this.app.post(
      `${this.getEndpoint()}/login`,
      AuthController.login,
    );

    this.app.post(
      `${this.getEndpoint()}/register`,
      AuthController.register,
    );
  }
}

export const a = '';
