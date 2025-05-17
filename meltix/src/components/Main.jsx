import React from "react"

export default function Main(){
    // const ingredients =["asdf","sdfasd","sdfsdfasd"]
    const [ingredients,setIngredients] = React.useState([])

    const ingredientsList = ingredients.map(ingredient =>(
        <li key={ingredient}>{ ingredient} </li>
    ))

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("item")
        // console.log({newIngredient},"added")
        setIngredients(previngredients =>(
            [...previngredients, newIngredient]
        ))
    }
    return (
        <main>
            <form 
                onSubmit={handleSubmit} className="add-ingredient-form">
                <input 
                    type="text " 
                    placeholder=" eg.Oregano"
                    name="item"
                    aria-label="Add ingredient"
                />
                <button > Add</button>
            </form>
            {ingredients.length > 0 && <section className="Ingredients-section">
                <h2>
                    Ingredients on hand :
                </h2>
                <ul className="ingerdients-list" aria-live="polite"> {ingredientsList}  </ul>
                {ingredients.length > 3  && <div className="get-recipe-container">
                    <div className="Strts">
                        <h3>Ready for a recipe ?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button>Get a recipe</button>
                </div>}
            </section>
            }
        </main>
    )
}