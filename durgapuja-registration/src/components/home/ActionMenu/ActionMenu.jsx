import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardEdit, Search, Bell } from 'lucide-react';
import './ActionMenu.css';

export default function ActionMenu() {
  // Initialize the navigate function
  const navigate = useNavigate();

  return (
    <div className="action-menu">
      {/* Added onClick to navigate to /register */}
      <button 
        className="action-btn primary-btn" 
        onClick={() => navigate('/register')}
      >
        <ClipboardEdit size={24} />
        <span>Register Now</span>
      </button>
      
      <div className="secondary-actions">
        {/* Added onClick to navigate to /status */}
        <button 
          className="action-btn glass-btn"
          onClick={() => navigate('/status')}
        >
          <Search size={20} />
          <span>Check Status</span>
        </button>
        
       
      </div>
    </div>
  );
}