import userRouter from "./controller/user.routes";
import recipeRouter from "./controller/recipe.routes";
import menuRouter from "./controller/menu.routes";
import ingredientRouter from "./controller/ingredient.routes";

const express = require("express");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const port = process.env.PORT || 3000;

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

const swaggerDocs = swaggerJSDoc(swaggerOpts);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use('/menus', menuRouter);
app.use('/ingredients', ingredientRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});