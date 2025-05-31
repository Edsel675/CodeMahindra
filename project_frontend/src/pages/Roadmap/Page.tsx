import React, { useRef, useState, useEffect } from "react";
import SpaceBackground from "./SpaceBackground";
import { edges } from "./data/edges";
import { nodes } from "./data/nodes";
import FloatingBot from "./FloatingBot";
import PlatformInfo from "./PlatformInfo";

const getImage = (name: string) =>
  new URL(`../../images/platforms/${name}`, import.meta.url).href;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const Roadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const [dimensions, setDimensions] = useState({ width: 1200, height: 1200 });

  const [selectedNode, setSelectedNode] = useState<typeof nodes[0] | null>(null);
  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const [zoomEnabled, setZoomEnabled] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
  
    const { clientWidth, clientHeight } = containerRef.current;
  
    const width = clientWidth * 2;
    const height = clientHeight * 2;
    setDimensions({ width, height });
  
    const arraysNode = nodes.find((n) => n.id === "arrays");
    if (!arraysNode) return;
  
    const nodeCoords = {
      x: (arraysNode.left / 100) * width,
      y: (arraysNode.top / 100) * height,
    };
  
    const centerX = clientWidth / 2 - nodeCoords.x;
    const centerY = clientHeight / 2 - nodeCoords.y - 250;
  
    setOffset({ x: centerX, y: centerY });
  }, []);

  const getCoords = (percentX: number, percentY: number) => ({
    x: (percentX / 100) * dimensions.width,
    y: (percentY / 100) * dimensions.height,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggingEnabled) return; // ✅ se bloquea si no está permitido
    const newX = e.clientX - startDrag.x;
    const newY = e.clientY - startDrag.y;
    setOffset({ x: newX, y: newY });
  };  

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (!zoomEnabled) return; // 🚫 bloquea zoom si está dentro del panel
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = clamp(zoom + delta, 0.2, 2.5);

    const scaleChange = newZoom / zoom;

    const newOffsetX = mouseX - (mouseX - offset.x) * scaleChange;
    const newOffsetY = mouseY - (mouseY - offset.y) * scaleChange;

    setZoom(newZoom);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const focusOnNode = (nodeId: string, targetZoom = 1.8) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !containerRef.current) return;
  
    const { clientWidth, clientHeight } = containerRef.current;
  
    const nodeCoords = getCoords(node.left, node.top);
  
    const newOffsetX = clientWidth / 2 - nodeCoords.x * targetZoom;
    const newOffsetY = clientHeight / 2 - nodeCoords.y * targetZoom - 100;
  
    setZoom(targetZoom);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };  

  return (
    <>
      <style>
        {`@keyframes floatTilt {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-4px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float-tilt {
            animation: floatTilt 3s ease-in-out infinite;
          }

          @keyframes dashFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }

          .animated-line {
            stroke: #f47174;
            stroke-width: 2.5;
            stroke-linecap: round;
            stroke-dasharray: 10 6;
            stroke-dashoffset: 100;
            animation: dashFlow 1.2s linear infinite;
            filter: url(#red-glow);
            fill: none;
          }

          .edge-particle {
            fill: #ffffff;
            r: 3;
          }

          .edge-particle.animate {
            animation: pulseSize 1.2s ease-in-out infinite;
          }

          @keyframes pulseSize {
            0%, 100% { r: 3; opacity: 0.7; }
            50% { r: 5; opacity: 1; }
          }
        `}
      </style>
      <div
        ref={containerRef}
        className={`relative w-full h-[calc(100vh-64px)] overflow-hidden select-none ${
          draggingEnabled ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
        }`}        
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {selectedNode && (
          <PlatformInfo
            platform={selectedNode}
            onClose={() => setSelectedNode(null)}
            setDraggingEnabled={setDraggingEnabled}
            setZoomEnabled={setZoomEnabled} // ✅ nuevo
          />
        )}

        <div className="absolute inset-0 bg-[#FFEBEB] z-0" />
        <div className="absolute inset-0 z-10">
          <SpaceBackground />
        </div>

        <div className="relative z-30 w-full h-full p-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-6">
            Roadmap 🚀
          </h1>

          <div
            style={{
              width: dimensions.width,
              height: dimensions.height,
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transformOrigin: "top left",
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: dimensions.width,
                height: dimensions.height,
                overflow: 'visible',
                zIndex: 0,
              }}
            >

            <defs>
              <filter id="red-glow" height="300%" width="300%" x="-75%" y="-75%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#E31837" />
              </filter>
            </defs>

              {edges.map(([from, to], idx) => {
                const fromNode = nodes.find((n) => n.id === from)!;
                const toNode = nodes.find((n) => n.id === to)!;
                const { x: x1, y: y1 } = getCoords(fromNode.left, fromNode.top);
                const { x: x2, y: y2 } = getCoords(toNode.left, toNode.top);
                return (
                  <g key={idx}>
                    <path
                      id={`edge-${idx}`}
                      d={`M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`}
                      className="animated-line"
                    />
                    <circle className="edge-particle animate">
                      <animateMotion dur="2.5s" repeatCount="indefinite" rotate="auto">
                        <mpath xlinkHref={`#edge-${idx}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}
            </svg>

            <FloatingBot/>

            <div
              className="relative"
              style={{ width: dimensions.width, height: dimensions.height }}
            >
              {nodes.map((node) => {
                const { x, y } = getCoords(node.left, node.top);
                return (
                  <div
                    key={node.id}
                    className="absolute flex flex-col items-center text-white text-sm font-bold"
                    style={{
                      top: y,
                      left: x,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <button
                      onClick={() => {
                        focusOnNode(node.id);
                        setSelectedNode(node);
                      }}                      
                      className="flex flex-col items-center text-white text-sm font-bold focus:outline-none transform transition duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_8px_#E31837] active:scale-95"
                    >
                      <span className="mb-2 bg-black/70 px-3 py-1 rounded shadow-md transition-all duration-300 text-center">
                        {node.label}
                      </span>
                      <img
                        src={getImage(node.image)}
                        alt={node.label}
                        style={{
                          width: node.width ? `${node.width}px` : "144px",
                          height: "auto",
                        }}
                        className="object-contain drop-shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-[1deg] hover:-translate-y-1 hover:drop-shadow-[0_0_4px_rgba(255,0,60,0.4)] animate-float-tilt"
                        draggable={false}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
