import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Bank Manager</h2>
        <span className="sub-brand">Private Wealth</span>
      </div>
      <ul className="sidebar-menu">
        <li className="active"><i></i> Dashboard</li>
        <li><i></i> Accounts</li>
        <li><i></i> Transactions</li>
        <li><i></i> Payments</li>
        <li><i></i> Cards</li>
        <li><i></i> Analytics</li>
      </ul>
      <div className="sidebar-footer">
        <button className="support-btn">Support</button>
        <button className="logout-btn"><i>🚪</i> Log out</button>
      </div>
    </aside>
  );
}