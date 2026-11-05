import { useState } from "react";
import type { DimensionalLettersData } from "../../types/signComponent";
import "./FormStyles.css";

type DimensionalLettersFormProps = {
    onSubmit: (data: DimensionalLettersData) => void;
};

export default function DimensionalLettersForm({ onSubmit }: DimensionalLettersFormProps) {
    const [sentence, setSentence] = useState("");
    const [avgHeightPerLetter, setAvgHeightPerLetter] = useState(0);
    const [depthPerLetter, setDepthPerLetter] = useState(0);
    const [material, setMaterial] = useState("");

    function handleSubmit() {
        onSubmit({ type: "Dimensional Letters", sentence, avgHeightPerLetter, depthPerLetter, material });
    }

    return (
        <>
            <label>Sentence <input type="text" placeholder="Letters To Display" value={sentence} onChange={(e) => setSentence(e.target.value)} /></label>
            <label className="inches">Avg. Height Per Letter <input type="number" placeholder="0" value={avgHeightPerLetter} onChange={(e) => setAvgHeightPerLetter(Number(e.target.value))} /></label>
            <label className="inches">Depth Per Letter <input type="number" placeholder="0" value={depthPerLetter} onChange={(e) => setDepthPerLetter(Number(e.target.value))} /></label>
            <label>Material <select value={material} onChange={(e) => setMaterial(e.target.value)}><option value="">Select...</option><option value="Aluminum">Aluminum</option><option value="Wood">Wood</option><option value="Plastic">Plastic</option></select></label>
            <button type="button" onClick={handleSubmit} className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Submit</button>
        </>
    );
}