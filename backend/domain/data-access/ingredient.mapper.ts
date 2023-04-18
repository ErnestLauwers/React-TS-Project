import { Ingredient as IngredientPrisma } from "@prisma/client";
import { Recipe as RecipePrisma } from "@prisma/client";
import { Ingredient } from "../model/ingredient";
import { mapToRecipes } from "./recipe.mapper";
import { Recipe } from "../model/recipe";

const mapToIngredient = ({ 
    id, 
    name, 
    amountUsed, 
    recipes, 
}: IngredientPrisma & { recipes: RecipePrisma[] }): Ingredient & { recipes: Recipe[] }  => 
    new Ingredient({ id, name, amountUsed, recipes: mapToRecipes(recipes) });

const mapToIngredients = (ingredientsPrisma: IngredientPrisma[]): Ingredient[] =>
    ingredientsPrisma.map(mapToIngredient);

export {
    mapToIngredient,
    mapToIngredients
}