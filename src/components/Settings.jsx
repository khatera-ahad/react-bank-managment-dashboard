import React from 'react';
import './Settings.css';

export default function Settings({ user, onLogout }) {
  return (
    <div className="settings-panel">
      <h3>Account Settings</h3>
      
      <div className="settings-section">
        <h4>Profile Details</h4>
        <p><strong>Name:</strong> {user.accountName}</p>
        <p><strong>Account Number:</strong> {user.accountNumber}</p>
        <p><strong>IBAN:</strong> {user.iban}</p>
      </div>

      <div className="settings-section">
        <h4>Preferences & Security</h4>
        <div className="setting-option">
          <span>Two-Factor Authentication (2FA)</span>
          <button className="secondary-btn">Enable</button>
        </div>
        <div className="setting-option">
          <span>Email Notifications</span>
          <button className="secondary-btn">Configure</button>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h4>Session</h4>
        <p>Log out of your active session on this device.</p>
        <button className="logout-btn-large" onClick={onLogout}>
          Log Out of Account
        </button>
      </div>
    </div>
  );
}