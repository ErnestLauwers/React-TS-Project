import express, { Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allUsers = await userService.getAllUsers();
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default userRouter;