import React from "react"
import IngredientList from "./IngredientsList"
import Recipe from "./Recipe"
// import getRecipeFromMistral from "../../api/getRecipe"
// import {getRecipeFromMistral } from ""

export default function Main(){


    const [ingredients,setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        console.log("Fetching recipe with :" , ingredients)
        try {
            const response = await fetch("/api/getRecipe", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({ ingredients }),
            });

            const text = await response.text();
            console.log("Recipe received:", text); // <-- this logs what the API sends back
            setRecipe(text);
        } catch (err) {
            console.error("Error fetching recipe:", err);
            setRecipe("Sorry, something went wrong.");
        }
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
            {ingredients.length > 0 && <IngredientList ingredients={ingredients} getRecipe = {getRecipe}/>}
            {recipe && <Recipe recipe={recipe}/>}
        </main>

    )
}