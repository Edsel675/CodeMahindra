import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Code, ListTodo, ShoppingBag, Trophy, Bell } from 'lucide-react';
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

const barChartData = [
  { name: 'Easy', value: 45, color: '#28a745' },  
  { name: 'Medium', value: 45, color: '#fd7e14' },  
  { name: 'High', value: 45, color: '#dc3545' },  
];

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white text-white py-3 px-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              <Code className="w-5 h-5" />
              <span>Problemas</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              <ListTodo className="w-5 h-5" />
              <span>Tareas</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              <Code className="w-5 h-5" />
              <span>Código</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              <Trophy className="w-5 h-5" />
              <span>Ranking</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
              <span>Tienda</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-300">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Digital Creative</span>
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop" 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProfileAndTeamPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#363B41]">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 text-gray-900">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 p-2 rounded-md mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6 text-white">Perfil</h1>
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
                </tbody>
              </table>
            </div>
          </div>

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

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Clasificación por dificultad</h2>
            <div className="flex justify-between">
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
