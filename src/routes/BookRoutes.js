import BookController from '../controllers/BookController';
import RoutesConfig from './RoutesConfig';

export default class BookRoutes extends RoutesConfig {
  constructor(app) {
    super(app, 'book');
    this.initRoutes();
  }

  initRoutes() {
    this.app.post(
      `${this.getEndpoint()}`,
      BookController.create,
    );

    this.app.get(
      `${this.getEndpoint()}/:id`,
      BookController.read,
    );

    this.app.delete(
      `${this.getEndpoint()}/:id`,
      BookController.delete,
    );
  }
}
