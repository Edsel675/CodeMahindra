import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import Axios
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProblemListData } from '../types/problem';

// Constants
const PROBLEMS_PER_PAGE = 5;

const ProblemList: React.FC = () => {
  const navigate = useNavigate(); // Set up navigate for route change
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'solved' | 'not_solved' | ''>(''); // State for status filter
  const [difficultyFilter, setDifficultyFilter] = useState<'Easy' | 'Medium' | 'Hard' | ''>(''); // State for difficulty filter
  const [filteredProblems, setFilteredProblems] = useState<any[]>([]); // To store problems from API
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProblems, setTotalProblems] = useState(0); // Total number of problems in the API

  // Fetch problems from API when the component mounts
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/`);
        const problems = response.data;
        console.log("these are the problems");
        console.log(problems);
        // Set status to 'not_solved' for all problems
        const updatedProblems = problems.map((problem: any) => ({
          ...problem,
          status: 'not_solved', // Setting status to 'not_solved'
        }));

        setFilteredProblems(updatedProblems);
        setTotalProblems(updatedProblems.length); // Set total problems count
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  // Apply filters when search term, status, or difficulty change
  useEffect(() => {
    const filtered = filteredProblems.filter(problem =>
      problem.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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

  const handleProblemClick = (problemId: string) => {
    navigate(`/problemList/problem/${problemId}`, { state: { problemId } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
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
                      <td className="py-4 px-4">{problem.name}</td>
                      <td className={`py-4 px-4 ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </td>
                      <td className="py-4 px-4">{problem.acceptance_rate ? `${problem.acceptance_rate}%` : 'N/A'}</td>
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
