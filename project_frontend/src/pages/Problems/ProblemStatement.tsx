import { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import { Problem } from '@/types/problem';

interface ProblemStatementProps {
  problemId: string;
}

const ProblemStatement: React.FC<ProblemStatementProps> = ({ problemId }) => {
  const [problem, setProblem] = useState<Problem | null>(null);  // Use state to hold the fetched problem data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/${problemId}`);

        setProblem(response.data);
      } catch (err) {
        setError('Error fetching problem data');
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);  // Refetch problem data when the problemId changes

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if fetching fails
  }

  if (!problem) {
    return <div>No problem found</div>;  // Handle case if the problem is not found
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">{problem.name}</h1>
      <div className="prose max-w-none">
        <p className="mb-4">{problem.description}</p>
        <h2 className="text-xl font-semibold mb-2">Input Format</h2>
        <p className="mb-4">{problem.input_format}</p>
        <h2 className="text-xl font-semibold mb-2">Output Format</h2>
        <p className="mb-4">{problem.output_format}</p>
        <h2 className="text-xl font-semibold mb-2">Sample Input</h2>
        <pre className="bg-gray-100 p-4 rounded mb-4">{problem.sample_input}</pre>
        <h2 className="text-xl font-semibold mb-2">Sample Output</h2>
        <pre className="bg-gray-100 p-4 rounded mb-4">{problem.sample_output}</pre>
      </div>
    </div>
  );
};

export default ProblemStatement;
