import type { SignComponentData } from "../types/signComponent";

type DefinedSignComponentRecordProps = {
    data: SignComponentData;
    index: number;
};

export default function DefinedSignComponentRecord({ data, index }: DefinedSignComponentRecordProps) {
    const fields: { label: string; value: string | number }[] = [];

    switch (data.type) {
        case "Base":
            fields.push({ label: "Width", value: `${data.width}"` });
            fields.push({ label: "Height", value: `${data.height}"` });
            break;
        case "Dimensional Letters":
            fields.push({ label: "Sentence", value: data.sentence });
            fields.push({ label: "Avg. Height", value: `${data.avgHeightPerLetter}"` });
            break;
        case "Vinyl Plot":
            fields.push({ label: "Width", value: `${data.width}"` });
            fields.push({ label: "Height", value: `${data.height}"` });
            break;
        case "Large-Format Decal":
            fields.push({ label: "Width", value: `${data.width}"` });
            fields.push({ label: "Height", value: `${data.height}"` });
            break;
    }

    if (data.material) {
        fields.push({ label: "Material", value: data.material });
    }

    return (
        <div className="rounded border border-gray-200 p-4 mb-4 w-96 ml-auto">
            <h3 className="text-lg font-semibold">Component #{index + 1}: {data.type}</h3>
            <ul className="mt-2 space-y-1">
                {fields.map((field, i) => (
                    <li key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{field.label}:</span>
                        <span className="font-medium">{field.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}