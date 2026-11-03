import { useEffect, useRef, useState } from "react";
import SignComponent from "./SignComponent.tsx";

const COMPONENT_TYPES = [
    "Base",
    "Dimensional Letters",
    "Vinyl Plot",
    "Large-Format Decal",
];

export default function AddSignComponentMenu() {
    const [open, setOpen] = useState(false);
    const [activeType, setActiveType] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const disabled = activeType !== null;

    function handleSelect(type: string) {
        console.log('user picked: '+type);
        setActiveType(type);
        setOpen(false);
    }

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (


        <div ref={ref} className="relative inline-block">
            <button
                onClick={() => setOpen((o) => !o)}
                disabled={disabled}
                className="px-4 py-2 rounded border border-gray-300 bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
                + New Component
            </button>

            {open && !disabled && (
                <ul className="absolute left-0 mt-2 w-56 rounded border border-gray-200 bg-white text-black shadow-lg z-10">
                    {COMPONENT_TYPES.map((type) => (
                        <li key={type}>
                            <button
                                onClick={() => handleSelect(type)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                {type}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {activeType && (
                <SignComponent
                    type={activeType}
                    onDone={() => setActiveType(null)}
                />
            )}
        </div>
    );
}