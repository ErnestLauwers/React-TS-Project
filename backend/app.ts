import userRouter from "./controller/user.routes";
import recipeRouter from "./controller/recipe.routes";
import postRouter from "./controller/post.routes";
import ingredientRouter from "./controller/ingredient.routes";
import { NextFunction, response } from "express";
import { expressjwt } from "express-jwt";

const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json())

const port = process.env.PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", 
        },
      },
    },
  },
  security: [{
    bearerAuth: [],
  },],
  apis: ["./controller/*.routes.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOpts);
const jwtSecret = process.env.JWT_SECRET;

app.use(
  expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
  path: [/^\/api-docs(\/.*)?$/, '/users/login', '/users/add', '/status', /^\/search\/.*/],
  })
)

/*
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({ status : 'unauthorized', message: error.message});
  } else if (error.name === 'WhattError') {
    response.status(400).json({ status: 'error', message: error.message});
  } else {
    next();
  }
});*/

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/status', (req, res) => {
  res.json({ message: "Back-end is running..."});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});