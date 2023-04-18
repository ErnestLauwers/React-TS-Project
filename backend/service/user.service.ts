import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';
import { UserInput } from '../types/types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => userDb.getUserById(id)

const deleteUser = async (id: number): Promise<User> => userDb.deleteUser(id);

const addUser = async ({ firstName, lastName, username, email, password }: UserInput): Promise<User> => {
    return await userDb.addUser({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
    })
}

export default {
    getAllUsers,
    deleteUser, 
    getUserById,
    addUser
};