import { useState } from 'react';

interface SidebarProps {
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ onTabChange }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState('problem');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const sidebarTabs = [
    { id: 'problem', label: 'Problem' },
    { id: 'submissions', label: 'Submissions' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'discussions', label: 'Discussions' }
  ];

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col h-full">
      {sidebarTabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            w-full 
            px-4 
            py-3 
            text-left 
            text-sm 
            font-medium 
            transition-all 
            duration-200 
            ease-in-out
            relative
            ${activeTab === tab.id 
              ? 'text-red-500 bg-red-50' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-red-500'}
          `}
          onClick={() => handleTabClick(tab.id)}
        >
          {activeTab === tab.id && (
            <span 
              className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;