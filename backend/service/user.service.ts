import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

export default {
    getAllUsers
};