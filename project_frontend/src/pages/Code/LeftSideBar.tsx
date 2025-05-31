import {
  BookOpen,
  GitCommitHorizontal,
  GitPullRequest,
  Home
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: <Home size={24} />, path: "/CodeDashboard", title: "Dashboard" },
  { icon: <GitCommitHorizontal size={24} />, path: "/Commits", title: "Commits" },
  { icon: <GitPullRequest size={24} />, path: "/PullRequests", title: "Pull Requests" },
  { icon: <BookOpen size={24} />, path: "/RecommendedResources", title: "Recursos" }
];

export default function LeftSidebar() {
  return (
    <div className="fixed top-[60px] left-0 w-16 h-[calc(100vh-60px)] bg-gray-900 text-white border-r border-red-700 z-40 flex flex-col items-center py-6 space-y-6 shadow-md">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          title={item.title}
          className={({ isActive }) =>
            `w-full flex justify-center transition-all duration-300 ease-in-out group
            ${isActive ? "bg-red-700 shadow-inner" : "hover:bg-gray-800"}`
          }
        >
          <div
            className={`
              p-2 rounded-md
              transition-transform duration-300 ease-in-out
              group-hover:scale-110 group-hover:shadow-md
              ${window.location.pathname === item.path ? "text-white" : "text-gray-300"}
            `}
          >
            {item.icon}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
