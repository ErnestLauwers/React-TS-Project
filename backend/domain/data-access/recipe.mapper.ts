import { Recipe as RecipePrisma, Ingredient as IngredientPrisma, Menu as MenuPrisma } from "@prisma/client";
import { Recipe } from "../model/recipe";
import { mapToIngredients } from "./ingredient.mapper";

const mapToRecipe = ({
    id, 
    name,
    preparation,
    preparationTime,
    difficultyLevel,
    genre,
    ingredients,
}: RecipePrisma & { ingredients?: IngredientPrisma[]}): Recipe =>
    new Recipe({ id, name, preparation, preparationTime, difficultyLevel, genre, ingredients: mapToIngredients(ingredients) });

const mapToRecipes = (recipesPrisma: (RecipePrisma & { ingredients: IngredientPrisma[]})[]): Recipe[] =>
    recipesPrisma.map(mapToRecipe);

export {
    mapToRecipe,
    mapToRecipes
}