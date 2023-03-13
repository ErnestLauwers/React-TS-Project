import { User } from '../model/user';

let id = 1;

const users: User[] = [
    new User( id++, 'Ernest', 'Lauwers', 'Ernie', 'ernest.lauwers@student.ucll.be', 'test123', null, null, null, null),
    new User( id++, 'Igor', 'Stefanovic', 'Igor69', 'igor.stefanovic@student.ucll.be', '123test', null, null, null, null),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = (id: number): User => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i];
        }
      }
}

const deleteUser = (id: number): void => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users.splice(i, 1);
            break;
        }
      }
    }          

export default {
    getAllUsers, 
    deleteUser, 
    getUserById
};