import { useState } from "react";
import type { VinylPlotData } from "../../types/signComponent";
import "./FormStyles.css";

type VinylPlotFormProps = {
    onSubmit: (data: VinylPlotData) => void;
};

export default function VinylPlotForm({ onSubmit }: VinylPlotFormProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [material, setMaterial] = useState("");

    function handleSubmit() {
        onSubmit({ type: "Vinyl Plot", width, height, material });
    }

    //material types need to be queried from database
    //cost calculation should be done in an imported .ts file.
    return (
        <>
            <label className="inches">Width <input type="number" placeholder="0" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></label>
            <label className="inches">Height <input type="number" placeholder="0" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></label>
            <label>Material <select value={material} onChange={(e) => setMaterial(e.target.value)}><option value="">Select...</option><option value="Vinyl">Vinyl</option><option value="Adhesive">Adhesive</option></select></label>
            <button type="button" onClick={handleSubmit} className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Submit</button>
        </>
    );
}