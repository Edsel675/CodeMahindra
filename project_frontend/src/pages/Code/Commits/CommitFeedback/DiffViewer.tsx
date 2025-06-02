import { FileDiff } from "./DiffMock";

type Props = { diff: FileDiff };

export default function DiffViewer({ diff }: Props) {
  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden text-sm font-mono w-full">
      {/* Header superior estilo GitHub */}
      <div className="bg-[#161b22] px-4 py-2 flex justify-between items-center text-white text-xs font-semibold border-b border-[#30363d]">
        <span className="truncate">
          {diff.path}/{diff.filename}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-green-400">+{diff.additions}</span>
          <span className="text-red-400">-{diff.deletions}</span>
        </div>
      </div>

      {/* Contenido de líneas */}
      <div className="text-xs font-mono">
        {diff.lines.map((line, idx) => {
          const bgClass =
            line.type === "added"
              ? "bg-[#033a16]"
              : line.type === "removed"
              ? "bg-[#3d0c0c]"
              : "bg-transparent";

          const sign =
            line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";

          return (
            <div
              key={idx}
              className={`flex items-start ${bgClass} border-b border-[#1c2128]`}
            >
              {/* Número de línea anterior */}
              <div className="w-12 text-right pr-2 text-[#8b949e] border-r border-[#30363d] select-none">
                {line.oldNumber ?? ""}
              </div>

              {/* Número de línea nueva */}
              <div className="w-12 text-right pr-2 text-[#8b949e] border-r border-[#30363d] select-none">
                {line.newNumber ?? ""}
              </div>

              {/* Contenido */}
              <div className="pl-3 py-0.5 whitespace-pre-wrap break-all w-full text-[#c9d1d9]">
                <span className="text-[#6e7681] select-none">{sign}</span>
                {line.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
