import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Problems from './pages/Problems/Page';
import Tasks from './pages/Tasks/Tasks';
import Ranking from './pages/Ranking/Ranking';
import Store from './pages/Store';
import Cart from './pages/Cart';
import CreateProblem from './pages/CreateProblem';
import ProblemList from './pages/ProblemList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeamPage from './pages/TeamPage';
import Dashboard from './pages/Home/Page';
import LandingPage from './pages/LandingPage/Page';
import { CartProvider } from './contexts/CartContext';
import GoogleReg from './pages/GoogleReg';
import ProfilePage from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Roadmap from './pages/Roadmap/Page';
import StoreManagement from './pages/StoreManagement';
import ImageUploaderCloudinary from './pages/ImageUploaderCloudinary'
import ManageUsers from './pages/ManageUsers';
import ManageProblems from './pages/ManageProblems';
import EditProfile from './pages/EditProfile';
import PurchaseManager from './pages/PurchaseManager';
import CodeLayout from './pages/Code/CodeLayout';
import CodeDashboard from './pages/Code/CodeDashboard/Page';
import Commits from './pages/Code/Commits/Page';
import PullRequests from './pages/Code/PullRequests/Page';
import RecommendedResources from './pages/Code/RecommendedResources/Page';
import BotStore from './pages/Home/BotStore';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import CommitFeedback from './pages/Code/Commits/CommitFeedback/Page';
import CreateTeamPage from "@/pages/CreateTeamPage";
import JoinTeamPage from "@/pages/JoinTeamPage";

// 1. Layout que incluye la Navbar
function LayoutConNavbar() {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
      <Router>
        <Routes>
          {/* 2. Ruta que NO muestra la Navbar (LandingPage) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/GoogleReg" element={<GoogleReg />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 3. Ruta con Navbar */}
          <Route element={<LayoutConNavbar />}>
          
            <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            <Route path="/manage-problems" element={<AdminRoute><ManageProblems /></AdminRoute>} />
            <Route path="/problemList" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
            <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
            <Route path="/problemList/problem/:problemId" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
            <Route path="/problems" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
            <Route path="/problems/create" element={<ProtectedRoute><CreateProblem /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
            <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
            <Route path="/store/manage" element={<AdminRoute><StoreManagement /></AdminRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/team/:teamId" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute><ImageUploaderCloudinary /></ProtectedRoute>} />
            <Route path="/Profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/profile/view" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/manage-purchase" element={<ProtectedRoute><PurchaseManager /></ProtectedRoute>} />
            <Route path="/teams/create" element={<ProtectedRoute><CreateTeamPage /></ProtectedRoute>} />
            <Route path="/teams/join" element={<ProtectedRoute><JoinTeamPage /></ProtectedRoute>} />
            <Route element={<ProtectedRoute><CodeLayout /></ProtectedRoute>}>

              <Route path="/CodeDashboard" element={<CodeDashboard />} />
              <Route path="/Commits" element={<Commits />} />
              <Route path="/PullRequests" element={<PullRequests />} />
              <Route path="/RecommendedResources" element={<RecommendedResources />} />
              <Route path="/CommitFeedback" element={<CommitFeedback/>} />
            </Route>

            <Route path="/bot-store" element={<ProtectedRoute><BotStore /></ProtectedRoute>} />
          
          </Route>
        </Routes>
      </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
