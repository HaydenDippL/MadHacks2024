import { createContext, useContext, useState } from "react";

type IngredientsContextProviderProps = {
    children: React.ReactNode
};

type IngredientContextType = [string[], React.Dispatch<React.SetStateAction<string[]>>];

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export const IngredientContextProvider = ({children}: IngredientsContextProviderProps) => {
    const [ingredients, setIngredients] = useState(["Apple", "Banana", "Pear"]);
    
    return <IngredientContext.Provider value={[ingredients, setIngredients]}>
        {children}
    </IngredientContext.Provider>
}

export const useIngredientContext = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error("useIgredientContext must be used within a IngredientContextProvider");
    }
    return context;
}