import userRouter from "./controller/user.routes";
import recipeRouter from "./controller/recipe.routes";
import menuRouter from "./controller/menu.routes";
import ingredientRouter from "./controller/ingredient.routes";

const express = require("express");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cookbook Companion API",
      description: "Cookbook Companion API Information",
      contact: {
        name: "Igor Stefanovic & Ernest Lauwers"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["./controller/*.routes.ts"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use('/menus', menuRouter);
app.use('/ingredients', ingredientRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});