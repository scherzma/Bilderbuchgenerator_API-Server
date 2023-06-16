import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import BookRoutes from "./routes/BookRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [];

// routes
routes.push(new AuthRoutes(app));
routes.push(new BookRoutes(app));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
