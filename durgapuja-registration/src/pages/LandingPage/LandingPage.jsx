import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div className="landing-container">
      <div className="animation-wrapper">
        <h1 className="durga-text">SHARODOTSAV 2026</h1>
        <p className="society-text">SOLARIS BONHOOGHLY ASSOCIATION OF APARTMENT OWNERS PHASE -1</p>
      </div>
      
      <button className="enter-button" onClick={handleEnter}>
        Enter Portal
      </button>
    </div>
  );
}