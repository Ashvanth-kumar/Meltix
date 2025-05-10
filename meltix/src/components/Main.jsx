export default function Main(){
    return (
        <main>
            <form className="add-ingredient-form">
                {/* <label> </label> */}
                <input 
                    type="text " 
                    placeholder=" eg.Oregano"
                    aria-label="Add ingredient"
                />
                <button> Add</button>
            </form>
        </main>
    )
}