// src/pages/CodeDashboard.tsx
import {
  Flag,
  Bot,
  ExternalLink,
  BookOpenCheck,
  FileCode2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const qualityData = [
  { name: "Día 1", value: 6 },
  { name: "Día 2", value: 6.5 },
  { name: "Día 3", value: 7 },
  { name: "Día 4", value: 7.3 },
  { name: "Día 5", value: 7.1 },
  { name: "Día 6", value: 7.6 },
  { name: "Día 7", value: 8 }
];

export default function CodeDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Métricas */}
      <div className="col-span-2 grid grid-cols-3 gap-4">
        <div className="bg-[#161b22] p-4 rounded-lg text-center">
          <p className="text-red-500 text-3xl font-bold">8 / 11</p>
          <p className="text-sm text-gray-400 mt-1">Pull Requests</p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg text-center">
          <p className="text-white text-2xl font-bold">7.5</p>
          <p className="text-sm text-gray-400 mt-1">Calidad promedio</p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg text-center">
          <p className="text-white text-2xl font-bold">3</p>
          <p className="text-sm text-gray-400 mt-1">Reviewers</p>
        </div>

        {/* Gráfica */}
        <div className="col-span-3 bg-[#161b22] p-4 rounded-lg">
          <h3 className="text-sm text-gray-300 mb-2 font-semibold">Pull Request Quality Over Time</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={qualityData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PRs recientes */}
        <div className="col-span-3 bg-[#161b22] p-4 rounded-lg">
          <h3 className="text-sm text-gray-300 mb-2 font-semibold">PR requests recientes</h3>
          <div className="divide-y divide-gray-700 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-white">auth.js</span>
              <span className="text-gray-400">sin cambios</span>
              <span className="text-yellow-500 flex items-center gap-1">
                <Flag size={14} /> Hace 1 día
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-white">app.js</span>
              <span className="text-gray-400">sin cambios</span>
              <span className="text-yellow-500 flex items-center gap-1">
                <Flag size={14} /> Hace 2 días
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-white">routes/api.js</span>
              <span className="text-gray-400">sin cambios</span>
              <span className="text-yellow-500 flex items-center gap-1">
                <Flag size={14} /> Hace 3 días
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel lateral derecho */}
      <div className="flex flex-col gap-6">
        {/* Recomendación IA */}
        <div className="bg-[#161b22] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-red-400 font-semibold">
            <Bot size={20} /> Recomendación
          </div>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>Inspeccionar con cuidado los "early returns"</li>
            <li>Intentar aplicar fijos funciones largas</li>
          </ul>
        </div>

        {/* Recursos recomendados */}
        <div className="bg-[#161b22] p-4 rounded-lg">
          <h3 className="text-white text-sm font-semibold mb-3">Recursos recomendados</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <button className="bg-red-600 hover:bg-red-700 p-2 rounded flex items-center gap-2 justify-center text-white">
              <BookOpenCheck size={16} />
              Refactoring Fundamentals
            </button>
            <button className="bg-red-600 hover:bg-red-700 p-2 rounded flex items-center gap-2 justify-center text-white">
              <ExternalLink size={16} />
              Curso recomendados
            </button>
            <button className="bg-red-600 hover:bg-red-700 p-2 rounded flex items-center gap-2 justify-center text-white col-span-2">
              <FileCode2 size={16} />
              Clean Code in JavaScript
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Curso interactivo sobre revisiones de código
          </p>
        </div>
      </div>
    </div>
  );
}
