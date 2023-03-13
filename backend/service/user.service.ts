import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserById = (id: number): User => userDb.getUserById(id)

const deleteUser = (id: number): void => userDb.deleteUser(id);

export default {
    getAllUsers,
    deleteUser, 
    getUserById
};