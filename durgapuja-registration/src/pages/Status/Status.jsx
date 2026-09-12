import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, XCircle, User, Home, CheckCircle2 } from 'lucide-react';
import './Status.css';

export default function Status() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [statusResult, setStatusResult] = useState(null); 
  const [userData, setUserData] = useState([]); 

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://durgapuja-rl3z.onrender.com/api/status/${data.phone}`);
      const result = await response.json();

      if (response.ok) {
        setStatusResult('found'); 
        setUserData(result.data); 
      } else {
        setStatusResult('not_found');
        setUserData([]);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
      setStatusResult('not_found');
      setUserData([]);
    }
  };

  const resetSearch = () => {
    setStatusResult(null);
    setUserData([]);
  };

  return (
    <div className="status-container">
      <div className="form-header">
        <button className="icon-btn" onClick={() => navigate('/home')}>
          <ArrowLeft size={24} />
        </button>
        <h2>Check Status</h2>
      </div>

      {!statusResult ? (
        <form onSubmit={handleSubmit(onSubmit)} className="glass-card search-form">
          <p className="instruction-text">Enter your registered 10-digit mobile number.</p>
          
          <div className="form-group">
            <input 
              type="tel" 
              {...register('phone', { required: true, minLength: 10, maxLength: 10 })} 
              placeholder="e.g. 9876543210" 
              className="status-input"
            />
            {errors.phone && <span className="error">Valid 10-digit number required</span>}
          </div>

          <button type="submit" className="submit-btn search-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="spinner" size={20} /> Searching...</>
            ) : (
              <><Search size={20} /> Check Now</>
            )}
          </button>
        </form>
      ) : (
        <div className={`glass-card result-card ${statusResult}`}>
          
          {statusResult === 'not_found' ? (
            <div className="status-header-section">
              <XCircle size={60} className="result-icon not-found-icon" />
              <h3>No Record Found</h3>
              <p>We couldn't find a registration matching this phone number.</p>
            </div>
          ) : (
            <div className="multiple-users-list">
              <h3 style={{ marginBottom: '15px' }}>Found {userData.length} Registration(s)</h3>
              
              {userData.map((user, index) => (
                <div key={index} className="user-details-box">
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <CheckCircle2 size={18} color="#4ade80"/>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>APPROVED</span>
                  </div>

                  <h4 className="details-title">{user.name}</h4>
                  
                  <div className="detail-row">
                    <span className="detail-label"><User size={16}/> Details</span>
                    <span className="detail-value">{user.gender}, {user.age} yrs</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label"><Home size={16}/> Address</span>
                    <span className="detail-value">{user.tower}, Flat {user.flatNo}</span>
                  </div>

                  {/* Displays up to 6 events if they exist in the database */}
                  {user.activity1 && (
                    <div className="detail-row events-row">
                      <span className="detail-label">Participating In:</span>
                      <div className="event-tags">
                        <span className="event-tag-small">{user.activity1}</span>
                        {user.activity2 && <span className="event-tag-small">{user.activity2}</span>}
                        {user.activity3 && <span className="event-tag-small">{user.activity3}</span>}
                        {user.activity4 && <span className="event-tag-small">{user.activity4}</span>}
                        {user.activity5 && <span className="event-tag-small">{user.activity5}</span>}
                        {user.activity6 && <span className="event-tag-small">{user.activity6}</span>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button className="back-btn mt-20" onClick={resetSearch}>
            Check Another Number
          </button>
        </div>
      )}
    </div>
  );
}