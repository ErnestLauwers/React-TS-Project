import { Recipe } from '../model/recipe';

let id = 1;

const recipes: Recipe[] = [
    new Recipe( id++, 'Lasagne', 'xxx', 30, 6, null, 'avond eten', null),
    new Recipe( id++, 'frietjes', 'xxx', 20, 2, null, 'snack' ,null),
];

const getAllRecipes = (): Recipe[] => {
    return recipes;
};

const getRecipeById = (id: number): Recipe => {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id == id) {
            return recipes[i];
        }
      }
}

const deleteRecipe = (id: number): void => {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id == id) {
            recipes.splice(i, 1);
            break;
        }
      }
    }          

export default {
    getAllRecipes,
    deleteRecipe, 
    getRecipeById
};