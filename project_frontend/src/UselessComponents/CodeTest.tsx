import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Clock, MessageSquare, FileCode, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Suggestion } from '../types/suggestion';

// Mock data for suggestions
const mockSuggestions: Suggestion[] = [
  // Sample mock data as you already provided
  {
    id: "1",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "2",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "3",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "4",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "5",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "6",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "7",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "8",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "9",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "10",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "11",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  {
    id: "12",
    title: "Fix array initialization in matrix multiplication",
    comment: "The current implementation might cause memory leaks. We should use proper initialization.",
    code: "matrix = [[0 for _ in range(n)] for _ in range(n)]",
    path: "src/algorithms/matrix.py",
    suggestionDate: "2024-03-15"
  },
  // Add other mock suggestions...
];

const ITEMS_PER_PAGE = 10;

const CodeTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockSuggestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSuggestions = mockSuggestions.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  // Handle row click to navigate to detailed view
  const handleRowClick = (suggestionId: string) => {
    navigate(`/code/detail/${suggestionId}`); // Navigate to the detailed view of the suggestion
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[800px]">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Code Suggestions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSuggestions.map((suggestion) => (
                  <tr 
                    key={suggestion.id} 
                    className="hover:bg-gray-50 cursor-pointer" 
                    onClick={() => handleRowClick(suggestion.id)} // Navigate to detail page
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{suggestion.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="truncate max-w-xs">{suggestion.comment}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{suggestion.path}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {suggestion.suggestionDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            {/* More pagination controls here */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, mockSuggestions.length)}</span> of{' '}
                  <span className="font-medium">{mockSuggestions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTest;