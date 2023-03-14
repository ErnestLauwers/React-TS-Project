import { Menu as MenuPrisma, Recipe as RecipePrisma } from '@prisma/client';
import { Menu } from '../model/menu';
import { mapToRecipes } from './recipe.mapper';

const mapToMenu = ({
    id, 
    name, 
    comment,
    recipes,
}: MenuPrisma & { recipes?: RecipePrisma[]}): Menu => 
    new Menu({id, name, comment, recipes: recipes ? mapToRecipes(recipes) : []});