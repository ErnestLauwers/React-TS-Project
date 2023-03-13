const mapToIngredient = ({
    id,
    name, 
    amountUsed, 
    recipes,
}: IngredientPrisma & {
    recipes?: (RecipePrisma & { users: UserPrisma[] })[],
}): Ingredient => new Ingredient({
    id,
    name, 
    amountUsed,
    recipes: recipes ? mapToRecipes(recipes) : []
})