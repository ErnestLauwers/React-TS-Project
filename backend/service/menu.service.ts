import { Menu } from '../domain/model/menu';
import menuDb from '../domain/data-access/menu.db';

const getAllMenus = (): Menu[] => menuDb.getAllMenus();

const getMenuById = (id: number): Menu => menuDb.getMenuById(id)

const deleteMenu = (id: number): void => menuDb.deleteMenu(id);

export default {
    getAllMenus,
    deleteMenu, 
    getMenuById
};