import { Ingredient } from '../model/ingredient';

let id = 1;

const ingredients: Ingredient[] = [
    new Ingredient( id++, 'suiker', 56, null),
    new Ingredient( id++, 'tomaat', 23, null),
];

const getAllIngredients = (): Ingredient[] => {
    return ingredients;
};

const getIngredientById = (id: number): Ingredient => {
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id == id) {
            return ingredients[i];
        }
      }
}

const deleteIngredient = (id: number): void => {
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id == id) {
            ingredients.splice(i, 1);
            break;
        }
      }
    }          

export default {
    getAllIngredients, 
    deleteIngredient, 
    getIngredientById
};