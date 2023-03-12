import { Recipe } from '../model/recipe';

let id = 1;

const recipes: Recipe[] = [
    new Recipe( id++, 'Lasagne', 'xxx', 30, 6, null, 'avond eten', null),
    new Recipe( id++, 'frietjes', 'xxx', 20, 2, null, 'snack' ,null),
];

const getAllRecipes = (): Recipe[] => {
    return recipes;
};

export default {
    getAllRecipes
};