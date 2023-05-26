import { useRouter } from 'next/router'
import { useState } from "react"
import styles from "../../styles/createRecipe.module.css"
import RecipeService from "@/services/RecipeService"
import { Error } from '../../types'
import { Ingredient } from "../../types"
import IngredientService from '@/services/IngredientService'
import { json } from 'stream/consumers'

const RecipeEditForm: React.FC = () => {

    const router = useRouter()
    const { recipe, back } = router.query
    const recipeParsed = JSON.parse(recipe as string)
    const userId: number = recipeParsed.userId
    const recipeId: number = recipeParsed.id

    const [name, setName] = useState(recipeParsed.name)
    const [preparation, setPreparation] = useState(recipeParsed.preparation)
    const [preparationTime, setPreparationTime] = useState(recipeParsed.preparationTime)
    const [difficultyLevel, setDifficultyLevel] = useState(recipeParsed.difficultyLevel)
    const [genre, setGenre] = useState(recipeParsed.genre)
    const [ingredients, setIngredients] = useState<Ingredient[]>(recipeParsed.ingredients)
    const [error, setError] = useState<Error>()

    console.log(ingredients)

    const handleEdit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const updatedIngredientsPromises = ingredients.map(async (ingredient) => {
            const response = await IngredientService.updateIngredient(ingredient);
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error(json.errorMessage);
            }
        });
        try {
            await Promise.all(updatedIngredientsPromises);
            const recipe = {
                id: recipeId,
                name,
                preparation,
                preparationTime,
                difficultyLevel,
                genre,
                userId
            };
    
            const response = await RecipeService.updateRecipe(recipe);
            const json = await response.json();
            if (response.status === 200) {
                setError(undefined);
                router.push(back as string);
                setError(undefined);
            } else {
                setError(json);
            }
        } catch {
            setError(error);
        }
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push(back as string)
    }

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const updatedIngredients = [...ingredients]
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value,
        }
        setIngredients(updatedIngredients)
    }

    return (
        <>
            {error ? (
                <p className={styles.error}>{error.errorMessage}</p>
            ) : null
            }
            <p className={styles.header}>Edit Recipe</p>
            <form className={styles.form}>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Name</label>
                        <input
                            className={styles.input} 
                            type="text"
                            placeholder='Name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Genre</label>
                        <input 
                            className={styles.input}
                            type="text"
                            placeholder='Genre...'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <label className={styles.label2}>Preparation</label>
                    <textarea
                        className={styles.input2}
                        placeholder="Instructions..." 
                        cols={100} 
                        rows={10} 
                        value={preparation} 
                        onChange={(e) => setPreparation(e.target.value)}>
                    </textarea>
                </div>
                <div className={styles.row}>
                    <div className={styles.field2}>
                        <label className={styles.label3}>Preparation Time</label>
                        <input 
                            className={styles.input3}
                            type="number"
                            value={preparationTime}
                            onChange={(e) => setPreparationTime(Number(e.target.value))}
                        />
                    </div>
                    <div className={styles.field2}>
                        <label className={styles.label3}>Difficulty Level</label>
                        <input 
                            className={styles.input3}
                            type="number"
                            value={difficultyLevel}
                            min="1"
                            max="10"
                            onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleEdit}>Edit</button>
                    <button className={styles.button} onClick={handleCancel}>Cancel</button>
                </div>
            </form>

            <p className={styles.title}>Ingredients</p>
            <div className={styles.ingredients}>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className={styles.ingredient2}>
                            <input
                                className={styles.ingredientInput1}
                                type="text"
                                placeholder="Name..."
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            />
                            <input
                                className={styles.ingredientInput2}
                                type="number"
                                value={ingredient.amountUsed}
                                onChange={(e) => handleIngredientChange(index, 'amountUsed', e.target.value)}
                            />
                        </div>
                    ))}
            </div>
        </>
    )
}

export default RecipeEditForm