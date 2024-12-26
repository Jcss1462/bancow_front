import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/user/login/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import SimulationsList from './pages/simulations/simulationList/SimulationsList';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader/Loder';
import Register from './pages/user/register/Register';
import UpdateSimulationForm from './pages/simulations/updateSimulationForm/UpdateSimulationForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/simulations" element={<ProtectedRoute><SimulationsList /></ProtectedRoute>} />
            <Route path="/updateSimulation/:idSimulacion" element={<ProtectedRoute><UpdateSimulationForm /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
        <Loader />
      </div>
    </Router>
  );
}

export default App;
