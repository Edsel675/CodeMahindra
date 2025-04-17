import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Flag, Star, ChevronRight, Users } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#363B41] text-black p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Perfil</h2>
            <button 
              className="text-red-500 hover:text-red-600"
              onClick={() => navigate('/profile')}
            >
              Ver más
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop" 
                alt="Profile" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Davis Curtis</span>
                  <Flag className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Progreso</h3>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Nivel 5</span>
                <span>9462 exp</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Challenges Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Desafíos Semanales</h2>
          <div className="space-y-4">
            <button 
              className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex justify-between items-center"
              onClick={() => navigate('/tasks')}
            >
              <span>Completar tareas</span>
              <ChevronRight />
            </button>
            <button 
              className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex justify-between items-center"
              onClick={() => navigate('/problems')}
            >
              <span>Resolver problema</span>
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Bot Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Bot Mahindra</h2>
            <Bot className="w-32 h-32 mx-auto text-gray-400" />
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Equipo</h2>
            <button 
              className="text-red-500 hover:text-red-600"
              onClick={() => navigate('/team')}
            >
              Ver más
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              Los fieles y Edsel
            </h3>
            <div className="flex justify-between text-sm mb-2">
              <span>Nivel 5</span>
              <span>9462 exp</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop" 
                    alt="Team member" 
                    className="w-10 h-10 rounded-full"
                  />
                  <span>Davis Curtis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span>Nivel 5</span>
                  <span className="text-gray-500">9462 exp</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Logros e insignias</h2>
            <button className="text-red-500 hover:text-red-600">Ver más</button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
