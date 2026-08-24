import React from 'react';
import './Header.css';

export default function Header({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="header-search">
        <input type="text" placeholder="Search transactions, accounts..." />
      </div>
      
      <div className="header-actions">
        <div className="user-profile">
          <span className="user-avatar">👤</span>
          <span className="user-name">{user}</span>
        </div>
        
       
        <button className="logout-btn" onClick={onLogout} title="Log out">
          🚪 Logout
        </button>
      </div>
    </header>
  );
}