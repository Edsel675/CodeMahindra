import React from 'react';
import { useParams } from 'react-router-dom';

const PullRequest: React.FC = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Suggestion Details</h2>
        <div className="text-lg font-medium">ID: {id}</div> {/* Display the suggestion ID */}
      </div>
    </div>
  );
};

export default PullRequest;