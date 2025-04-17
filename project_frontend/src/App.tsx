import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Problems from './pages/Problems';
import Tasks from './pages/Tasks';
import Code from './pages/Code';
import Ranking from './pages/Ranking';
import Store from './pages/Store';
import Cart from './pages/Cart';
import CreateProblem from './pages/CreateProblem';
import ProblemList from './pages/ProblemList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './components/ProfilePage';
import TeamPage from './components/TeamPage';
import Dashboard from './components/Dashboard';
import LandingPage from './pages/Landing'; // <-- Tu nueva página
import { CartProvider } from './contexts/CartContext';
import PullRequest from './pages/PullRequest';

import Roadmap from './pages/Roadmap';
import SpaceBackground from './components/SpaceBackground';
import StoreManagement from './pages/StoreManagement';
import ImageUploaderCloudinary from './pages/ImageUploaderCloudinary'
// 1. Layout que incluye la Navbar
function LayoutConNavbar() {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <Navbar />
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* 2. Ruta que NO muestra la Navbar (LandingPage) */}
          <Route path="/landing" element={<LandingPage />} />

          {/* 3. Ruta con Navbar */}
          <Route element={<LayoutConNavbar />}>
            <Route path="/space" element={<SpaceBackground />} />
            <Route path="/" element={<Dashboard />} /> {/* Dashboard as default */}
            <Route path="/problemList" element={<ProblemList />} />
            <Route path="/roadmap" element={<Roadmap/>} />
            <Route path="/problemList/problem/:problemId" element={<Problems />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/create" element={<CreateProblem />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/code" element={<Code />} />
            <Route path="/code/detail/:id" element={<PullRequest />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/manage" element={<StoreManagement />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/test" element={<ImageUploaderCloudinary />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
