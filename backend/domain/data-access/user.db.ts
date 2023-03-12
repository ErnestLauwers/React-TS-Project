import { User } from '../model/user';

let id = 1;

const users: User[] = [
    new User( id++, 'Ernest', 'Lauwers', 'Ernie', 'ernest.lauwers@student.ucll.be', 'test123', null, null, null),
    new User( id++, 'Igor', 'Stefanovic', 'Igor69', 'igor.stefanovic@student.ucll.be', '123test', null, null, null),
];

const getAllUsers = (): User[] => {
    return users;
};

export default {
    getAllUsers
};