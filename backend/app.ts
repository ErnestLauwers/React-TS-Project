import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from './controller/user.routes';
import recipeRouter from "./controller/recipe.routes";
import menuRouter from "./controller/menu.routes";
import ingredientRouter from "./controller/ingredient.routes";

require('dotenv').config();

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use('/menus', menuRouter);
app.use('/ingredients', ingredientRouter)

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});