import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryName from "./CountryName"; // ajusta la ruta según tu estructura

import { Bot, Flag, Star, ChevronRight, Users, Database, FileStack as Stack, Link2, Trees as Tree, FileSearch, Package, Share2, MousePointer2, Search, Layout, Clock, GitCompare, Workflow, BrainCircuit, LineChart, Binary, Calculator, ArrowLeft } from 'lucide-react';
import type { Bot as BotType } from './BotStore';

interface Achievement {
  id: string;
  name: string;
  category: string;
  topic: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'Maestro/a del Acceso Rápido',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Arrays y Hashing',
    description: 'Demuestra dominio en el uso eficiente de arrays y tablas hash para almacenar y recuperar datos velozmente.',
    icon: <Database className="w-8 h-8" />,
  },
  {
    id: '2',
    name: 'Dominador/a LIFO',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Stack (Pila)',
    description: 'Utiliza pilas correctamente para resolver problemas de lógica LIFO (Last-In, First-Out).',
    icon: <Stack className="w-8 h-8" />,
  },
  {
    id: '3',
    name: 'Navegante de Nodos',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Linked List',
    description: 'Domina la manipulación y recorrido de listas enlazadas.',
    icon: <Link2 className="w-8 h-8" />,
  },
  {
    id: '4',
    name: 'Arquitecto/a Arbóreo/a',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Trees',
    description: 'Comprende y aplica conceptos de árboles, como recorridos (BFS, DFS) y búsquedas (BST).',
    icon: <Tree className="w-8 h-8" />,
  },
  {
    id: '5',
    name: 'Lexicógrafo/a Digital',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Tries',
    description: 'Implementa o utiliza Tries para resolver problemas de búsqueda de cadenas y prefijos.',
    icon: <FileSearch className="w-8 h-8" />,
  },
  {
    id: '6',
    name: 'Guardián/a de la Prioridad',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Heap / Priority Queue',
    description: 'Aplica montículos o colas de prioridad para gestionar elementos ordenados eficientemente.',
    icon: <Package className="w-8 h-8" />,
  },
  {
    id: '7',
    name: 'Cartógrafo/a Conectado/a',
    category: 'Estructuras de Datos Fundamentales',
    topic: 'Graphs',
    description: 'Modela problemas y aplica algoritmos básicos (BFS, DFS) en estructuras de grafos.',
    icon: <Share2 className="w-8 h-8" />,
  },
  {
    id: '8',
    name: 'Estratega de Punteros',
    category: 'Técnicas y Estrategias Algorítmicas',
    topic: 'Two Pointers',
    description: 'Optimiza soluciones utilizando la técnica de dos punteros en secuencias.',
    icon: <MousePointer2 className="w-8 h-8" />,
  },
  {
    id: '9',
    name: '¡Eureka Ordenado!',
    category: 'Técnicas y Estrategias Algorítmicas',
    topic: 'Binary Search',
    description: 'Implementa y aplica búsqueda binaria para encontrar elementos en espacios ordenados de forma eficiente.',
    icon: <Search className="w-8 h-8" />,
  },
  {
    id: '10',
    name: 'Optimizador/a de Ventanas',
    category: 'Técnicas y Estrategias Algorítmicas',
    topic: 'Sliding Window',
    description: 'Resuelve problemas eficientemente procesando subsegmentos con la técnica de ventana deslizante.',
    icon: <Layout className="w-8 h-8" />,
  },
  {
    id: '11',
    name: 'Maestro/a de Intervalos',
    category: 'Técnicas y Estrategias Algorítmicas',
    topic: 'Intervals',
    description: 'Domina la lógica para resolver problemas de fusión, solapamiento y gestión de intervalos.',
    icon: <Clock className="w-8 h-8" />,
  },
  {
    id: '12',
    name: 'Decisor/a Óptimo Local',
    category: 'Técnicas y Estrategias Algorítmicas',
    topic: 'Greedy',
    description: 'Diseña y aplica algoritmos greedy para encontrar soluciones óptimas (o aproximadas) paso a paso.',
    icon: <GitCompare className="w-8 h-8" />,
  },
  {
    id: '13',
    name: 'Explorador/a Exhaustivo/a',
    category: 'Técnicas y Estrategias Algorítmicas',
    topic: 'Backtracking',
    description: 'Utiliza backtracking para explorar sistemáticamente todas las posibles soluciones a un problema complejo.',
    icon: <Workflow className="w-8 h-8" />,
  },
  {
    id: '14',
    name: 'Constructor/a de Soluciones Lineales',
    category: 'Programación Dinámica (DP)',
    topic: '1-D DP',
    description: 'Resuelve problemas aplicando programación dinámica con estados que dependen de una sola variable.',
    icon: <BrainCircuit className="w-8 h-8" />,
  },
  {
    id: '15',
    name: 'Tejedor/a de Estados',
    category: 'Programación Dinámica (DP)',
    topic: '2-D DP',
    description: 'Domina la programación dinámica en problemas cuyos estados dependen de dos o más variables (tablas).',
    icon: <LineChart className="w-8 h-8" />,
  },
  {
    id: '16',
    name: 'Gurú de Grafos',
    category: 'Tópicos Avanzados y Especializados',
    topic: 'Advanced Graphs',
    description: 'Aplica algoritmos avanzados como Dijkstra, Floyd-Warshall, flujo máximo, etc., para resolver problemas complejos de grafos.',
    icon: <Share2 className="w-8 h-8" />,
  },
  {
    id: '17',
    name: 'Mago/a Binario/a',
    category: 'Tópicos Avanzados y Especializados',
    topic: 'Bit Manipulation',
    description: 'Utiliza operaciones a nivel de bit para crear soluciones eficientes o resolver problemas específicos.',
    icon: <Binary className="w-8 h-8" />,
  },
  {
    id: '18',
    name: 'Geómetra Algorítmico/a',
    category: 'Tópicos Avanzados y Especializados',
    topic: 'Math y Geometry',
    description: 'Resuelve problemas aplicando conceptos y algoritmos matemáticos o geométricos.',
    icon: <Calculator className="w-8 h-8" />,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
  photo: '',
  firstName: '',
  lastName: '',
  experience: 0, 
  nationality: '',
  profilePicture:'',
});


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUser({
            photo: data.photo,
            firstName: data.firstName,
            lastName: data.lastName,
            experience: data.experience,
            nationality: data.nationality,
            profilePicture: data.profilePicture,
          });
        })
        .catch(err => console.error(err));
    }
  }, []);




const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [purchasedBot, setPurchasedBot] = useState<BotType | null>(() => {
    const saved = localStorage.getItem('purchasedBots');
    if (saved) {
      const bots = JSON.parse(saved);
      return bots.length > 0 ? bots[0] : null;
    }
    return null;
  });

  const initials = user
    ? `<span class="math-inline">\{user\.firstName?\.charAt\(0\) \|\| ""\}</span>{user.lastName?.charAt(0) || ""}`.toUpperCase()
    : "?"

  const achievementsByCategory = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const renderAchievement = (achievement: Achievement) => (
    <div
      key={achievement.id}
      className="relative group"
      onMouseEnter={() => setSelectedAchievement(achievement)}
      onMouseLeave={() => setSelectedAchievement(null)}
    >
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer">
        {achievement.imageUrl ? (
          <img
            src={achievement.imageUrl}
            alt={achievement.name}
            className="w-12 h-12 mb-3 object-contain"
          />
        ) : (
          <div className="text-gray-400 group-hover:text-red-500 transition-colors mb-3">
            {achievement.icon}
          </div>
        )}
        <h3 className="text-sm font-medium text-center">{achievement.name}</h3>
      </div>

      {selectedAchievement?.id === achievement.id && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl p-4 animate-fade-in">
          <h3 className="font-bold text-sm mb-1">{achievement.name}</h3>
          <p className="text-xs text-gray-600 mb-2">{achievement.topic}</p>
          <p className="text-xs text-gray-500">{achievement.description}</p>
        </div>
      )}
    </div>
  );

  if (showAllAchievements) {
    return (
      <div className="min-h-screen bg-[#363B41] text-black p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setShowAllAchievements(false)}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 p-2 rounded-md mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>

          <div className="space-y-8">
            {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
              <div key={category} className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">{category}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {categoryAchievements.map(renderAchievement)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
    {user?.profilePicture ? (
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-lg font-semibold text-gray-600">
          {user?.firstName?.charAt(0) || ""}
          {user?.lastName?.charAt(0) || ""}
        </span>
      </div>
    )}
    <div>
      <div className="flex items-center gap-2"> {/* Ajustado gap-2 para mejor espaciado con la bandera */}
        <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
            {user?.nationality ? (
              // AQUÍ ES EL CAMBIO PRINCIPAL
                <CountryName nationality={user.nationality} className="w-5 h-auto" /> // Ajusta className según necesites para CountryName
                ) : (
                  <span className="text-sm text-gray-500">Nacionalidad no disponible</span>
                )}
              </div>
            </div>
          </div>
        </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Progreso</h3>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Nivel 5</span>
                <span>{user?.experience} exp</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(Number(user?.experience) / 15000 * 100, 100)}%` }}></div>
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
        <div
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/bot-store')}
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              {purchasedBot ? purchasedBot.name : 'Bot Mahindra'}
            </h2>
            {purchasedBot ? (
              <div>
                <img
                  src={purchasedBot.imageUrl}
                  alt={purchasedBot.name}
                  className="w-32 h-32 mx-auto object-cover rounded-lg mb-4"
                />
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < purchasedBot.proficiency ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  {purchasedBot.abilities.slice(0, 2).map((ability, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-2 rounded text-sm"
                    >
                      {ability}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Bot className="w-32 h-32 mx-auto text-gray-400" />
            )}
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
            <button
              onClick={() => setShowAllAchievements(true)}
              className="text-red-500 hover:text-red-600"
            >
              Ver más
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {achievements.slice(0, 6).map(renderAchievement)}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
