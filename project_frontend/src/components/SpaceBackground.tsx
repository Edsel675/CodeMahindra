import React, { useEffect, useRef } from "react";

const SpaceBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const launchComet = () => {
    if (!backgroundRef.current) return;

    const comet = document.createElement("div");
    comet.className = "comet";

    const startTop = Math.random() * backgroundRef.current.clientHeight * 0.5;
    const startLeft = Math.random() * backgroundRef.current.clientWidth * 0.5;

    comet.style.top = `${startTop}px`;
    comet.style.left = `${startLeft}px`;

    backgroundRef.current.appendChild(comet);

    setTimeout(() => {
      comet.remove();
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      launchComet();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        ref={backgroundRef}
        className="w-full h-full overflow-hidden z-0 opacity-[0.95] relative"
      >
        {/* Fondo de estrellas */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundColor: "#000",
            backgroundImage: "url('https://i.imgur.com/YKY28eT.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "top center",
          }}
        />

        {/* Estrellas parpadeantes */}
        <div
          className="absolute inset-0 w-full h-full z-10 twinkling"
          style={{
            backgroundImage: "url('https://i.imgur.com/XYMF4ca.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "top center",
          }}
        />

        {/* Nubes */}
        <div
          className="absolute inset-0 w-full h-full z-20 clouds"
          style={{
            backgroundImage: "url('https://i.imgur.com/mHbScrQ.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      <style>{`
        @keyframes move-twink-back {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }

        @keyframes move-clouds-back {
          from { background-position: 0 0; }
          to { background-position: 10000px 0; }
        }

        .twinkling {
          animation: move-twink-back 200s linear infinite;
        }

        .clouds {
          animation: move-clouds-back 200s linear infinite;
        }

        .comet {
          position: absolute;
          width: 80px;
          height: 2px;
          background: linear-gradient(270deg, #ffffff, transparent);
          opacity: 0.8;
          transform: rotate(45deg);
          z-index: 30;
          pointer-events: none;
          animation: cometTrail 3s ease-out forwards;
        }

        @keyframes cometTrail {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(400px, 400px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default SpaceBackground;
