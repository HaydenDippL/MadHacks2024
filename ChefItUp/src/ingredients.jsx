import { useState } from 'react';

import './App.css'

export default function Ingredients() {
    const [ingredients, setIngredients] = useState(["Apple", "Banana", "Pear"]);
    const [newIngredient, setNewIngredient] = useState("");

    function handleInputChange(event) {
        const message = event.target.value;
        setNewIngredient(message);
    }

    function addIngredient(event) {
        console.log(event.key);
        if (["Enter", "\n"].includes(event.key)) {
            if (newIngredient.trim() !== "") {
                setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            }
            setNewIngredient("");
        }
    }

    function removeItem(index) {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    }

    return <div class="vbox">
        <ul class = "ulIngred">
            {ingredients.map((ingredient, index) => {
                return <li 
                        key={index}>
                            <button
                            onClick={() => removeItem(index)}
                            style={{
                                padding: '4px 4px', // Adjust size
                                backgroundColor: '#ff4d4d', // Adjust color
                                color: 'white',
                                border: '2px solid white',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '14px', // Adjust text size
                                alignSelf: 'center'
                            }}
                            >
                            Remove
                            </button>
                            {ingredient}
                        </li> 
            })}
        </ul>

        <input
            type="text"
            value={newIngredient}
            onKeyDown={addIngredient}
            onChange={handleInputChange}
            placeholder="Add Ingredient"
        ></input>
    </div>;
}