import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setError("El nombre del equipo no puede estar vacío.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams/create-and-assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: teamName,
          creationDate: new Date().toISOString(),
          terminationDate: null,
          experience: 0,
          level: 1,
        }),
      });

      if (!res.ok) throw new Error("No se pudo crear y asignar el equipo");

      const team = await res.json();
      navigate(`/team/${team.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Crear nuevo equipo</h2>
        <input
          type="text"
          placeholder="Nombre del equipo"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleCreateTeam}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Crear equipo
        </button>
      </div>
    </div>
  );
}
