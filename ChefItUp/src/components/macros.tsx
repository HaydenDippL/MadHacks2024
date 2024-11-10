import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { useMacroContext } from "@/context/macro-context";

const levels = ["Low", "Med", "High"] as const;

// Simplified macroPresets structure
export const macroPresets = {
    carbs: { Low: 20, Med: 45, High: 60, units: "Grams" },
    protein: { Low: 10, Med: 20, High: 40, units: "Grams" },
    fats: { Low: 5, Med: 15, High: 25, units: "Grams" },
    calories: { Low: 400, Med: 600, High: 800, units: "Cal" }
} as const;

export default function Macros() {
    const [macros, setMacros] = useMacroContext();

    // Function to handle selection change for macros
    function setMacroSelectChange(
        event: React.ChangeEvent<HTMLSelectElement>,
        macro: keyof typeof macroPresets
    ) {
        const level = event.target.value;
        const amount = macroPresets[macro][level as keyof typeof macroPresets[typeof macro]];
        
        setMacros(prevMacros => ({
            ...prevMacros,
            [macro]: { level, amount }
        }));
    }

    // Function to handle number input change for macros
    function setMacroNumberChange(
        event: React.ChangeEvent<HTMLInputElement>,
        macro: keyof typeof macroPresets
    ) {
        const amount = parseInt(event.target.value);
        if (isNaN(amount)) return;

        // Get the closest preset level based on the amount entered
        const closestLevel = levels.reduce((closest, level) => {
            const presetAmount = macroPresets[macro][level];
            const distance = Math.abs(presetAmount - amount);

            if (distance < closest.distance) 
                return { level: level, distance: distance };

            return closest;
        }, { level: "Low", distance: Infinity }).level;

        setMacros(prevMacros => ({
            ...prevMacros,
            [macro]: { level: closestLevel, amount: amount }
        }));
    }

    return <div className="flex flex-col w-full flex-wrap gap-4">
        <div className="flex flex-row gap-2 items-center">
            <Select
                className="flex-grow w-32"
                label="Protein"
                isRequired
                onChange={e => setMacroSelectChange(e, "protein")}
                defaultSelectedKeys={["Med"]}
            >
                {levels.map(level => {
                    return <SelectItem key={level}>{level}</SelectItem>
                })}
            </Select>
            <Input
                className="w-16"
                size="lg"
                value={String(macros.protein.amount ?? 0)}
                onChange={e => setMacroNumberChange(e, "protein")}
            ></Input>
            <p>{macroPresets.protein.units}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <Select
                className="flex-grow w-32"
                label="Carbs"
                isRequired
                onChange={e => setMacroSelectChange(e, "carbs")}
                defaultSelectedKeys={["Med"]}
            >
                {levels.map(level => {
                    return <SelectItem key={level}>{level}</SelectItem>
                })}
            </Select>
            <Input
                    className="w-16"
                    size="lg"
                    value={String(macros.carbs.amount ?? 0)}
                    onChange={e => setMacroNumberChange(e, "carbs")}
            ></Input>
            <p>{macroPresets.carbs.units}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <Select
                className="flex-grow w-32"
                label="Fats"
                isRequired
                onChange={e => setMacroSelectChange(e, "fats")}
                defaultSelectedKeys={["Med"]}
            >
                {levels.map(level => {
                    return <SelectItem key={level}>{level}</SelectItem>
                })}
            </Select>
            <Input
                    className="w-16"
                    size="lg"
                    value={String(macros.fats.amount ?? 0)}
                    onChange={e => setMacroNumberChange(e, "fats")}
            ></Input>
            <p>{macroPresets.fats.units}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <Select
                className="flex-grow w-32"
                label="Calories"
                isRequired
                onChange={e => setMacroSelectChange(e, "calories")}
                defaultSelectedKeys={["Med"]}
            >
                {levels.map(level => {
                    return <SelectItem key={level}>{level}</SelectItem>
                })}
            </Select>
            <Input
                    className="w-16"
                    size="lg"
                    value={String(macros.calories.amount ?? 0)}
                    onChange={e => setMacroNumberChange(e, "calories")}
            ></Input>
            <p>{macroPresets.calories.units}</p>
        </div>
    </div>
}