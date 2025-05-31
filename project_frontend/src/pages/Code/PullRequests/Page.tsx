import { useEffect, useState } from "react";

import {
  GitPullRequest,
  Settings,
  CheckCircle,
  GitCommitHorizontal,
  MessageSquare
} from "lucide-react";

const pullRequests = [
  {
    title: "Changes",
    number: 25,
    author: "David-A00882350",
    date: "closed 2 days ago",
    retro: "Analizando",
    comments: 1
  },
  {
    title: "Saul branch veracruzito ❌",
    number: 24,
    author: "Saul0Delgado",
    date: "merged 3 days ago",
    retro: "Con retro",
    comments: 1
  },
  {
    title: "Actualización de EditProfile ✔",
    number: 13,
    author: "Saul0Delgado",
    date: "merged last month",
    retro: "Sin cambios",
    comments: 1
  },
  {
    title: "Saul badges4",
    number: 12,
    author: "Saul0Delgado",
    date: "merged 27 days ago",
    retro: "Analizando",
    comments: 1
  },
  {
    title: "Te amo Rodrigo García <3",
    number: 11,
    author: "Saul0Delgado",
    date: "merged 27 days ago",
    retro: "Con retro",
    comments: 1
  },
  {
    title: "David X",
    number: 10,
    author: "RodrigoGarciaT",
    date: "merged on Mar 29",
    retro: "Sin cambios",
    comments: 1
  },
  {
    title: "enofniwiuqcb",
    number: 9,
    author: "RodrigoGarciaT",
    date: "merged on Mar 29",
    retro: "Analizando",
    comments: 2
  },
  {
    title: "updated navbar ❌",
    number: 8,
    author: "RodrigoGarciaT",
    date: "merged on Mar 28",
    retro: "Con retro",
    comments: 1
  },
  {
    title: "Added ProblemList ✔",
    number: 7,
    author: "RodrigoGarciaT",
    date: "merged on Mar 28",
    retro: "Sin cambios",
    comments: 1
  }
];

interface PullRequest {
  title: string;
  number: number;
  author: string;
  date: string;
  retro: string;
  comments: number;
}

function RetroBadge({ retro }: { retro: string }) {
  const common = "px-2 py-1 rounded-md text-xs font-medium inline-flex items-center gap-1";
  switch (retro) {
    case "Analizando":
      return <span className={`${common} bg-[#30363d]`}><Settings size={14} /> Analizando</span>;
    case "Con retro":
      return <span className={`${common} bg-green-700`}><CheckCircle size={14} /> Con retro</span>;
    case "Sin cambios":
      return <span className={`${common} bg-yellow-600`}><GitCommitHorizontal size={14} /> Sin cambios</span>;
    default:
      return null;
  }
}

export default function PullRequests() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/pull-requests");
        const data = await res.json();
        setPullRequests(data);
      } catch (error) {
        console.error("Error fetching pull requests:", error);
      }
    };

    fetchPRs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pull Requests</h1>

      <div className="space-y-3">
        {pullRequests.map((pr, index) => (
          <div
            key={index}
            className="bg-[#161b22] p-4 rounded-md border border-[#30363d] text-sm flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold flex items-center gap-2">
                <GitPullRequest size={16} className="text-purple-400" />
                {pr.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                #{pr.number} by {pr.author} was {pr.date}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <RetroBadge retro={pr.retro} />
              <div className="flex items-center gap-1 text-gray-400">
                <MessageSquare size={14} />
                <span className="text-xs">{pr.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
