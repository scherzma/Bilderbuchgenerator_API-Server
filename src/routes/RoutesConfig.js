import { getApiConfig } from '../configuration';

export default class RoutesConfig {
  apiRoot = getApiConfig().root;

  apiName = '';

  registeredRoutes = [];

  app = null;

  constructor(app, apiName) {
    this.app = app;
    this.apiName = apiName;
    this.app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept',
      );
      next();
    });
  }

  registerRoute(apiMethod, route) {
    this.registeredRoutes.push({ apiMethod, route });
  }

  printRegisteredRoutes() {
    // eslint-disable-next-line no-restricted-syntax
    for (const route of this.registeredRoutes) {
      console.log(`[ROUTE] Method: ${route.apiMethod}, Api: ${route.route}`);
    }
  }

  getEndpoint() {
    return `${this.apiRoot + this.apiName}`;
  }
}
