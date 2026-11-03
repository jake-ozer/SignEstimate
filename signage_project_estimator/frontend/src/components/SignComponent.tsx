import BaseSignForm from "./SignComponentForms/BaseSignForm.tsx";
import DimensionalLettersForm from "./SignComponentForms/DimensionalLettersForm.tsx";
import VinylPlotForm from "./SignComponentForms/VinylPlotForm.tsx";
import LargeFormatDecalForm from "./SignComponentForms/LargeFormatDecalForm.tsx";

type SignComponentProps = {
    type: string;
    onDone: () => void;
};



const FORMS: Record<string, React.ComponentType> = {
    "Base": BaseSignForm,
    "Dimensional Letters": DimensionalLettersForm,
    "Vinyl Plot": VinylPlotForm,
    "Large-Format Decal": LargeFormatDecalForm
};

export default function SignComponent({ type, onDone }: SignComponentProps) {
    const Form = FORMS[type];

    return (
        <div className="mt-6 ml-auto w-80 rounded border border-gray-200 p-4">
            <h2 className="text-xl font-semibold">{type}</h2>

            <br/>
            <Form />
            <br/>

            <button
                onClick={onDone}
                className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
                Done
            </button>
        </div>
    );
}