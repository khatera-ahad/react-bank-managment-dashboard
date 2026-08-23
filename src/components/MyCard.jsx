import React from 'react';
import './MyCard.css';

export default function MyCard({ accountName }) {
  return (
    <div className="my-card-panel">
      <div className="panel-header">
        <h3>My Card</h3>
        <span>•••</span>
      </div>
      <div className="credit-card">
        <div className="card-top-row">
          <span className="brand">VISA</span>
          <span className="contactless">📶</span>
        </div>
        <div className="card-number">•••• •••• •••• 9012</div>
        <div className="card-bottom">
          <div>
            <label>CARD HOLDER</label>
            <p>{accountName.toUpperCase()}</p>
          </div>
          <div>
            <label>EXPIRES</label>
            <p>12/25</p>
          </div>
        </div>
      </div>
      <div className="card-quick-actions">
        <button>❄️ Freeze</button>
        <button>🔗 Details</button>
        <button>⚙️ Settings</button>
      </div>
    </div>
  );
}