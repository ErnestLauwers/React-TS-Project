/**
 * @swagger 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         recipes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Recipe'
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'
 *     UserInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: int64
 *           required: false
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user 
 *         username:
 *           type: string
 *           description: The username of the user 
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *     LoginInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user 
 *         password:
 *           type: string
 *           description: The password of the user
 */

import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { EditUserInput, UserInput, LoginInput } from '../types/types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      description: This API is used to get all users
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Returns users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allUsers = await userService.getAllUsers();
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a user by ID
 *      description: This API is used to get a user by ID
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Returns a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *      parameters:
 *          - name: id
 *            in: path
 *            description: User ID
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 */
userRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allUsers = await userService.getUserById(id);
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /users/delete/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the user to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          '200':
 *              description: The user was successfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const deletedUser  = await userService.deleteUser(id);
        response.status(200).json(deletedUser);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 * 
 *     responses:
 *       '200':
 *         description: Returns the new User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/add', async (request: Request, response: Response) => {
    const userInput = <UserInput>request.body;
    try {
        const user = await userService.addUser(userInput);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
});

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update an existing user
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 * 
 *     responses:
 *       '200':
 *         description: Updates the User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.put('/update', async (request: Request, response: Response) => {
    const editUserInput = <EditUserInput>request.body;
    try {
        const updatedUser = await userService.editUser(editUserInput);
        response.status(200).json(updatedUser);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
})

/**
 * @swagger
 * /users/search/{username}:
 *  get:
 *      summary: Get a user by username
 *      description: This API is used to get a user by username
 *      responses:
 *          200:
 *              description: Returns a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *      parameters:
 *          - name: username
 *            in: path
 *            description: User username
 *            required: true
 *            schema:
 *              type: string
 */
userRouter.get('/search/:username', async (request: Request, response: Response) => {
    try {
        const username = request.params.username;
        const user = await userService.getUserByUsername(username);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: Get user if username & password combination is correct
 *      description: This API is used to validate a user
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *      responses:
 *          200:
 *              description: Returns user
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
userRouter.post('/login', async (request: Request, response: Response) => {
    const loginInput = <LoginInput>request.body;
    try {
        const token = await userService.authenticate(loginInput);
        console.log("Token: " + token);
        response.status(200).json({ message: 'Authentication successful', token});
    } catch (error) {
        response.status(401).json({ status: 'unauthorized', errorMessage: error.message })
    }
})

export default userRouter;