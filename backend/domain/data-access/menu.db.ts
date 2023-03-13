import { Menu } from '../model/menu';

let id = 1;

const menus: Menu[] = [
    new Menu( id++, 'menu1', 'xxx', null),
    new Menu( id++, 'menu2', 'xxx', null),
];

const getAllMenus = (): Menu[] => {
    return menus;
};

const getMenuById = (id: number): Menu => {
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].id == id) {
            return menus[i];
        }
      }
}

const deleteMenu = (id: number): void => {
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].id == id) {
            menus.splice(i, 1);
            break;
        }
      }
    }          

export default {
    getAllMenus, 
    deleteMenu, 
    getMenuById
};