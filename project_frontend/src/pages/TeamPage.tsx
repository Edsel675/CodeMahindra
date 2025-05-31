import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';

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
          <h1 className="text-2xl font-bold mb-6 text-white">Perfil</h1> {/* Se puede cambiar a "Equipo" en la otra pantalla */}
          
          {/* Recuadro de equipo */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Los fieles y Edsel</h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Nivel 5</span>
                <span>9462 exp</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            {/* Tabla de equipo */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Miembro</th>
                    <th className="px-4 py-2 text-left">Puntos</th>
                    <th className="px-4 py-2 text-left">Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Davis Curtis</td>
                    <td className="border px-4 py-2">9462</td>
                    <td className="border px-4 py-2">Nivel 5</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Davis Curtis</td>
                    <td className="border px-4 py-2">9462</td>
                    <td className="border px-4 py-2">Nivel 5</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Davis Curtis</td>
                    <td className="border px-4 py-2">9462</td>
                    <td className="border px-4 py-2">Nivel 5</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Davis Curtis</td>
                    <td className="border px-4 py-2">9462</td>
                    <td className="border px-4 py-2">Nivel 5</td>
                  </tr>
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

        </div>
      </div>
    </div>
  );
}

export default ProfileAndTeamPage;