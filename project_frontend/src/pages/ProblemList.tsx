import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { format, isAfter, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProblemListData } from '../types/problem';

// Mock data for problems
const mockProblems: ProblemListData[] = [
  {
    id: '1',
    status: 'not_solved',
    difficulty: 'Hard',
    acceptance_rate: 9.8,
    title: 'Zero Array Transformation II',
    expiration_date: '2025-04-28'
  },
  {
    id: '2',
    status: 'solved',
    difficulty: 'Easy',
    acceptance_rate: 67.2,
    title: 'Median of Two Sorted Arrays',
    expiration_date: '2025-04-29'
  },
  {
    id: '3',
    status: 'not_solved',
    difficulty: 'Medium',
    acceptance_rate: 45.4,
    title: 'Regular Expression Matching',
    expiration_date: '2025-04-30'
  },
  {
    id: '4',
    status: 'not_solved',
    difficulty: 'Hard',
    acceptance_rate: 35.6,
    title: 'Two Sum',
    expiration_date: '2025-04-30'
  },
  {
    id: '5',
    status: 'not_solved',
    difficulty: 'Medium',
    acceptance_rate: 52.1,
    title: 'Add Two Numbers',
    expiration_date: '2025-04-30'
  },
  // Add more mock problems to test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 6}`,
    status: 'not_solved',
    difficulty: 'Medium',
    acceptance_rate: 45.4,
    title: `Problem ${i + 6}`,
    expiration_date: '2025-04-30'
  }))
];

const PROBLEMS_PER_PAGE = 5;

const ProblemList: React.FC = () => {
  const navigate = useNavigate(); // Set up navigate for route change
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'solved' | 'not_solved' | ''>(''); // State for status filter
  const [difficultyFilter, setDifficultyFilter] = useState<'Easy' | 'Medium' | 'Hard' | ''>(''); // State for difficulty filter
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredProblems, setFilteredProblems] = useState(mockProblems);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter active problems (not expired)
  const activeProblems = mockProblems.filter(problem => 
    problem.expiration_date && problem.expiration_date !== null && isAfter(new Date(problem.expiration_date), new Date())
  );

  // Calendar calculations
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth: Date[] = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const expirationDates: Date[] = mockProblems
    .filter(problem => problem.expiration_date)
    .map(problem => new Date(problem.expiration_date));

  // Apply filters when search term, status, or difficulty change
  useEffect(() => {
    const filtered = mockProblems.filter(problem =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? problem.status === statusFilter : true) &&
      (difficultyFilter ? problem.difficulty === difficultyFilter : true)
    );
    setFilteredProblems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, difficultyFilter]);

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

  const slideTransition = {
    transform: `translateX(-${currentSlide * 33.33}%)`,
    transition: 'transform 0.5s ease-in-out'
  };

  const handleProblemClick = (problemId: string) => {
    navigate(`/problemList/problem/${problemId}`, { state: { problemId } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Active Problems Carousel */}
          <section className="mb-12">
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
                          backgroundImage: `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`
                        }}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-between p-6">
                          <h3 className="text-white text-xl font-semibold">{problem.title}</h3>
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

          {/* Problems Table */}
          <section className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[300px]">
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
                      <td className="py-4 px-4">{problem.title}</td>
                      <td className={`py-4 px-4 ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </td>
                      <td className="py-4 px-4">{problem.acceptance_rate}%</td>
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
