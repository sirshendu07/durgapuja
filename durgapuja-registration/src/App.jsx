import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration';
import Status from './pages/Status/Status';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entry point */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Main Dashboard */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Action Pages */}
        <Route path="/register" element={<Registration />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;