import { useEffect, useState } from "react";
import {
  GitPullRequest,
  GitMerge,
  XCircle,
  MessageSquare,
  Settings,
  CheckCircle,
  GitCommitHorizontal,
  CheckIcon
} from "lucide-react";

interface PullRequest {
  title: string;
  number: number;
  author: string;
  date: string;
  retro: string;
  comments: number;
  status: "open" | "closed" | "merged";
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

function PullRequestItem({ pr }: { pr: PullRequest }) {
  return (
    <div className="px-4 py-3 flex justify-between items-center hover:bg-[#161b22] transition">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-white font-semibold">
          {pr.status === "open" && <GitPullRequest className="text-green-500" size={16} />}
          {pr.status === "merged" && <GitMerge className="text-purple-500" size={16} />}
          {pr.status === "closed" && <XCircle className="text-red-500" size={16} />}
          {pr.title}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          #{pr.number} by {pr.author} was {pr.date}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <RetroBadge retro={pr.retro} />
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <MessageSquare size={14} />
          {pr.comments}
        </div>
      </div>
    </div>
  );
}

export default function PullRequests() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");

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

  const openPRs = pullRequests.filter(pr => pr.status === "open");
  const closedPRs = pullRequests.filter(pr => pr.status === "closed" || pr.status === "merged");
  const visiblePRs = activeTab === "open" ? openPRs : closedPRs;

  return (
    <div className="px-6 py-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Pull Requests</h1>

      {/* GitHub-style tabs */}
      <div className="flex items-center gap-6 text-sm mb-6">
        <button
          onClick={() => setActiveTab("open")}
          className={`flex items-center gap-2 ${
            activeTab === "open" ? "text-white" : "text-gray-400"
          }`}
        >
          <GitPullRequest size={16} />
          <span className="font-medium">{openPRs.length} Open</span>
        </button>

        <button
          onClick={() => setActiveTab("closed")}
          className={`flex items-center gap-2 ${
            activeTab === "closed" ? "text-white" : "text-gray-400"
          }`}
        >
          <CheckIcon size={16} />
          <span className="font-medium">{closedPRs.length} Closed</span>
        </button>
      </div>

      {/* PR list */}
      <div className="divide-y divide-[#30363d] border border-[#30363d] rounded-md">
        {visiblePRs.length > 0 ? (
          visiblePRs.map((pr, index) => (
            <PullRequestItem key={`${activeTab}-${index}`} pr={pr} />
          ))
        ) : (
          <p className="px-4 py-6 text-center text-gray-400">No pull requests found.</p>
        )}
      </div>
    </div>
  );
}
