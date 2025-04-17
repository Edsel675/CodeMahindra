import { useState, useEffect } from 'react';
import { Resizable } from "re-resizable";
import Sidebar from '../components/Sidebar';
import ProblemStatement from '../components/ProblemStatement';
import CodeEditor from '../components/CodeEditor';
import ActionButtons from '../components/ActionButtons';
import Submissions from '../components/Submissions';
import Leaderboard from '../components/Leaderboard';
import Discussions from '../components/Discussions';
import { useLocation } from 'react-router-dom';

const Problems = () => {
  const [code, setCode] = useState('// Your code here');
  const [activeTab, setActiveTab] = useState('problem');
  const location = useLocation();  // Get location to access the problemId prop passed through the route

  const handleSubmissionSelect = (submissionCode: string) => {
    setCode(submissionCode);
  };

  // Access the problemId passed from the route
  const problemId = location.state?.problemId || '';  // Default to empty string if no problemId

  return (
    <div className="h-screen bg-[#363B41] flex items-center justify-center">
      <div className="w-[95%] h-[calc(100vh-64px)] bg-white shadow-lg rounded-lg flex overflow-hidden border border-gray-300">
        <Sidebar onTabChange={setActiveTab} />
        <div className="flex-1 flex">
          <Resizable
            defaultSize={{ width: "40%", height: "100%" }}
            minWidth="30%"
            maxWidth="70%"
            enable={{ right: true }}
            handleClasses={{
              right: "w-1 bg-gray-300 hover:bg-red-500 cursor-col-resize",
            }}
          >
            <div className="h-full overflow-auto pr-1">
              {activeTab === 'problem' && <ProblemStatement problemId={problemId} />}  {/* Pass problemId as prop */}
              {activeTab === 'submissions' && <Submissions onSelectSubmission={handleSubmissionSelect} />}
              {activeTab === 'leaderboard' && <Leaderboard />}
              {activeTab === 'discussions' && <Discussions problemId={problemId} />}
            </div>
          </Resizable>
          <div className="flex-1 flex flex-col">
            <CodeEditor code={code} onChange={setCode} />
            <ActionButtons code={code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
