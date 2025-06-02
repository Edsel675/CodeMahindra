import {
  ArrowLeft,
  CalendarDays,
  User,
  GitBranch,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import DetailsSection from "./DetailsSection";
import CommitRecommendedResources from "./CommitRecommendedResources";
import CommitSummary from "./CommitSummary";
import { useNavigate } from "react-router-dom";

type CommitFeedbackData = {
  title: string;
  date: string;
  author: string;
  branch: string;
  quality: string;
  summary: string;
};

const mockFeedback: CommitFeedbackData = {
  title: "Refactor Auth Flow",
  date: "May 27, 2025",
  author: "ReyliCruz",
  branch: "main",
  quality: "8.2/10",
  summary: `Este código está horrible, tiene memory leaks, mezcla lenguaje python con Cobol y C++. Despidan a quien programó esta cosa. XD XD XD dosakndjsakkkkkkkkkkkkkkkkdnkjq kjidnwjknqdjknwkjqndkjwnkqdjwnkjdnjwkqnjkdnjk
BLA BLA BLA MUCHO TEXTO ahhhhhhhhhhhh hhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhh hhhhhhhhhhhhhhh
Recomendaciones que te doy, sisisis probando probando 1 2 3 1 2 3 probando ahhhhh hhhhhhhhhhhhhhhhi
Más texto. SIUUUUUU UUUUUUUUUUUUUU UUUUUUUUU UUUUUUUU UUUUUU UUUUUUUU`,
};

export default function CommitFeedback() {
  const [data, setData] = useState<CommitFeedbackData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(mockFeedback);
  }, []);

  if (!data) return null;

  return (
    <div className="w-full bg-[#0d1117] text-white px-4 md:px-10 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ArrowLeft
            size={20}
            className="cursor-pointer text-white hover:text-blue-400 transition"
            onClick={() => navigate("/commits")}
          />
          <h1 className="text-xl font-bold">{data.title}</h1>
        </div>
        <div className="flex items-center flex-wrap gap-4 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} /> {data.date}
          </div>
          <div className="flex items-center gap-1">
            <User size={16} /> {data.author}
          </div>
          <div className="flex items-center gap-1">
            <GitBranch size={16} /> {data.branch}
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} /> <span className="font-semibold">Quality:</span> {data.quality}
          </div>
        </div>
      </div>

      <h2 className="text-red-500 font-semibold text-sm mb-3 mt-10">Summary</h2>
      <CommitSummary summary={data.summary} />

      <h2 className="text-red-500 font-semibold text-sm mb-3 mt-10">Details</h2>
      <DetailsSection/>

      <h2 className="text-red-500 font-semibold text-sm mb-3 mt-10">Recommended Rosources</h2>
      <CommitRecommendedResources/>

    </div>
  );
}
