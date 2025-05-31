import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, GraduationCap, Search, RotateCcw } from 'lucide-react';
import axios from 'axios';
import Toast from '@/components/Toast';

interface ProblemManage {
  id: string;
  difficulty: string;
  name: string;
  expirationDate: string;
  wasGraded: boolean;
}

interface ProblemCardProps {
  problem: ProblemManage;
  onDelete: (id: string) => void;
  onGrade: (id: string) => void;
  onActivate: (id: string) => void;
  onViewProblem: (id: string) => void;
}


const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onDelete, onGrade, onActivate, onViewProblem }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 
          className="text-xl font-semibold cursor-pointer hover:text-blue-600"
          onClick={() => onViewProblem(problem.id)}
        >
          {problem.name}
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
      </div>
      
      <p className="text-gray-500 mb-4">
        Expires: {new Date(problem.expirationDate).toLocaleDateString()}
      </p>
      
      <div className="flex items-center justify-between mt-4">
        <span className={`px-3 py-1 rounded-full text-sm ${
          !problem.wasGraded ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {!problem.wasGraded ? 'Active' : 'Inactive'}
        </span>
        <div className="flex gap-2">
          {!problem.wasGraded && (
            <button
              onClick={() => onGrade(problem.id)}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
              title="Grade problem"
            >
              <GraduationCap size={20} />
            </button>
          )}
          {problem.wasGraded && (
            <button
            onClick={() => onActivate(problem.id)}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white"
            title="Activate problem"
          >
            <RotateCcw size={20} />
          </button>
          )}
          <button
            onClick={() => onDelete(problem.id)}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
            title="Delete problem"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageProblems: React.FC = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<ProblemManage[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [toast, setToast] = useState<{show: boolean; success: boolean; msg: string}>({
    show: false,
    success: true,
    msg: ""
  });
  
  const showToast = (success: boolean, msg: string) => {
    setToast({ show: true, success, msg });
    // auto‑hide after 2.5 s
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
  };

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/`);
      const fetchedProblems = response.data.map((problem: any) => ({
        id: problem.id,
        name: problem.name,
        difficulty: problem.difficulty,
        expirationDate: problem.expirationDate,
        wasGraded: problem.was_graded
      }));
      setProblems(fetchedProblems);
    } catch (err) {
      console.error("❌ Error loading problems:", err);
    } 
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleDeleteProblem = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/problems/${id}`);
      setProblems(problems.filter(problem => problem.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('There was an error deleting your problem. Please try again.');
    }
  };

  const handleGradeProblem = async (id: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/problems/${id}/grade`);
      setProblems(problems.map(problem => 
        problem.id === id ? { ...problem, wasGraded: true } : problem
      ));
      showToast(true, "Problem graded successfully!");
    } catch (error) {
      console.error("Grading failed:", error);
      showToast(false, "Failed to grade the problem.");
    }
  };

  const handleViewProblem = (id: string) => {
    navigate(`/problemList/problem/${id}`, { state: { problemId: id } });
  };

  const handleActivateProblem = async (id: string) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/problems/${id}`, {
        was_graded: false,
      });
      setProblems(problems.map(problem =>
        problem.id === id ? { ...problem, wasGraded: false } : problem
      ));
      showToast(true, "Problem reactivated!");
    } catch (error) {
      console.error("Activation failed:", error);
      showToast(false, "Failed to reactivate the problem.");
    }
  };
  

  const filteredProblems = problems
    .filter(problem => {
      if (filter === 'active') return !problem.wasGraded;
      if (filter === 'inactive') return problem.wasGraded;
      return true;
    })
    .filter(problem => 
      problem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Manage Problems</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="text"
                placeholder="Search problems..."
                className="bg-gray-800 rounded-lg pl-10 pr-4 py-2 w-full text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-gray-800 rounded-lg px-4 py-2 text-white border border-white/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All Problems</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center text-gray-800">
            <p className="text-xl">No problems found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map(problem => (
              <ProblemCard 
                key={problem.id} 
                problem={problem} 
                onDelete={handleDeleteProblem}
                onGrade={handleGradeProblem}
                onActivate={handleActivateProblem}
                onViewProblem={handleViewProblem}
            />
            ))}
          </div>
        )}
      </div>

      <Toast
        show={toast.show}
        success={toast.success}
        msg={toast.msg}
        onClose={() => setToast(t => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default ManageProblems;
