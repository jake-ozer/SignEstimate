import { useEffect, useState } from "react";
import type { LargeFormatDecalData } from "../../types/signComponent";
import "./FormStyles.css";

type LargeFormatDecalFormProps = {
    onSubmit: (data: LargeFormatDecalData) => void;
};

type MaterialOption = {
    id: number;
    name: string;
};

export default function LargeFormatDecalForm({ onSubmit }: LargeFormatDecalFormProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [materials, setMaterials] = useState<MaterialOption[]>([]);
    const [materialId, setMaterialId] = useState("");
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/materials?type=Large_Format_Decal")
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data: MaterialOption[]) => setMaterials(data))
            .catch((err) => setLoadError(err.message));
    }, []);

    function handleSubmit() {
        const selected = materials.find((m) => String(m.id) === materialId);
        onSubmit({ type: "Large-Format Decal", width, height, material: selected?.name ?? "", quantity });
    }

    return (
        <>
            <label className="inches">Width <input type="number" placeholder="0" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></label>
            <label className="inches">Height <input type="number" placeholder="0" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></label>

            <label>Material
                <select value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
                    <option value="">Select...</option>
                    {materials.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </label>

            <label>Quantity <input type="number" min="1" placeholder="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} /></label>

            {loadError && <p className="text-red-600">Couldn't load materials: {loadError}</p>}
            <button type="button" onClick={handleSubmit} disabled={!materialId} className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50">Submit</button>
        </>
    );
}