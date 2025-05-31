import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

import Botoriginal from "../../images/BotsTechmahindra/Botoriginal.png";
import BotMahindra2 from '../../images/BotsTechmahindra/BotMahindra2.png';
import BotMahindra3 from '../../images/BotsTechmahindra/BotMahindra3.png';
import BotMahindra4 from '../../images/BotsTechmahindra/BotMahindra4.png';
import BotPython from '../../images/BotsTechmahindra/BotPython.png';
import BotReact from '../../images/BotsTechmahindra/BotReact.png';
import BotTechmahindra5 from '../../images/BotsTechmahindra/BotTechmahindra5.png';
import BotTechmahindra6 from '../../images/BotsTechmahindra/BotTechmahindra6.png';
import BotTecmahindra7 from '../../images/BotsTechmahindra/BotTecmahindra7.png';
import BotTecmahindra8 from '../../images/BotsTechmahindra/BotTecmahindra8.png';
import BotTecmahindra10 from '../../images/BotsTechmahindra/BotTecmahindra10.png';
import BotTecmahindra11 from '../../images/BotsTechmahindra/BotTecmahindra11.png';
import BotTecmahindra12 from '../../images/BotsTechmahindra/BotTecmahindra12.png';
import BotTecmahindra13 from '../../images/BotsTechmahindra/BotTecmahindra13.png';
import BotTecmahindra14 from '../../images/BotsTechmahindra/BotTecmahindra14.png';
import BotTecmahindra15 from '../../images/BotsTechmahindra/BotTecmahindra15.png';
import BotTecmahindra16 from '../../images/BotsTechmahindra/BotTecmahindra16.png';
import BotTechmahindra17 from '../../images/BotsTechmahindra/BotTecmahindra17.png';


export interface Bot {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  publishedDate: string;
  abilities: string[];
  proficiency: number;
}

const initialBots: Bot[] = [
  {
    id: '1',
    name: 'Bot Original',
    description: 'Advanced AI assistant with natural language processing capabilities.',
    price: 20,
    imageUrl: Botoriginal,
    publishedDate: '2024-03-14',
    abilities: ['Natural Language Processing', 'Code Generation', 'Problem Solving', 'Data Analysis'],
    proficiency: 4,
  },
  {
    id: '2',
    name: 'Bot Animado',
    description: 'Specialized in creating engaging animations and visual effects.',
    price: 30,
    imageUrl: BotMahindra2,
    publishedDate: '2024-03-14',
    abilities: ['Animation Creation', 'Visual Effects', 'Motion Graphics', 'Character Design'],
    proficiency: 5,
  },
  {
    id: '3',
    name: 'Bot C++',
    description: 'Expert in C++ programming and system optimization.',
    price: 45,
    imageUrl: BotMahindra3,
    publishedDate: '2024-03-14',
    abilities: ['System Programming', 'Performance Optimization', 'Memory Management', 'Algorithm Design'],
    proficiency: 5,
  },
  {
    id: '4',
    name: 'Bot Python',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotMahindra4,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '5',
    name: 'Bot Python',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotPython,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '6',
    name: 'React bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotReact,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 5,
  },
  {
    id: '7',
    name: 'Knigth bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTechmahindra5,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '8',
    name: 'Knigth bot 2',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTechmahindra6,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '9',
    name: 'White bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra7,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 2,
  },
  {
    id: '10',
    name: 'Simple bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra8,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 3,
  },
  {
    id: '12',
    name: 'Basketd ball bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra10,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '13',
    name: 'Build bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra11,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '14',
    name: 'Beisball bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra12,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '15',
    name: 'Bot simple',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra13,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 2,
  },
  {
    id: '16',
    name: 'Soccer bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra14,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 3,
  },
  {
    id: '17',
    name: 'Armor bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra15,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 4,
  },
  {
    id: '18',
    name: 'Happy bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTecmahindra16,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 5,
  },
  {
    id: '19',
    name: 'Dark bot',
    description: 'Specialized in Python development and data science.',
    price: 40,
    imageUrl: BotTechmahindra17,
    publishedDate: '2024-03-14',
    abilities: ['Data Science', 'Machine Learning', 'Web Scraping', 'Automation'],
    proficiency: 5,
  },
  
];

const botCardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  select: { scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" },
};

const botImageVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

const selectedBotVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const abilityCardVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
};

function BotStore() {
  const navigate = useNavigate();
  const [bots] = useState<Bot[]>(initialBots);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const selectedBotControls = useAnimation();

  const handlePurchase = (bot: Bot) => {
    localStorage.setItem('purchasedBots', JSON.stringify([bot]));
    navigate('/dashboard');
  };

  useEffect(() => {
    if (selectedBot) {
      selectedBotControls.start("animate");
    } else {
      selectedBotControls.start("initial");
    }
  }, [selectedBot, selectedBotControls]);

  return (
    <div className="min-h-screen bg-[#363B41]">
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 p-2 rounded-md mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bot Selection Grid */}
          <div className="bg-black/50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-2">
              {bots.map((bot) => (
                <motion.button
                  key={bot.id}
                  initial="initial"
                  whileHover="hover"
                  whileTap="select"
                  variants={botCardVariants}
                  onClick={() => setSelectedBot(bot)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedBot?.id === bot.id ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-gray-700'
                  }`}
                >
                  <motion.img
                    src={bot.imageUrl}
                    alt={bot.name}
                    className={`w-full h-full object-cover`}
                    variants={botImageVariants}
                    whileHover="hover"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium text-center">
                      {bot.name}
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selected Bot Preview */}
          <motion.div
            className="lg:col-span-2 bg-black/50 rounded-lg p-6 flex flex-col"
            initial="initial"
            animate={selectedBot ? "animate" : "initial"}
            variants={selectedBotVariants}
          >
            {selectedBot ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-blue-400">{selectedBot.name}</h2>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 transition-all duration-300 ${
                            i < selectedBot.proficiency ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{selectedBot.price} puntos</span>
                </div>

                <div className="flex-1flex gap-6">
                  <div className="flex-1 relative overflow-hidden rounded-lg">
                    <motion.img
                      src={selectedBot.imageUrl}
                      alt={selectedBot.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-4">Habilidades</h3>
                    <div className="space-y-2">
                      {selectedBot.abilities.map((ability, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-r from-blue-500/50 to-purple-500/50 p-3 rounded-lg text-white flex items-center"
                          variants={abilityCardVariants}
                          initial="initial"
                          animate="animate"
                          style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                          <span className="flex-1">{ability}</span>
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => handlePurchase(selectedBot)}
                      className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                      whileHover={{ scale: 1.05 }}
                    >
                      Comprar Bot
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Selecciona un bot para ver sus detalles
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BotStore;