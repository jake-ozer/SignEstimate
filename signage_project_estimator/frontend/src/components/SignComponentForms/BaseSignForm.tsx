import { useEffect, useState } from "react";
import type { BaseSignData } from "../../types/signComponent";
import "./FormStyles.css";

type BaseSignFormProps = {
    onSubmit: (data: BaseSignData) => void;
};

type MaterialOption = {
    id: number;
    name: string;
};

export default function BaseSignForm({ onSubmit }: BaseSignFormProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [material, setMaterial] = useState("");
    const [materials, setMaterials] = useState<MaterialOption[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/materials?type=Base")
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data: MaterialOption[]) => setMaterials(data))
            .catch((err) => setLoadError(err.message));
    }, []);

    function handleSubmit() {
        onSubmit({ type: "Base", width, height, material });
    }

    return (
        <>
            <label className="inches">Width <input type="number" placeholder="0" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></label>
            <label className="inches">Height <input type="number" placeholder="0" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></label>
            <label>Material
                <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                    <option value="">Select...</option>
                    {materials.map((m) => (
                        <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                </select>
            </label>
            {loadError && <p className="text-red-600">Couldn't load materials: {loadError}</p>}
            <button type="button" onClick={handleSubmit} className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Submit</button>
        </>
    );
}