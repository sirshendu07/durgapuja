import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import './Registration.css';

export default function Registration() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  // Watch the events array to conditionally show the extra fields
  const selectedEvents = watch('events', []);
  const hasSelectedEvents = selectedEvents.length > 0;

  // --- Real Backend Connection ---
  const onSubmit = async (data) => {
    setServerError('');
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setServerError(error.message || "Registration failed. Please check your connection.");
    }
  };

  // ---------------- SUCCESS SCREEN ----------------
  if (isSuccess) {
    return (
      <div className="registration-container success-container">
        <CheckCircle2 size={80} color="#4ade80" />
        <h2>Registration Successful!</h2>
        <p>Your details have been saved. You can check your registration status at home page.</p>
        <button className="back-btn" onClick={() => navigate('/home')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ---------------- REGISTRATION FORM ----------------
  return (
    <div className="registration-container">
      <div className="form-header">
        <button className="icon-btn" onClick={() => navigate('/home')}><ArrowLeft size={24} /></button>
        <h2>Register for Puja</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-form">
        
        {/* Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" {...register('name', { required: true })} placeholder="Enter your name" />
          {errors.name && <span className="error">Name is required</span>}
        </div>

        {/* Tower & Flat */}
        <div className="form-row">
          <div className="form-group">
            <label>Tower</label>
            <select {...register('tower', { required: true })}>
              <option value="">Select</option>
              <option value="Tower I">Tower I</option>
              <option value="Tower II">Tower II</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Flat No.</label>
            <input type="text" {...register('flatNo', { required: true })} placeholder="e.g. 109" />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" {...register('phone', { required: true, minLength: 10 })} placeholder="10-digit mobile number" />
        </div>

        {/* Gender & Age */}
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select {...register('gender', { required: true })}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Age</label>
            <input type="number" {...register('age', { required: true, min: 1 })} placeholder="Age" />
          </div>
        </div>

        {/* Resident Type */}
        <div className="form-group">
          <label>Resident Type</label>
          <select {...register('residentType', { required: true })}>
            <option value="">Select</option>
            <option value="Owner">Owner</option>
            <option value="Tenant">Tenant</option>
          </select>
        </div>

        {/* Events Checkboxes */}
        <div className="form-group">
          <label>Participate in Events (Optional)</label>
          <div className="checkbox-grid">
            {['Music', 'Dance', 'Drama', 'Recitation', 'Guitar', 'Others'].map((event) => (
              <label key={event} className="checkbox-label">
                <input type="checkbox" value={event} {...register('events')} />
                {event}
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Conditional Fields per Event */}
        {hasSelectedEvents && (
          <div className="conditional-fields animation-fade-in">
            <h3 className="dynamic-section-title">Performance Details</h3>
            
            {selectedEvents.map((event) => (
              <div key={event} className="event-detail-group">
                <h4 className="event-detail-header">{event} Details</h4>
                <div className="form-group">
                  <label>Specify {event} Details</label>
                  <input 
                    type="text" 
                    {...register(`details_${event}`, { required: true })} 
                    placeholder={`What will you perform for ${event}?`} 
                  />
                </div>
                <div className="form-group">
                  <label>Approximate Duration (in minutes)</label>
                  <input 
                    type="number" 
                    {...register(`duration_${event}`, { required: true, min: 1 })} 
                    placeholder="e.g. 5" 
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* API Error Display */}
        {serverError && (
          <div className="error" style={{ textAlign: 'center', marginTop: '10px' }}>
            {serverError}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="spinner" size={20} />
              Submitting, plz wait...
            </>
          ) : (
            'Submit Registration'
          )}
        </button>

      </form>
    </div>
  );
}