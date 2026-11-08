import { useEffect, useState } from "react";
import type { DimensionalLettersData } from "../../types/signComponent";
import "./FormStyles.css";
import {unitLabel} from "../../utils/unitLabels.ts";

type DimensionalLettersFormProps = {
    onSubmit: (data: DimensionalLettersData) => void;
};

type MaterialOption = {
    id: number;
    name: string;
    category: string;
    depth_mm: string; // numeric columns arrive as strings from pg
};

export default function DimensionalLettersForm({ onSubmit }: DimensionalLettersFormProps) {
    const [sentence, setSentence] = useState("");
    const [avgHeightPerLetter, setAvgHeightPerLetter] = useState(0);
    const [materials, setMaterials] = useState<MaterialOption[]>([]);
    const [category, setCategory] = useState("");
    const [materialId, setMaterialId] = useState("");
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/materials?type=Dimensional_Letters")
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data: MaterialOption[]) => setMaterials(data))
            .catch((err) => setLoadError(err.message));
    }, []);

    // Unique categories, in the order the server sorted them
    const categories = [...new Set(materials.map((m) => m.category))];

    // Rows in the chosen category (already sorted by depth)
    const depthOptions = materials.filter((m) => m.category === category);

    function handleCategoryChange(value: string) {
        setCategory(value);
        setMaterialId(""); // clear the old depth choice
    }

    function handleSubmit() {
        const selected = materials.find((m) => String(m.id) === materialId);
        onSubmit({
            type: "Dimensional Letters",
            sentence,
            avgHeightPerLetter,
            material: selected?.name ?? "",
        });
    }

    return (
        <>
            <label>Sentence <input type="text" placeholder="Letters To Display" value={sentence} onChange={(e) => setSentence(e.target.value)} /></label>
            <label className="inches">Avg. Height Per Letter <input type="number" placeholder="0" value={avgHeightPerLetter} onChange={(e) => setAvgHeightPerLetter(Number(e.target.value))} /></label>

            <label>Material
                <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="">Select...</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </label>

            {category && (
                <label>Depth
                    <select value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
                        <option value="">Select...</option>
                        {depthOptions.map((m) => (
                            <option key={m.id} value={m.id}>{unitLabel(m.depth_mm)}</option>
                        ))}
                    </select>
                </label>
            )}

            {loadError && <p className="text-red-600">Couldn't load materials: {loadError}</p>}
            <button type="button" onClick={handleSubmit} disabled={!materialId} className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50">Submit</button>
        </>
    );
}