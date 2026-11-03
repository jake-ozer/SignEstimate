export type CostItem = {
    name: string;
    cost: number;
};

type TotalCostReportProps = {
    items?: CostItem[];
};

function formatCurrency(amount: number) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}

export default function TotalCostReport({ items = [] }: TotalCostReportProps) {
    const total = items.reduce((sum, item) => sum + item.cost, 0);

    return (
        <footer className="mt-8 border-t border-gray-200 bg-white px-8 py-6">
            <h2 className="text-xl font-semibold">Total Cost Report</h2>

            {items.length === 0 ? (
                <p className="mt-2 text-gray-500">No components added yet.</p>
            ) : (
                <ul className="mt-4">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className="flex justify-between border-b border-gray-100 py-2"
                        >
                            <span>{item.name}</span>
                            <span>{formatCurrency(item.cost)}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
            </div>
        </footer>
    );
}