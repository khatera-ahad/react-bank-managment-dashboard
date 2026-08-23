import React from 'react';
import './AccountCards.css';

export default function AccountCards() {
  const accounts = [
    { type: 'Checking', number: '1234', amount: '$45,210.50', status: 'Active', icon: '🏦' },
    { type: 'Savings', number: '5678', amount: '$72,000.00', status: 'Active', icon: '🐷' },
    { type: 'Credit', number: '9012', amount: '$7,381.50', status: 'Active', icon: '💳' },
  ];

  return (
    <div className="account-cards-grid">
      {accounts.map((acc, i) => (
        <div key={i} className="mini-account-card">
          <div className="card-top">
            <span className="acc-icon">{acc.icon}</span>
            <span className="status-badge">{acc.status}</span>
          </div>
          <h3>{acc.amount}</h3>
          <p>{acc.type} •••• {acc.number}</p>
        </div>
      ))}
    </div>
  );
}