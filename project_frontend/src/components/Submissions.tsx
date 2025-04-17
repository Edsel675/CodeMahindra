import { useState } from 'react';
import { Submission } from '../types/submission';
import { CheckCircle2, XCircle, Code2 } from 'lucide-react';

const mockSubmissions: Submission[] = [
  {
    id: '1',
    sent_date: '2025-03-28T10:30:00Z',
    status: 'Accepted',
    code: '#include <iostream>\nint main() {\n  std::cout << "Hello World!";\n  return 0;\n}',
    runtime: '0.032s',
    memory: '4.2MB',
    inTeam: false,
    language: 'C++'
  },
  {
    id: '2',
    sent_date: '2025-03-28T10:25:00Z',
    status: 'Failed',
    code: '#include <iostream>\nint main() {\n  std::cout << "Wrong answer";\n  return 1;\n}',
    runtime: '0.028s',
    memory: '4.1MB',
    inTeam: false,
    language: 'C++'
  },
  {
    id: '3',
    sent_date: '2025-03-28T10:20:00Z',
    status: 'Accepted',
    code: '#include <iostream>\nint main() {\n  std::cout << "Perfect solution";\n  return 0;\n}',
    runtime: '0.030s',
    memory: '4.0MB',
    inTeam: false,
    language: 'C++'
  },
  {
    id: '4',
    sent_date: '2025-03-28T10:15:00Z',
    status: 'Failed',
    code: '#include <iostream>\nint main() {\n  std::cout << "Time limit exceeded";\n  while(true);\n  return 0;\n}',
    runtime: '1.500s',
    memory: '5.8MB',
    inTeam: false,
    language: 'C++'
  }
];

interface SubmissionsProps {
  onSelectSubmission?: (code: string, language: string) => void;
}

const Submissions = ({ onSelectSubmission }: SubmissionsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Submissions</h2>
      <div className="space-y-4">
        {mockSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onSelectSubmission?.(submission.code, submission.language)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {new Date(submission.sent_date).toLocaleString()}
                </span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {submission.language}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {submission.status === 'Accepted' ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="w-5 h-5 mr-1" />
                    <span>Accepted</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-1" />
                    <span>Failed</span>
                  </div>
                )}
                <button 
                  className="flex items-center text-blue-500 hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSubmission?.(submission.code, submission.language);
                  }}
                >
                  <Code2 className="w-4 h-4 mr-1" />
                  <span>View Code</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Runtime:</span> {submission.runtime}
              </div>
              <div>
                <span className="font-medium">Memory:</span> {submission.memory}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
