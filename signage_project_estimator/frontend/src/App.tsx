import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import AddSignComponentMenu from "./components/AddSignComponentMenu.tsx";
import TotalCostReport from "./components/TotalCostReport.tsx";
import type { CostItem } from "./components/TotalCostReport.tsx";
import DefinedSignComponentRecord from "./components/DefinedSignComponentRecord.tsx";
import type { SignComponentData } from "./types/signComponent";
import { calculateAllCosts } from "./utils/costCalculations";
import type { MaterialCost } from "./utils/costCalculations";

interface Material {
    id: number;
    name: string;
    category: string;
    depth_mm: string; // numeric columns arrive as strings from pg
    pricing_unit: string;
    unit_cost: string;
    created_at: string;
}

function App() {
    const [components, setComponents] = useState<SignComponentData[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [materialsLoading, setMaterialsLoading] = useState(true);
    const [materialsError, setMaterialsError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/")
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data: Material[]) => setMaterials(data))
            .catch((err) => setMaterialsError(err.message))
            .finally(() => setMaterialsLoading(false));
    }, []);

    function handleAdd(data: SignComponentData) {
        setComponents((prev) => [...prev, data]);
    }

    const materialCosts: MaterialCost[] = materials.map((m) => ({
        name: m.name,
        unitCost: parseFloat(m.unit_cost) || 0,
    }));

    const costItems: CostItem[] = calculateAllCosts(components, materialCosts);

    return (
        <div className="min-h-screen bg-white text-black text-right">
            <Header />
            <div className="p-8">
                <AddSignComponentMenu onAdd={handleAdd} />

                {components.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">Defined Components</h2>
                        {components.map((data, index) => (
                            <DefinedSignComponentRecord key={index} data={data} index={index} cost={costItems[index]?.cost ?? 0} />
                        ))}
                    </div>
                )}
            </div>
            <TotalCostReport items={costItems} />

            {/* Materials table (test) */}
            <div className="p-8">
                <h2 className="text-xl font-semibold mb-2">Materials (from database)</h2>
                {materialsLoading && <p>Loading...</p>}
                {materialsError && <p className="text-red-600">Error: {materialsError}</p>}
                {!materialsLoading && !materialsError && (
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Depth (mm)</th>
                            <th className="border border-gray-300 p-2">Pricing Unit</th>
                            <th className="border border-gray-300 p-2">Unit Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {materials.map((m) => (
                            <tr key={m.id}>
                                <td className="border border-gray-300 p-2">{m.id}</td>
                                <td className="border border-gray-300 p-2">{m.name}</td>
                                <td className="border border-gray-300 p-2">{m.category}</td>
                                <td className="border border-gray-300 p-2">{m.depth_mm}</td>
                                <td className="border border-gray-300 p-2">{m.pricing_unit}</td>
                                <td className="border border-gray-300 p-2">${m.unit_cost}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default App;