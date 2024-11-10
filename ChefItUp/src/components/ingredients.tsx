import { useState } from "react";

import { Input } from "@nextui-org/input";

import { useIngredientContext } from "@/context/ingredients-context";
import { Button } from "@nextui-org/button";

export default function Ingredients() {

    const [ingredients, setIngredients] = useIngredientContext();
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
    
    function removeIngredient(index: number) {
        setIngredients((prevIngredients: string[]) => {
            const newIngredients: string[] = [...prevIngredients];
            newIngredients.splice(index, 1);
            return newIngredients;
        })
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
            <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, i) => {
                    return <div key={i} className="flex flex-row items-center border-solid border-2 rounded-md p-2 gap-2" style={{borderColor: "#3f3f46"}}>
                        <p>{ingredient}</p>
                        <Button
                            className="p-0 h-6 flex items-center justify-center"
                            onClick={() => removeIngredient(i)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </Button>
                    </div>
                })}
            </div>
        </div>
    </>
}