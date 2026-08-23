import React from 'react';
import './Header.css';

export default function Header({ user }) {
  return (
    <header className="header">
      <div className="search-bar">
        <i>🔍</i>
        <input type="text" placeholder="Search transactions, accounts..." />
      </div>
      <div className="header-actions">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        <div className="user-avatar">
          <img src="https://i.pravatar.cc/40?img=12" alt={user} />
        </div>
      </div>
    </header>
  );
}