import type { SignComponentData } from "../types/signComponent";
import BaseSignForm from "./SignComponentForms/BaseSignForm.tsx";
import DimensionalLettersForm from "./SignComponentForms/DimensionalLettersForm.tsx";
import VinylPlotForm from "./SignComponentForms/VinylPlotForm.tsx";
import LargeFormatDecalForm from "./SignComponentForms/LargeFormatDecalForm.tsx";

type SignComponentProps = {
    type: string;
    onDone: () => void;
    onSubmit: (data: SignComponentData) => void;
};


const FORMS: Record<string, React.ComponentType<{ onSubmit: (data: SignComponentData) => void }>> = {
    "Base": BaseSignForm,
    "Dimensional Letters": DimensionalLettersForm,
    "Vinyl Plot": VinylPlotForm,
    "Large-Format Decal": LargeFormatDecalForm
};

export default function SignComponent({ type, onDone, onSubmit }: SignComponentProps) {
    const Form = FORMS[type];

    return (
        <div className="mt-6 ml-auto w-96 rounded border border-gray-200 p-4">
            <h2 className="text-xl font-semibold">{type}</h2>

            <br/>
            <Form onSubmit={onSubmit} />
            <br/>

            <button
                onClick={onDone}
                className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
                Cancel
            </button>
        </div>
    );
}