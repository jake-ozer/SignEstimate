import React from "react";

type HeaderProps = {
    title?: string;
    subtitle?: string;
};

export default function Header({
                                   title = "Signage Cost Estimator",
                                   subtitle = "Get a quick estimate for your signage project",
                               }: HeaderProps) {
    return (
        <header className="px-8 py-6 border-b border-gray-200 bg-white font-sans">
            <h1 className="m-0 text-[1.75rem] text-gray-900">{title}</h1>
            <p className="mt-1 mb-0 text-base text-gray-500">{subtitle}</p>
        </header>
    );
}