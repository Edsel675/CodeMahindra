import { CheckCircle2, XCircle, Code2 } from 'lucide-react';
import { Submission } from '@/types/submission';

interface SubmissionsProps {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  onSelectSubmission?: (code: string, language: string) => void;
}

const Submissions = ({ submissions, loading, error, onSelectSubmission }: SubmissionsProps) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Submissions</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Submissions</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Submissions</h2>
      {submissions.length === 0 ? (
        <div className="text-gray-500">No submissions found</div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
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
      )}
    </div>
  );
};

export default Submissions;