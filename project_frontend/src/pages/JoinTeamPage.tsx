import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinTeamPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ team_code: code  }), // 👈 ENVÍA el código en el body
      });

      if (!res.ok) {
        const data = await res.json();
        console.log("Respuesta del backend:", data); // 🐞 DEBUG
        throw new Error(data.detail || "Error al unirse al equipo");
      }

      setSuccess("¡Te has unido exitosamente al equipo!");
      setTimeout(() => navigate("/home"), 1500); // redirige después de 1.5s
    } catch (err: any) {
      setError(err?.message || JSON.stringify(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Unirse a un equipo</h2>
        
        <input
          type="text"
          placeholder="Código del equipo"
          className="w-full p-2 border rounded mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2 text-center">{success}</p>}

        <button
          onClick={handleJoin}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Unirse
        </button>
      </div>
    </div>
  );
}
