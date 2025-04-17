import { useState } from 'react';
import { Comment } from '../types/submission';
import NewCommentModal from './NewCommentModal';
import axios from 'axios';
import { Description } from '@headlessui/react';

const mockComments: Comment[] = [
  {
    id: '1',
    userName: 'Alice Johnson',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    comment: 'Great problem! I learned a lot about dynamic programming while solving it.',
    postDate: '2025-03-28T10:30:00Z'
  },
  {
    id: '2',
    userName: 'Bob Smith',
    profilePic: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    comment: 'I found a more efficient solution using a priority queue. Would anyone like to discuss different approaches?',
    postDate: '2025-03-28T09:45:00Z'
  },
  {
    id: '3',
    userName: 'Carol Williams',
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    comment: 'The time complexity of my solution is O(n log n). Is there a way to optimize it further?',
    postDate: '2025-03-28T09:15:00Z'
  },
  {
    id: '4',
    userName: 'David Brown',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    comment: 'Has anyone tried solving this using a different programming language? I\'d be interested in seeing other implementations.',
    postDate: '2025-03-28T08:30:00Z'
  }
];

interface DiscussionsProps {
  problemId: number;
}
const Discussions: React.FC<DiscussionsProps> = ({ problemId }) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const [comments, setComments] = useState(mockComments);

  const handleAddNewComment = () => {
    setShowNewComment(true);
  };

  const handleCloseNewComment = () => {
    setShowNewComment(false);
  };

  const handlePublishComment = async(newCommentDescription: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comments`, {
        employee_id: '3a1e74c9-8f2a-4ccd-83f4-6e4121672f69',
        Description: newCommentDescription,
        problem_id: problemId
      });

      const newComment = {
        id: response.data.id,
        userName: response.data.firstName + ' ' + response.data.lastName,
        profilePic: response.data.profilePicture,
        comment: response.data.description,
        postDate: response.data.messageDate,
      };
  
      // Simulate the API call
      setComments((prevComments) => [...prevComments, newComment]);
  
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('There was an error publishing your comment. Please try again.');
    } finally {
      handleCloseNewComment();
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discussions</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleAddNewComment}
        >
          New Comment
        </button>
      </div>

      {/* Render New Comment Modal */}
      {showNewComment && (
        <NewCommentModal
          onClose={handleCloseNewComment}
          onPublish={handlePublishComment}
        />
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <img
              src={comment.profilePic}
              alt={comment.userName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.postDate).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <button className="hover:text-blue-500">Reply</button>
                <button className="hover:text-blue-500">Share</button>
                <button className="hover:text-blue-500">Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussions;
