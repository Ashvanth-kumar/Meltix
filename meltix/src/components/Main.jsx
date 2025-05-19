import React from "react"
import IngredientList from "./IngredientsList"
import Recipe from "./Recipe"
import Loader from "./Loader"

export default function Main(){


    const [ingredients,setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    async function getRecipe() {
        console.log("Fetching recipe with :" , ingredients)
        setIsLoading(true)
        try {
            const response = await fetch("/api/getRecipe", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({ ingredients }),
            });

            const text = await response.text();
            console.log("Recipe received:", text); 
            setRecipe(text);
        } catch (err) {
            console.error("Error fetching recipe:", err);
            setRecipe("Sorry, something went wrong.");
        } finally {
            setIsLoading(false)
        }
    }


    function addIngredient(formData) {

        const newIngredient = formData.get("ingredient")
        setIngredients(previngredients =>(
            [...previngredients, newIngredient]
        ))
    }

    return (
        <main className="main-card">
            <form action={addIngredient} className="input-row">
                <input 
                    type="text " 
                    placeholder=" eg.Oregano"
                    name="ingredient"
                    aria-label="Add ingredient"
                />
                <button >Add</button>
            </form>
            
            {ingredients.length > 0 && (
                <IngredientList ingredients={ingredients} getRecipe = {getRecipe}/>
            )}

            {isLoading && <Loader />}
            
            { !isLoading && recipe && <h2> Meltix Suggests that :</h2> &&<Recipe recipe={recipe}/>}
        </main>

    )
}