import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import Axios
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProblemListData } from '../types/problem';
import { isAfter } from 'date-fns';


// Constants
const PROBLEMS_PER_PAGE = 5;

const ProblemList: React.FC = () => {
  const navigate = useNavigate(); // Set up navigate for route change
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'solved' | 'not_solved' | ''>(''); // State for status filter
  const [difficultyFilter, setDifficultyFilter] = useState<'Easy' | 'Medium' | 'Hard' | ''>(''); // State for difficulty filter
  const [problems, setProblems] = useState<ProblemListData[]>([]); // Store original problems
  const [filteredProblems, setFilteredProblems] = useState<ProblemListData[]>([]); // To store problems from API
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProblems, setTotalProblems] = useState(0); // Total number of problems in the API
  const [activeProblems, setActiveProblems] = useState<ProblemListData[]>([]); // active challenge problems
  const [currentSlide, setCurrentSlide] = useState(0);
  // Fetch problems from API when the component mounts
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/`);
        const problems = response.data.map((problem: ProblemListData) => ({
          ...problem,
          status: 'not_solved',
        }));
  
        setProblems(problems);
        setFilteredProblems(problems);
        setTotalProblems(problems.length);
        setActiveProblems(problems.filter((problem: ProblemListData) => 
          problem.expirationDate && problem.expirationDate !== null && isAfter(new Date(problem.expirationDate), new Date())
        ))
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
  
    fetchProblems();
  }, []);
  
  useEffect(() => {
    const filtered = problems.filter(problem =>
      problem.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? problem.status === statusFilter : true) &&
      (difficultyFilter ? problem.difficulty === difficultyFilter : true)
    );
  
    setFilteredProblems(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, difficultyFilter, problems]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + PROBLEMS_PER_PAGE);

  const handleProblemClick = (problemId: string) => {
    navigate(`/problemList/problem/${problemId}`, { state: { problemId } });
  };

  const slideTransition = {
    transform: `translateX(-${currentSlide * 33.33}%)`,
    transition: 'transform 0.5s ease-in-out'
  };
  const goToRoadMap = () => {
    navigate('/roadmap');
  };
  console.log(problems);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        
        <div className="flex-1">
          {/* Active Problems Carousel */}
          <section className="my-0">
            <h2 className="text-2xl font-bold text-white mb-6">Desafíos de código activos</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex gap-6" style={slideTransition}>
                  {activeProblems.map((problem) => (
                    <div 
                      key={problem.id} 
                      className="flex-none w-1/3 cursor-pointer"
                      onClick={() => handleProblemClick(problem.id)} 
                    >
                      <div 
                          className="h-48 rounded-lg bg-cover bg-center relative"
                          style={{
                            backgroundImage: `url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")`
                          }}
                        >
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-between p-6">
                          <h3 className="text-white text-xl font-semibold">{problem.name}</h3>
                          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md w-fit hover:bg-gray-300 transition-colors">
                            Resolver
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg disabled:opacity-50"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={() => setCurrentSlide(Math.min(activeProblems.length - 3, currentSlide + 1))}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg disabled:opacity-50"
                disabled={currentSlide >= activeProblems.length - 3}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </section>

          <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white shadow-md max-w-5xl my-6">
            <div className='px-12 py-2'>
              <p className="font-semibold text-2xl">¿Quieres mejorar y no sabes qué estudiar?</p>
              <p className="mt-1 text-2xl">Checa el siguiente roadmap</p>
            </div>
            <button onClick={goToRoadMap} className="bg-red-500 hover:bg-red-600 transition-colors p-3 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>


          {/* Problems Table */}
          <section className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[300px] mt-6">
            <div className="p-6 flex flex-col h-full">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full border rounded-md px-4 py-2 pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <select
                  className="border rounded-md px-4 py-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'solved' | 'not_solved' | '')}
                >
                  <option value="">All Status</option>
                  <option value="solved">Solved</option>
                  <option value="not_solved">Not Solved</option>
                </select>

                <select
                  className="border rounded-md px-4 py-2"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as 'Easy' | 'Medium' | 'Hard' | '')}
                >
                  <option value="">All Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="bg-red-500 text-white">
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Problem</th>
                    <th className="py-3 px-4 text-left">Difficulty</th>
                    <th className="py-3 px-4 text-left">Acceptance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProblems.map((problem) => (
                    <tr 
                      key={problem.id} 
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleProblemClick(problem.id)} 
                    >
                      <td className="py-4 px-4">
                        {problem.status === 'solved' ? (
                          <div className="w-6 h-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                            ✓
                          </div>
                        ) : null}
                      </td>
                      <td className="py-4 px-4">{problem.name}</td>
                      <td className={`py-4 px-4 ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </td>
                      <td className="py-4 px-4">{problem.acceptance ? `${problem.acceptance}%` : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + PROBLEMS_PER_PAGE, filteredProblems.length)} of {filteredProblems.length} problems
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
