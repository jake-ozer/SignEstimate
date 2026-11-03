import "./FormStyles.css"

function SizeInputs() {
    return (
        <>
            <label className="inches">Width <input type="number" placeholder="0" /></label>
            <label className="inches">Height <input type="number" placeholder="0" /></label>
            <label className="inches">Depth <input type="number" placeholder="0" /></label>
        </>
    );
}

export default function BaseSignForm() {
    return (
        <>
            <SizeInputs />
            <label>Material <select>...</select></label>
        </>
    );
}