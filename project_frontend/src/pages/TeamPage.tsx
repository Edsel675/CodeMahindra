import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { useParams } from "react-router-dom";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { useState, useEffect } from 'react';


const lineChartData = [
  { name: 'Jan 2024', value: 1200 },
  { name: 'Apr 2024', value: 1600 },
  { name: 'Jul 2024', value: 1550 },
  { name: 'Oct 2024', value: 1700 },
  { name: 'Jan 2025', value: 1800 },
  { name: 'Apr 2025', value: 2000 },
  { name: 'Jul 2025', value: 2200 },
  { name: 'Oct 2025', value: 2400 },
];

// Datos para las tres gráficas separadas, una por dificultad
const barChartData = [
  { name: 'Easy', value: 45, color: '#28a745' },  // Verde para dificultad baja
  { name: 'Medium', value: 30, color: '#fd7e14' },  // Naranja para dificultad media
  { name: 'High', value: 50, color: '#dc3545' },  // Rojo para dificultad alta
];

function ProfileAndTeamPage() {
  const navigate = useNavigate();
  const { teamId } = useParams();

  if (!teamId) {
    return <div className="text-white p-8">No se proporcionó teamId en la URL.</div>;
  }

  type TeamMember = {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    coins?: number;
    level?: number;
    experience?: number;
  };

  const { members, loading } = useTeamMembers(teamId || "") as {
    members: TeamMember[];
    loading: boolean;
  };

  const [teamInfo, setTeamInfo] = useState<{ name: string; level: number; experience: number; code: string; } | null>(null);
  
  useEffect(() => {
    const fetchTeamInfo = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams/${teamId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al cargar la información del equipo");
        const data = await res.json();
        setTeamInfo(data);
      } catch (err) {
        console.error("Error obteniendo el equipo:", err);
      }
    };

    if (teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  const leaveTeam = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams/${teamId}/leave`, {
        method: "POST", // o "DELETE" dependiendo de tu backend
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No se pudo salir del equipo");

      // Redireccionar después de salir
      navigate("/home");
    } catch (error) {
      console.error("Error al salir del equipo:", error);
      alert("Hubo un error al intentar salir del equipo.");
    }
  };


  console.log("Renderizando TeamPage", { teamId, members });

  return (
    <div className="min-h-screen bg-[#363B41]"> {/* Fondo gris para toda la página */}
      <div className="max-w-7xl mx-auto p-6 text-gray-900">
        {/* Botón Volver con fondo blanco y texto negro */}
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 p-2 rounded-md mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="mb-8">
          {/* Cambié el color de la palabra "Perfil" a blanco */}
          <h1 className="text-2xl font-bold mb-6 text-white">Equipo</h1> {/* Se puede cambiar a "Equipo" en la otra pantalla */}
          
          {/* Recuadro de equipo */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">{teamInfo?.name ?? "Nombre del equipo"}</h2>
            {teamInfo?.code && (
                <div className="text-sm text-gray-500 mb-2">
                  Código del equipo: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{teamInfo.code}</span>
                </div>
              )}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Nivel del equipo: {teamInfo?.level ?? "?"}</span>
                <span>Experiencia del equipo: {teamInfo?.experience ?? "?"} XP</span>
              </div>
              <div className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: teamInfo ? `${(teamInfo.experience % 1000) / 10}%` : '0%', // Ajusta esta fórmula si necesitas otra lógica
                  }}
                ></div>
            </div>

            {/* Tabla de equipo */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Miembro</th>
                    <th className="px-4 py-2 text-left">XP</th>
                    <th className="px-4 py-2 text-left">Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">Cargando...</td>
                    </tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">No hay miembros en este equipo.</td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id}>
                        <td className="border px-4 py-2 flex items-center gap-2">
                          {member.profilePicture && (
                            <img src={member.profilePicture} alt="foto" className="w-6 h-6 rounded-full" />
                          )}
                          {member.firstName} {member.lastName}
                        </td>
                        <td className="border px-4 py-2">{member.experience ?? 0}</td>
                        <td className="border px-4 py-2">Nivel {member.level ?? 1}</td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>

          {/* Recuadro de la gráfica de líneas */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Progreso a lo largo del tiempo</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recuadro para las tres gráficas de barras alineadas horizontalmente */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Clasificación por dificultad</h2>

            {/* Contenedor para las tres gráficas en el mismo nivel */}
            <div className="flex justify-between">
              {/* Gráfica para Easy */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[barChartData[0]]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={barChartData[0].color} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfica para Medium */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[barChartData[1]]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={barChartData[1].color} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfica para High */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[barChartData[2]]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={barChartData[2].color} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              const confirmLeave = window.confirm("¿Estás seguro de que quieres salir del equipo?");
              if (confirmLeave) {
                leaveTeam();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Salir del equipo
          </button>

        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAndTeamPage;


