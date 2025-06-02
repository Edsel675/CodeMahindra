import { useState, useEffect } from "react";
import {
  GitCommitHorizontal,
  CheckCircle,
  Settings,
  Link2,
  GitBranch
} from "lucide-react";
import { Link } from "react-router-dom";

type Commit = {
  message: string;
  author: string;
  date: string;
  retro: string;
  hash: string;
  verified: boolean;
};

type CommitsGrouped = {
  [date: string]: Commit[];
};

function getRetroBadge(type: string) {
  const base = "text-xs px-2 py-1 rounded-md font-semibold inline-flex items-center gap-1";
  switch (type) {
    case "Analizando":
      return <span className={`${base} bg-[#30363d]`}><Settings size={14} /> Analizando</span>;
    case "Con retro":
      return <span className={`${base} bg-green-600`}><CheckCircle size={14} /> Con retro</span>;
    case "Sin cambios":
      return <span className={`${base} bg-yellow-700`}><GitCommitHorizontal size={14} /> Sin cambios</span>;
    default:
      return null;
  }
}

export default function Commits() {
  const [branch, setBranch] = useState("main");
  const [commitsGrouped, setCommitsGrouped] = useState<CommitsGrouped>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [branches] = useState(["main", "Paradise"]);


  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/commits?branch=${branch}`);
        const data = await res.json();
        setCommitsGrouped(data);
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };
    fetchCommits();
  }, [branch]);

  return (
    <div className="px-6 py-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Commits</h1>

      <div className="flex gap-3 mb-6">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#1c2128] text-sm px-4 py-2 rounded-md border border-[#30363d] flex items-center gap-2"
          >
            <GitBranch size={16} />
            {branch}
            <span className="text-gray-400">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute z-50 mt-2 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-lg">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a branch..."
                className="bg-[#0d1117] text-white px-3 py-2 w-full text-sm border-b border-[#30363d] outline-none"
              />
              <div className="text-xs uppercase text-gray-400 px-3 pt-2 pb-1">Branches</div>
              <ul className="max-h-60 overflow-y-auto">
                {branches
                  .filter((b) => b.toLowerCase().includes(search.toLowerCase()))
                  .map((b) => (
                    <li
                      key={b}
                      onClick={() => {
                        setBranch(b);
                        setShowDropdown(false);
                      }}
                      className={`px-3 py-2 text-sm text-white hover:bg-[#21262d] cursor-pointer flex justify-between items-center ${
                        b === branch ? "bg-[#0d1117] font-semibold" : ""
                      }`}
                    >
                      {b}
                      {b === "main" && (
                        <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded-full">default</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {Object.entries(commitsGrouped).map(([date, commits]) => (
          <div key={date}>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-semibold mb-2">
              <GitCommitHorizontal size={16} /> Commits on {date}
            </div>

            <div className="border-l-[2px] border-[#30363d] pl-4 space-y-3 relative">
              {commits.map((commit, index) => (
                <div
                  key={index}
                  className="bg-[#0d1117] p-4 rounded-md border border-[#30363d] text-sm flex justify-between items-start"
                >
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <p className="text-white font-semibold leading-snug hover:text-blue-400 transition cursor-pointer text-lg">
                      <Link to="/CommitFeedback">
                        {commit.message.includes("http") ? (
                          <>
                            Merge branch 'main' of{" "}
                            <a
                              href="https://github.com/RodrigoGarciaT/CodeMahindra"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 underline"
                            >
                              GitHub
                            </a>
                          </>
                        ) : (
                          commit.message
                        )}
                      </Link>
                    </p>
                    <p className="text-gray-400 text-xs">
                      <span className="text-green-400 font-medium">{commit.author}</span> committed {commit.date}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">{getRetroBadge(commit.retro)}</div>
                    <div className="flex items-center gap-2 text-gray-400">
                      {commit.verified && (
                        <span className="bg-[#238636] text-white text-[10px] px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                          <CheckCircle size={12} strokeWidth={2.5} className="text-white" />
                          Verified
                        </span>
                      )}
                      <Link
                        to="/CommitFeedback"
                        className="text-gray-300 text-xs px-2 py-1 rounded-md hover:bg-[#30363d] transition-colors font-mono"
                      >
                        {commit.hash}
                      </Link>
                      <Link2 size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
