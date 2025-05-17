import React from "react"
import IngredientList from "./IngredientsList"
import Recipe from "./Recipe"
// import {getRecipeFromMistral } from ""

export default function Main(){


    const [ingredients,setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)

    function toggleRecipeShown(){
        setRecipeShown(prevShown => !prevShown )
        console.log({recipeShown})
    }

    function addIngredient(formData) {

        const newIngredient = formData.get("ingredient")
        setIngredients(previngredients =>(
            [...previngredients, newIngredient]
        ))
    }

    return (
        <main>
            <form 
                action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text " 
                    placeholder=" eg.Oregano"
                    name="ingredient"
                    aria-label="Add ingredient"
                />
                <button > Add</button>
            </form>
            {ingredients.length > 0 && <IngredientList ingredients={ingredients} toggleRecipeShown = {toggleRecipeShown}/>}
            {recipeShown && <Recipe />}
        </main>

    )
}