import { useState } from 'react';

import './App.css'

export default function Ingredients() {
    const [ingredients, setIngredients] = useState(["Apple", "Banana", "Pear"]);;
    const [newIngredient, setNewIngredient] = useState([""]);

    function handleInputChange(event) {
        const endCharacter = event.target.value[event.target.value.length - 1];
        if (endCharacter === "\n") {
            addIngredient(event.target.value);
            setNewIngredient("");
        } else {
            const message = event.target.value;
            setNewIngredient(message);
        }
    }

    function addIngredient(event) {
        console.log(event.key);
        if (["Enter", "\n"].includes(event.key)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            setNewIngredient("");
        }
    }

    return <>
        <ul>
            {ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>
            })}
        </ul>
        <input
            type="text"
            value={newIngredient}
            onKeyDown={addIngredient}
            onChange={handleInputChange}
            placeholder="Add Ingredient"
        ></input>
    </>
}