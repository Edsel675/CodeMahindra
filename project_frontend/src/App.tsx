import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Problems from './pages/Problems';
import Tasks from './pages/Tasks';
import Code from './pages/Code';
import Ranking from './pages/Ranking';
import Store from './pages/Store';
import Cart from './pages/Cart';
import CreateProblem from './pages/CreateProblem';
import { CartProvider } from './contexts/CartContext';

// Importa los componentes de login y registro
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#1e1e1e]">
          <Navbar />
          <Routes>
            {/* Rutas existentes */}
            <Route path="/" element={<Problems />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/create" element={<CreateProblem />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/code" element={<Code />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />

            {/* Rutas de Login y Registro */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;