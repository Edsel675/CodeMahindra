import { useState, useEffect } from 'react';
import { Resizable } from "re-resizable";
import Sidebar from './Sidebar';
import ProblemStatement from './ProblemStatement';
import CodeEditor from './CodeEditor';
import ActionButtons from './ActionButtons';
import Submissions from './Submissions';
import Leaderboard from './Leaderboard';
import Discussions from './Discussions';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Comment, Submission } from '../../types/submission';
//import { Provider } from '@radix-ui/react-tooltip';

const Problems = () => {
  const employeeId = localStorage.getItem("user_id")
  // const employeeId = "a5ecea3a-05d9-44f6-9465-695349143c75"
  // const employeeId = "0749c2ab-674c-497b-a2bd-e04229bc2de6"
  const [code, setCode] = useState('// Your code here');
  const [activeTab, setActiveTab] = useState('problem');
  const location = useLocation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [submissionsError, setSubmissionsError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const handleSubmissionSelect = (submissionCode: string, language: string) => {
    setCode(submissionCode);
    setSelectedLanguage(language);
  };

  const problemId = location.state?.problemId || 1;

  const getComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/fromProblem/${problemId}`);
      const comments = response.data.map((comment: any) => ({
        id: comment.id,
        userName: comment.firstName + ' ' + comment.lastName,
        profilePic: comment.profilePicture,
        comment: comment.description,
        postDate: comment.messageDate,
        employeeId: comment.employee_id
      }));
      setComments(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

   // Fetch leaderboard data
   const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/solutions/problem/${problemId}/leaderboard`);
      const mappedData = response.data.map((entry: any, index: number) => ({
        rank: index + 1, // Calculate rank based on position
        userName: `${entry.firstName} ${entry.lastName}`, // Combine first and last name for userName
        profilePic: entry.profilePicture, // Use profilePicture from the response
        testCasesPassed: entry.testCasesPassed,
        time: `${entry.time}s`, // Convert time to string with 's' suffix
      }));
      setLeaderboard(mappedData);
    } catch (err) {
      console.error('Failed to load leaderboard.', err);
    }
  };

  const getSubmissions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/solutions/employee/${employeeId}/problem/${problemId}`
      );
      const formattedSubmissions = response.data.map((solution: any) => ({
        id: solution.id.toString(),
        sent_date: solution.submissionDate,
        status: solution.status,
        code: solution.code,
        runtime: `${solution.executionTime}s`,
        memory: `${solution.memory}MB`,
        inTeam: solution.inTeam,
        language: solution.language
      }));
      setSubmissions(formattedSubmissions);
    } catch (err) {
      setSubmissionsError('Failed to fetch submissions');
      console.error('Error fetching submissions:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getComments();
      await getSubmissions();
      await fetchLeaderboard();
    };
    fetchData();
  }, [problemId]);

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
              {activeTab === 'problem' && <ProblemStatement problemId={problemId} />}
              {activeTab === 'submissions' && (
                <Submissions 
                  submissions={submissions}
                  loading={loadingSubmissions}
                  error={submissionsError}
                  onSelectSubmission={handleSubmissionSelect}
                />
              )}
              {activeTab === 'leaderboard' && <Leaderboard problemId={problemId} leaderboard={leaderboard} />}
              {activeTab === 'discussions' && (
                <Discussions 
                  problemId={problemId} 
                  comments={comments}
                  setComments={setComments}
                  employeeId={employeeId || ""}
                />
              )}
            </div>
          </Resizable>
          <div className="flex-1 flex flex-col">
            <CodeEditor code={code} onChange={setCode} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}  />
            <ActionButtons code={code} problemId={problemId} employeeId={employeeId || ""} language={selectedLanguage}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;