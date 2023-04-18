import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => userDb.getUserById(id)

const deleteUser = async (id: number): Promise<User> => userDb.deleteUser(id);

export default {
    getAllUsers,
    deleteUser, 
    getUserById
};