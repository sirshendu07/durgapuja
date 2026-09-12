import React from 'react';
import EventCard from '../EventCard/EventCard';
import './EventList.css';

const PUJA_EVENTS = [
  { id: 1, title: 'Maha Saptami Puja', time: '08:00 AM', date: 'Oct 18', type: 'Puja' },
  { id: 2, title: 'Ashtami Pushpanjali', time: '09:30 AM', date: 'Oct 19', type: 'Anjali' },
  { id: 3, title: 'Sandhi Puja', time: '11:45 PM', date: 'Oct 19', type: 'Special' },
  { id: 4, title: 'Sindoor Khela', time: '04:00 PM', date: 'Oct 22', type: 'Visarjan' },
];

export default function EventList() {
  return (
    <div className="event-list-container">
      <h3 className="section-title">Event Schedule</h3>
      <div className="event-list">
        {PUJA_EVENTS.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}