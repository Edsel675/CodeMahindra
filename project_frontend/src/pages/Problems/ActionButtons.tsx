import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { TestCase } from '@/types/problem';

interface ActionButtonsProps {
  code: string;
  problemId: number;
  employeeId: string;
  language: string;
}

interface TestCaseResult {
  id: string;
  result: 'AC' | 'WA' | 'RE' | 'TL';
  time: string;
  memory: string;
  expected_output: string;
  output: string;
}

interface Submission {
  problem_id: number;
  source_code: string;
  employee_id: string;
  language: string;
}

interface TestResult {
  id: string;
  result: string;
  status?: string;
}

const ActionButtons = ({ code, problemId, employeeId, language }: ActionButtonsProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const simulateCodeRun = async () => {
    setIsProcessing(true);
    setRunResult(null);

    console.log(problemId);
      console.log(code);
      console.log(customInput);
      console.log(language);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/solutions/test`,
        {
          problem_id: problemId,
          source_code: code,
          input: customInput,
          language: language,
        }
      );
      const result: TestCaseResult = response.data;
      let customMessage = '';
      if (result.result === 'AC') {
        customMessage = `Accepted ✅\nOutput matched expected output in ${result.time} and ${result.memory} memory.\nExpected: ${result.expected_output}\nGot: ${result.output}`;
      } else if (result.result === 'WA') {
        customMessage = `Wrong Answer ❌\nExpected: ${result.expected_output}\nGot: ${result.output}`;
      } else if (result.result === 'RE') {
        customMessage = `Runtime Error 💥\nYour code crashed during execution.`;
      } else if (result.result === 'TL') {
        customMessage = `Time Limit Exceeded ⏱️\nYour code took too long to run.`;
      }
      setRunResult(`${result.result}\n${customMessage}`);
    } catch (error) {
      console.error("Error running the code:", error);
      setRunResult('Error occurred during code execution');
    }

    setIsProcessing(false);
  };

  const simulateSubmission = async () => {
    setIsSubmitting(true);
    setTestResults([]);
    const submission: Submission = {
      problem_id: problemId,
      source_code: code,
      employee_id: employeeId,
      language: language,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/solutions/test-results`,
        submission
      );
      const results: TestCaseResult[] = response.data;

      results.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      results.forEach((r, index) => {
        r.id = (index + 1).toString();
      });

      const processingResults: TestResult[] = results.map((result) => ({
        id: result.id,
        result: result.result === 'AC' ? 'passed' : result.result,
        status: "",
      }));

      setTestResults(processingResults);
    } catch (error) {
      console.error("Error submitting the code:", error);
      setTestResults([]);
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
