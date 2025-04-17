import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { TestCase } from '../types/problem';

interface ActionButtonsProps {
  code: string;
}

interface TestResult {
  id: string;
  result: 'passed' | 'failed' | 'processing';
  status?: string;
}

const mockTestCases: TestCase[] = [
  { id: '1', input: '5\n1 2 3 4 5', output: '15' },
  { id: '2', input: '3\n10 20 30', output: '60' },
  { id: '3', input: '4\n2 4 6 8', output: '20' },
  { id: '4', input: '2\n100 200', output: '300' },
];

const ActionButtons = ({ code }: ActionButtonsProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const simulateCodeRun = async () => {
    setIsProcessing(true);
    setRunResult(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const outcomes = [
      { status: 'Compilation error :(', message: 'Check the compiler output, fix the error and try again.\n\nError: missing return statement' },
      { status: 'Time Limit Exceeded', message: 'Your code took too long to execute.' },
      { status: 'Accepted', message: 'Output: 15\nExecution time: 0.042s' },
      { status: 'Wrong Answer', message: 'Expected output: 15\nYour output: 10' },
    ];

    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    setRunResult(`${randomOutcome.status}\n${randomOutcome.message}`);
    setIsProcessing(false);
  };

  const simulateSubmission = async () => {
    setIsSubmitting(true);
    setTestResults([]);

    const processingResults = mockTestCases.map(test => ({
      id: test.id,
      result: 'processing' as 'passed' | 'failed' | 'processing',
      status: 'Processing...'
    }));
    setTestResults(processingResults);

    for (let i = 0; i < mockTestCases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const result: TestResult = {
        id: mockTestCases[i].id,
        result: Math.random() > 0.5 ? 'passed' : 'failed',
      };

      setTestResults(prev => [
        ...prev.slice(0, i),
        result,
        ...prev.slice(i + 1)
      ]);
    }

    setIsSubmitting(false);
  };

  const clearResults = () => {
    setRunResult(null);
    setTestResults([]);
  };

  return (
    <div className="bg-gray-100 p-3 border-t">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <button
            className={`px-3 py-1.5 ${showCustomInput ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} text-sm rounded hover:bg-gray-300`}
            onClick={() => setShowCustomInput(!showCustomInput)}
          >
            Test against custom input
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center"
            onClick={simulateCodeRun}
            disabled={isProcessing}
          >
            {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Run Code
          </button>
          <button
            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center"
            onClick={simulateSubmission}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Submit Code
          </button>
          <button
            className="px-4 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center"
            onClick={clearResults}
          >
            Clear Results
          </button>
        </div>
      </div>

      {showCustomInput && (
        <div className="mt-4 max-w-7xl mx-auto">
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full h-32 p-2 border rounded-md font-mono text-sm"
            placeholder="Enter your custom input here..."
          />
        </div>
      )}

      {runResult && (
        <div className="mt-4 max-w-7xl mx-auto">
          <div className="bg-white p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-mono text-sm">{runResult}</pre>
          </div>
        </div>
      )}

      {testResults.length > 0 && (
        <div className="mt-4 max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Test Results</h3>
          <div className="grid grid-cols-3 gap-4">
            {testResults.map((result) => (
              <div
                key={result.id}
                className={`p-4 rounded-md ${
                  result.result === 'processing' ? 'bg-gray-100' :
                  result.result === 'passed' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Test case {result.id}</span>
                  {result.result === 'processing' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className={result.result === 'passed' ? 'text-green-600' : 'text-red-600'}>
                      {result.result.charAt(0).toUpperCase() + result.result.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
