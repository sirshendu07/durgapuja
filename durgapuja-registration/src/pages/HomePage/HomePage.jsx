import React from 'react';
import ActionMenu from '../../components/home/ActionMenu/ActionMenu';
import { Music, Video, Mic, Guitar, Sparkles } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  const PERFORMANCE_EVENTS = [
    { name: 'Music (সঙ্গীত)', icon: <Music size={20} /> },
    { name: 'Dance (নৃত্য)', icon: <Video size={20} /> },
    { name: 'Drama (নাটক)', icon: <Sparkles size={20} /> },
    { name: 'Recitation (আবৃত্তি)', icon: <Mic size={20} /> },
    { name: 'Guitar (গিটার)', icon: <Guitar size={20} /> },
    { name: 'Others (অন্যান্য)', icon: <Sparkles size={20} /> }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h2>Welcome to Puja 2026</h2>
        <p>Society Cultural Portal</p>
      </header>
      
      <main className="home-main">
        <ActionMenu />
        
        <div className="events-section">
          <h3 className="section-title">Available Cultural Events</h3>
          <div className="events-grid">
            {PERFORMANCE_EVENTS.map((event, idx) => (
              <div key={idx} className="event-badge">
                <span className="event-icon">{event.icon}</span>
                <span>{event.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}