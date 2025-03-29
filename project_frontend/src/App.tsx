import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Problems from './pages/Problems';
import Tasks from './pages/Tasks';
import Code from './pages/Code';
import Ranking from './pages/Ranking';
import Store from './pages/Store';
import Cart from './pages/Cart';
import CreateProblem from './pages/CreateProblem';
import ProblemList from './pages/ProblemList';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#1e1e1e]">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProblemList />} />
            <Route path="/problemList" element={<ProblemList />} /> {/* Ensure this route exists for the ProblemList */}
            <Route path="/problemList/problem/:problemId" element={<Problems />} /> {/* Problem route for individual problems */}
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/create" element={<CreateProblem />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/code" element={<Code />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
