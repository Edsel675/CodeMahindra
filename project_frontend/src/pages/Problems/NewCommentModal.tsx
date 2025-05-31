import { useState } from 'react';

interface NewCommentModalProps {
  onClose: () => void;
  onPublish: (comment: string) => void;
}

const NewCommentModal = ({ onClose, onPublish }: NewCommentModalProps) => {
  const [newCommentDescription, setNewCommentDescription] = useState('');

  const handlePublish = () => {
    onPublish(newCommentDescription);
    setNewCommentDescription('');
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Add a New Comment</h3>
        <textarea
          value={newCommentDescription}
          onChange={(e) => setNewCommentDescription(e.target.value)}
          className="w-full h-32 p-2 border rounded-md font-mono text-sm mb-4"
          placeholder="Write your comment here..."
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCommentModal;
