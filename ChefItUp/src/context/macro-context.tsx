import { createContext, useState, useContext } from "react";

// Simplified macroPresets structure
export const macroPresets = {
    carbs: { Low: 20, Med: 45, High: 60, units: "Grams" },
    protein: { Low: 10, Med: 20, High: 40, units: "Grams" },
    fats: { Low: 5, Med: 15, High: 25, units: "Grams" },
    calories: { Low: 400, Med: 600, High: 800, units: "Cal" }
} as const;

// Define the types for macros and the context value
type MacroLevels = "Low" | "Med" | "High";

type MacroState = {
    protein: { level: MacroLevels; amount: number };
    carbs: { level: MacroLevels; amount: number };
    fats: { level: MacroLevels; amount: number };
    calories: { level: MacroLevels; amount: number };
};

type MacroContextProviderProps = {
    children: React.ReactNode
};

type MacroContextType = [MacroState, React.Dispatch<React.SetStateAction<MacroState>>]

const MacroContext = createContext<MacroContextType | undefined>(undefined);

export const MacroContextProvider = ({children}: MacroContextProviderProps) => {
    const [macros, setMacros] = useState<MacroState>({
        protein: { level: "Med", amount: macroPresets.protein.Med },
        carbs: { level: "Med", amount: macroPresets.carbs.Med },
        fats: { level: "Med", amount: macroPresets.fats.Med },
        calories: { level: "Med", amount: macroPresets.calories.Med }
    });


    return <MacroContext.Provider value={[macros, setMacros]}>
        {children}
    </MacroContext.Provider>
}

export const useMacroContext = () => {
    const context = useContext(MacroContext);
    if (!context) {
        throw new Error("useMacroContext must be used within a MacroContextProvider");
    }
    return context;
}