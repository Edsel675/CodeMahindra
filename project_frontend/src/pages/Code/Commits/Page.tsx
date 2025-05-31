import { useState, useEffect } from "react";
import {
  GitCommitHorizontal,
  CheckCircle,
  Settings,
  User,
  Calendar,
  Link2
} from "lucide-react";

const commitsGroupedTest = {
  "May 27, 2025": [
    {
      message: "Merge branch 'main' of https://github.com/RodrigoGarciaT/CodeMahindra",
      author: "ReyliCruz",
      date: "yesterday",
      retro: "Analizando",
      hash: "bc3988c",
      verified: false
    },
    {
      message: "Hola",
      author: "ReyliCruz",
      date: "yesterday",
      retro: "Con retro",
      hash: "818f0f7",
      verified: false
    },
    {
      message: "Rename Laptop.png to laptop.png",
      author: "ReyliCruz",
      date: "yesterday",
      retro: "Sin cambios",
      hash: "bb86f5c",
      verified: true
    },
    {
      message: "New Landing Page Desing",
      author: "ReyliCruz",
      date: "yesterday",
      retro: "Analizando",
      hash: "8690313",
      verified: false
    },
    {
      message: "New Landing Page Desing",
      author: "ReyliCruz",
      date: "yesterday",
      retro: "Con retro",
      hash: "8451871",
      verified: false
    },
    {
      message: "New Landing Page Desing",
      author: "ReyliCruz",
      date: "yesterday",
      retro: "Sin cambios",
      hash: "ef5df65",
      verified: false
    }
  ],
  "May 26, 2025": [
    {
      message: "Update EditProfile.tsx",
      author: "Saul0Delgado",
      date: "2 days ago",
      retro: "Analizando",
      hash: "42aa04a",
      verified: false
    }
  ]
};

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
  const commonClasses =
    "px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1";
  switch (type) {
    case "Analizando":
      return <span className={`${commonClasses} bg-[#30363d]`}><Settings size={14} /> Analizando</span>;
    case "Con retro":
      return <span className={`${commonClasses} bg-green-700`}><CheckCircle size={14} /> Con retro</span>;
    case "Sin cambios":
      return <span className={`${commonClasses} bg-yellow-700`}><GitCommitHorizontal size={14} /> Sin cambios</span>;
    default:
      return null;
  }
}

export default function Commits() {
  const [branch] = useState("main");

  const [commitsGrouped, setCommitsGrouped] = useState<CommitsGrouped>({});

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/commits");
        const data = await res.json();
        setCommitsGrouped(data);
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Commits</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <button className="bg-[#1c2128] text-sm px-4 py-2 rounded-md border border-[#30363d] flex items-center gap-2">
          <GitCommitHorizontal size={16} />
          {branch}
        </button>
        <button className="bg-[#1c2128] text-sm px-4 py-2 rounded-md border border-[#30363d] flex items-center gap-2">
          <User size={16} /> All users
        </button>
        <button className="bg-[#1c2128] text-sm px-4 py-2 rounded-md border border-[#30363d] flex items-center gap-2">
          <Calendar size={16} /> All time
        </button>
      </div>

      {/* Commits por fecha */}
      <div className="space-y-6">
        {Object.entries(commitsGrouped).map(([date, commits]) => (
          <div key={date}>
            <h2 className="text-sm text-gray-400 font-semibold mb-2">Commits on {date}</h2>
            <div className="space-y-3">
              {commits.map((commit: Commit, index) => (
                <div
                  key={index}
                  className="bg-[#161b22] p-4 rounded-md border border-[#30363d] text-sm"
                >
                  <p className="text-white font-medium">
                    {commit.message.includes("http") ? (
                      <>
                        Merge branch 'main' of{" "}
                        <a
                          href="https://github.com/RodrigoGarciaT/CodeMahindra"
                          className="text-blue-400 underline"
                        >
                          https://github.com/RodrigoGarciaT/CodeMahindra
                        </a>
                      </>
                    ) : (
                      commit.message
                    )}
                  </p>
                  <div className="text-gray-400 text-xs mt-1">
                    {commit.author} committed {commit.date}
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      {getRetroBadge(commit.retro)}
                      {commit.verified && (
                        <span className="bg-green-600 text-xs px-2 py-0.5 rounded-md">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      {commit.hash}
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
