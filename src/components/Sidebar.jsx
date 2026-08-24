import React from 'react';
import './Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard'},
    { id: 'transactions', label: 'Transactions'},
    { id: 'accounts', label: 'Accounts'},
    { id: 'settings', label: 'Settings'}
  ];

  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo">
        <h2>BankDash</h2>
      </div>

      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}