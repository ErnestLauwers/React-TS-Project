import express, { Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      description: This API is used to get all users
 *      responses:
 *          200:
 *              description: Returns users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/User'
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
 *      responses:
 *          200:
 *              description: Returns a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/User'
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

userRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    console.log('0')
    try {
        console.log('1')
        const id = Number(request.params.id);
        await userService.deleteUser(id);
        console.log('2')
        response.redirect('/users');
        console.log('3')
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default userRouter;