import express from 'express';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes';
import BookRoutes from './routes/BookRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [];

// database

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// routes
routes.push(new AuthRoutes(app));
// routes.push(new PictureRoutes(app));
routes.push(new BookRoutes(app));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
