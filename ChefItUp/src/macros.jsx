import { useState } from 'react';

import './App.css'

export default function Macros() {
    const [macros, setMacros] = useState({
        protein: { level: "Med", grams: 40 },
        carbohydrate: { level: "Med", grams: 100 },
        fat: { level: "Med", grams: 100 },
        calories: 800
    });

    const macroPresets = {
        carbohydrate: { 
            "Low": "< 30g",
            "Med": "30g - 60g",
            "High": "> 60g"
        },
        protein: {
            "Low": "< 15g",
            "Med": "15g - 60g",
            "High": "> 30g"
        },
        Fats: {
            "Low": "< 10g",
            "Med": "10g - 20g",
            "High": "> 20g"
        },
        calories: {
            "Low": "300 - 500",
            "Med": "500 - 700",
            "High": "> 700"
        }
    };

    return <div class="vbox">
        <div>
            <h3>Protein</h3>
        </div>
        <div>
            <h3>Carbohydrate</h3>
        </div>
        <div>
            <h3>Fats</h3>
        </div>
        <div>
            <h3>Calories</h3>
        </div>
    </div>;
}