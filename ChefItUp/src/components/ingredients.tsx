import { useState } from "react";

import { Input } from "@nextui-org/input";

export default function Ingredients() {
    const [ingredients, setIngredients] = useState(["Apple", "Banana", "Pear"]);
    const [newIngredient, setNewIngredient] = useState("");

    function handleInputchange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputIngredient: string = event.target.value;
        setNewIngredient(inputIngredient);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        const key: string = event.key;
        console.log(key);
        if (key === "Enter") {
            setIngredients(prevIngredients => [newIngredient.trim(), ...prevIngredients]);
            setNewIngredient("");
        }
    }
    
    return <>
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
                type="text"
                onChange={handleInputchange}
                onKeyDown={handleKeyDown}
                value={newIngredient}
                variant="bordered"
                label="Ingredients"/>
            <ul>
                {ingredients.map((ingredient, i) => {
                    return <li key={i}>{ingredient}</li>
                })}
            </ul>
        </div>
    </>
}