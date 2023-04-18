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
}: RecipePrisma): Recipe =>
    new Recipe({ id, name, preparation, preparationTime, difficultyLevel, genre });

const mapToRecipes = (recipesPrisma: (RecipePrisma)[]): Recipe[] =>
    recipesPrisma.map(mapToRecipe);

export {
    mapToRecipe,
    mapToRecipes
}