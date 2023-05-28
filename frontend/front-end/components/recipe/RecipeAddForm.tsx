import { use, useState } from "react"
import UserService from "@/services/UserService"
import RecipeService from "@/services/RecipeService"
import IngredientService from "@/services/IngredientService"
import { useRouter } from 'next/router'
import { Error, Recipe } from '../../types'
import styles from "../../styles/createRecipe.module.css"
import { Ingredient } from "../../types"


const RecipeAddForm: React.FC = () => {

    const [name, setName] = useState("")
    const [genre, setGenre] = useState("")
    const [preparation, setPreparation] = useState("")
    const [preparationTime, setPreparationTime] = useState(0)
    const [difficultyLevel, setDifficultyLevel] = useState(0)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [ingredientName, setIngredientName] = useState("")
    const [amount, setAmount] = useState(0)
    const [userId, setUserId] = useState(-1)
    const [error, setError] = useState<Error>()

    const router = useRouter()
    
    const username = sessionStorage.getItem("username")
    if (username) {
        UserService.getUserwithUsername(username).then(response => {
            if (response.ok) {
                response.json().then(user =>  {
                    setUserId(user.id)
                })
            }
        })
    }

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const addedIngredients = [];
        for (const ingredient of ingredients) {
            try {
              const result = await IngredientService.addIngredient(ingredient);
              const resultJson = await result.json();
              if (result.status === 200) {
                const { id } = resultJson;
              addedIngredients.push(id);
              }
              else {
                setError(resultJson)
              }
            } catch (error) {
              console.error(`Failed to add ingredient: ${error}`);
            }
        }
        const response = await RecipeService.addRecipe({name, preparation, preparationTime, difficultyLevel, genre, userId, ingredientId: addedIngredients.pop()});
        const json = await response.json();
        if (response.status === 200) {
            const { id } = json;
            for (const ingredientId of addedIngredients) {
                await IngredientService.addIngredientToRecipe({ingredientId, recipeId: id});
            }
            router.push('/recipes')
        }
        else {
            setError(json)
        }
    }

    const cancel: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        router.push('/recipes')
    }

    const addIngredient = () => {
        const ingredient: Ingredient = {
          id: ingredients.length + 1,
          name: ingredientName,
          amountUsed: amount
        };
        if (ingredient.name == null || ingredient.name == "" || ingredient.amountUsed < 1) {
            console.log("dont add")
        }
        else {
            setIngredients([...ingredients, ingredient]);
            setIngredientName("");
            setAmount(0);
        }
        
      }

    return (
        <>
            {error ? (
                <p className={styles.error}>{error.errorMessage}</p>
            ) : null
            }
            <p className={styles.header}>Create Recipe</p>
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
                    <button className={styles.button} onClick={handleSubmit}>Create</button>
                    <button className={styles.button} onClick={cancel}>Cancel</button>
                </div>
                <p className={styles.title}>Ingredients</p>
                <div className={styles.ingredients}>
                    <div className={styles.ingredient}>
                        <label className={styles.ingredientLabel}>Name</label>
                        <input
                            className={styles.ingredientInput}
                            type="text"
                            placeholder="Name..."
                            value={ingredientName}
                            onChange={(e) => setIngredientName(e.target.value)}
                        />
                    </div>
                    <div className={styles.ingredient}>
                        <label className={styles.ingredientLabel}>Amount</label>
                        <input
                            className={styles.ingredientInput}
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>
                    <a href="#" onClick={addIngredient} className={styles.addIngredient}>Add Ingredient</a>
                </div>
                {ingredients.length != 0 ? (
                    <div className={styles.list}>
                        <ul>
                            {ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                Name: {ingredient.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount: {ingredient.amountUsed}
                            </li>
                            ))}
                        </ul>
                    </div>
                ): null}
            </form>
        </>
    )
}

export default RecipeAddForm
