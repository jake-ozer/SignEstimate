import "./FormStyles.css"

function SizeInputs() {
    return (
        <>
            <label >Sentence <input type="text" placeholder="Letters To Display" /></label>
            <label className="inches">Avg. Height Per Letter<input type="number" placeholder="0" /></label>
            <label className="inches">Depth Per Letter<input type="number" placeholder="0" /></label>
        </>
    );
}

export default function DimensionalLettersForm() {
    return (
        <>
            <SizeInputs />
            <label>Material <select>...</select></label>
        </>
    );
}