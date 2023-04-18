import { Ingredient as IngredientPrisma } from "@prisma/client";
import { Recipe as RecipePrisma } from "@prisma/client";
import { Ingredient } from "../model/ingredient";
import { mapToRecipes } from "./recipe.mapper";
import { Recipe } from "../model/recipe";

const mapToIngredient = ({ 
    id, 
    name, 
    amountUsed, 
}: IngredientPrisma): Ingredient => 
    new Ingredient({ id, name, amountUsed });

const mapToIngredients = (ingredientsPrisma: IngredientPrisma[]): Ingredient[] =>
    ingredientsPrisma?.map(mapToIngredient);

export {
    mapToIngredient,
    mapToIngredients
}