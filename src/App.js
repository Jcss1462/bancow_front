import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/user/login/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import SimulationsList from './pages/simulations/simulationList/SimulationsList';
import CreateSimulationForm from './pages/simulations/createSimulationForm/CreateSimulationForm';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/simulations" element={<ProtectedRoute><SimulationsList /></ProtectedRoute>} />
            <Route path="/simulation/:id" element={<ProtectedRoute><CreateSimulationForm /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
