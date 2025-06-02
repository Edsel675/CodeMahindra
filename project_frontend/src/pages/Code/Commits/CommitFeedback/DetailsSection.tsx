import { useState } from "react";
import FileTreeNavigator from "./FileTreeNavigator";
import DiffViewer from "./DiffViewer";
import { navbarDiff } from "./DiffMock";

export default function DetailsSection() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const selectedDiff =
    selectedPath === `${navbarDiff.path}/${navbarDiff.filename}`
      ? navbarDiff
      : null;

  return (
    <div className="flex w-full h-full bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden text-white">
      {/* Sidebar izquierda: lista de archivos */}
      <div className="w-1/4 border-r border-[#30363d] overflow-y-auto">
        <FileTreeNavigator onSelectFile={setSelectedPath} />
      </div>

      {/* Panel derecho: vista del diff */}
      <div className="w-3/4 overflow-y-auto p-3">
        {selectedDiff ? (
          <DiffViewer diff={selectedDiff} />
        ) : (
          <div className="text-center text-sm text-gray-400 mt-10">
            Selecciona un archivo para ver sus cambios
          </div>
        )}
      </div>
    </div>
  );
}
