import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import './EventCard.css';

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-info">
        <h4 className="event-title">{event.title}</h4>
        <div className="event-details">
          <span className="detail-item"><Calendar size={14} /> {event.date}</span>
          <span className="detail-item"><Clock size={14} /> {event.time}</span>
        </div>
      </div>
      <div className="event-tag">{event.type}</div>
    </div>
  );
}