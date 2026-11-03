import Header from "./components/Header.tsx";
import AddSignComponentMenu from "./components/AddSignComponentMenu.tsx";
import TotalCostReport from "./components/TotalCostReport.tsx";
import DefinedSignComponentRecord from "./components/DefinedSignComponentRecord.tsx";

function App() {
    return (
        <div className="min-h-screen bg-white text-black text-right">
            <Header />
            <div className="p-8">
                <AddSignComponentMenu/>
            </div>
            <DefinedSignComponentRecord />
            <TotalCostReport />
        </div>
    );
}

export default App;