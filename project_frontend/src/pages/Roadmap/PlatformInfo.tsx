import React, { useEffect, useRef, useState } from "react";
import { infoPlatforms } from "./data/infoPlatforms";

interface Platform {
  id: string;
  label: string;
  image: string;
  width?: number;
}

interface Props {
  platform: Platform;
  onClose: () => void;
  setDraggingEnabled?: (enabled: boolean) => void; // ← nueva prop
  setZoomEnabled?: (enabled: boolean) => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const getImage = (name: string) =>
  new URL(`../../images/platforms/${name}`, import.meta.url).href;

const PlatformInfo: React.FC<Props> = ({ platform, onClose, setDraggingEnabled, setZoomEnabled }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState(480);
  const [resizing, setResizing] = useState(false);

  const info = infoPlatforms.find(p => p.id === platform.id);

  const handleMouseMoveSidebar = (e: MouseEvent) => {
    if (resizing && sidebarRef.current) {
      const newWidth = window.innerWidth - e.clientX;
      setSidebarWidth(clamp(newWidth, 500, 1000));
    }
  };

  const handleMouseUpSidebar = () => setResizing(false);

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleMouseMoveSidebar);
      window.addEventListener("mouseup", handleMouseUpSidebar);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveSidebar);
      window.removeEventListener("mouseup", handleMouseUpSidebar);
    };
  }, [resizing]);

  return (
    <div
    ref={sidebarRef}
    onMouseEnter={() => {
        setDraggingEnabled?.(false);
        setZoomEnabled?.(false); // ✅ desactiva el zoom
    }}
    onMouseLeave={() => {
        setDraggingEnabled?.(true);
        setZoomEnabled?.(true);
    }}
      
    className="fixed right-0 top-0 h-full z-50 flex flex-col backdrop-blur-md transition-all border-l border-red-500"
    style={{
        width: sidebarWidth,
        background: "linear-gradient(to top, rgba(10,10,20,0.95), rgba(20,20,30,0.95))",
        boxShadow: "0 0 25px rgba(227, 24, 55, 0.5)",
    }}
    >
        <div className="absolute top-4 right-4 z-50">
            <button
                onClick={() => {
                onClose();
                setDraggingEnabled?.(true);
                setZoomEnabled?.(true);
                }}
                className="text-white text-xl hover:text-red-400 transition-colors duration-200"
                title="Cerrar"
            >
                ✖
            </button>
        </div>

      <div
        className="absolute left-0 top-0 h-full w-2 cursor-col-resize z-50"
        onMouseDown={() => setResizing(true)}
        style={{ backgroundColor: "rgba(227,24,55,0.15)" }}
      />

      <div className="p-6 overflow-y-auto text-white h-full flex flex-col space-y-6">
        <h2 className="text-3xl font-extrabold text-red-400 drop-shadow-[0_0_8px_rgba(255,0,70,0.6)]">
          🚀 {platform.label}
        </h2>

        <img
          src={getImage(platform.image)}
          alt={platform.label}
          className="w-full max-h-52 object-contain rounded-xl border border-red-600 shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
        />

        <p className="text-base text-gray-300 leading-relaxed">
          {info?.description}
        </p>

        {info?.explanation && (
          <div className="space-y-3 text-sm">
            <h3 className="text-xl text-red-400 font-semibold">🧠 Explanation</h3>
            <div className="space-y-1 text-gray-300">
              <p><span className="font-semibold text-white">🔍 What is it?</span> {info.explanation.what_is_it}</p>
              <p><span className="font-semibold text-white">🎯 Why is it important?</span> {info.explanation.why_is_it_important}</p>
              <p><span className="font-semibold text-white">🌐 Analogy:</span> {info.explanation.real_world_analogy}</p>
            </div>
          </div>
        )}

        {info?.implementations?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">💻 Implementations</h3>
            <div className="space-y-2 text-sm text-gray-300">
              {info.implementations.map((impl, i) => (
                <div key={i}>
                  <p className="font-semibold text-white">{impl.language}</p>
                  <pre className="bg-black/40 p-3 rounded-md overflow-x-auto text-xs whitespace-pre-wrap">
                    <code>{impl.snippet}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {info?.leetcode_problems?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">📘 LeetCode Problems</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {info.leetcode_problems.map((p, i) => (
                <li key={i}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {p.title} ({p.difficulty})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {info?.videos?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">🎥 Videos</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {info.videos.map((v, i) => (
                <li key={i}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {v.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {info?.resources?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">📚 Resources</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {info.resources.map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {info?.tips?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">💡 Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {info.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        ) : null}

        {info?.common_mistakes?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">⚠️ Common Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {info.common_mistakes.map((mistake, i) => <li key={i}>{mistake}</li>)}
            </ul>
          </div>
        ) : null}

        {info?.extra_examples?.length ? (
          <div>
            <h3 className="text-xl text-red-400 font-semibold mb-2">🧪 Extra Examples</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {info.extra_examples.map((ex, i) => (
                <div key={i}>
                  <p className="font-semibold text-white">{ex.title} ({ex.language})</p>
                  <pre className="bg-black/40 p-3 rounded-md overflow-x-auto text-xs whitespace-pre-wrap">
                    <code>{ex.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-6">
          <button
            onClick={() => {
                onClose();                  // Cierra el panel
                setDraggingEnabled?.(true); // Reactiva el arrastre
                setZoomEnabled?.(true);     // Reactiva el zoom
            }}              
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-700 text-white py-2 rounded-xl shadow-lg hover:shadow-red-600/50 transition-all"
          >
            ✖ Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformInfo;