import { Recipe as RecipePrisma, Ingredient as IngredientPrisma} from "@prisma/client";
import { Recipe } from "../model/recipe";
import { mapToIngredients } from "./ingredient.mapper";
import { Ingredient } from "../model/ingredient";

const mapToRecipe = ({
    id, 
    name,
    preparation,
    preparationTime,
    difficultyLevel,
    genre,
    userId,
    ingredients,
}: RecipePrisma & { ingredients: IngredientPrisma[] }): Recipe & { ingredients: Ingredient[] } =>
    new Recipe({ id, name, preparation, preparationTime, difficultyLevel, genre, userId, ingredients: mapToIngredients(ingredients) });

const mapToRecipes = (recipesPrisma: (RecipePrisma[])): Recipe[] =>
    recipesPrisma.map(mapToRecipe);

export {
    mapToRecipe,
    mapToRecipes
}