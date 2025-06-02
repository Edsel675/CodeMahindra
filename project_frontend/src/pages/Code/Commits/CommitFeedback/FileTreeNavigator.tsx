import { useState } from "react";
import { Folder, FolderOpen, FileIcon, Search } from "lucide-react";
import { FileNode, fileTree } from "./fileStructure";

type Props = {
  onSelectFile?: (path: string) => void;
};

const FileTreeNavigator = ({ onSelectFile }: Props) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  const toggleExpand = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const matchesFilter = (name: string) =>
    name.toLowerCase().includes(filter.toLowerCase());

  const filterTree = (nodes: FileNode[], parentPath = ""): FileNode[] => {
    return nodes
      .map((node) => {
        const fullPath = `${parentPath}${node.name}`;
        if (node.type === "folder") {
          const filteredChildren = filterTree(node.children || [], `${fullPath}/`);
          if (matchesFilter(node.name) || filteredChildren.length > 0) {
            return { ...node, children: filteredChildren };
          }
          return null;
        } else {
          return matchesFilter(node.name) ? node : null;
        }
      })
      .filter((n): n is FileNode => n !== null);
  };

  const renderNode = (node: FileNode, parentPath = ""): JSX.Element => {
    const fullPath = `${parentPath}${node.name}`;

    if (node.type === "folder") {
      const isOpen = expanded[fullPath];
      return (
        <div key={fullPath}>
          <div
            className="cursor-pointer flex items-center gap-2 px-2 py-[2px] hover:bg-[#1e1e1e] rounded-sm"
            onClick={() => toggleExpand(fullPath)}
          >
            <span className="w-4">{isOpen ? <FolderOpen size={14} /> : <Folder size={14} />}</span>
            <span className="text-gray-200">{node.name}</span>
          </div>
          {isOpen && (
            <div className="pl-4">
              {node.children?.map((child) => renderNode(child, `${fullPath}/`))}
            </div>
          )}
        </div>
      );
    }

    const colorMap = {
      added: "text-green-400",
      removed: "text-red-400",
      modified: "text-yellow-400",
      unchanged: "text-gray-300",
    };

    return (
      <div
        key={fullPath}
        className={`cursor-pointer flex items-center gap-2 px-2 py-[2px] rounded-sm ${
          selectedFile === fullPath ? "bg-[#1c2128]" : "hover:bg-[#1e1e1e]"
        }`}
        onClick={() => {
          setSelectedFile(fullPath);
          onSelectFile?.(fullPath);
        }}
      >
        <span className="w-4"><FileIcon size={14} /></span>
        <span className={`${colorMap[node.status || "unchanged"]}`}>{node.name}</span>
      </div>
    );
  };

  const filteredTree = filterTree(fileTree);

  return (
    <div className="bg-[#0d1117] w-full p-2 text-sm text-white max-h-[80vh] overflow-y-auto">
      <div className="relative mb-2">
        <input
          type="text"
          placeholder="Filter files..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-8 text-xs bg-[#0d1117] text-gray-300 border border-[#30363d] py-[5px] rounded focus:outline-none focus:ring-1 focus:ring-[#2f81f7]"
        />
        <Search
          size={14}
          className="absolute left-2 top-1.5 text-gray-400 pointer-events-none"
        />
      </div>
      {filteredTree.map((node) => renderNode(node))}
    </div>
  );
};

export default FileTreeNavigator;
