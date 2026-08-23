import React from 'react';
import './BalanceOverview.css';

export default function BalanceOverview({ balance, onAddFunds }) {
  const promptAddFunds = () => {
    const amount = prompt("Enter amount to add:");
    if (amount) onAddFunds(Number(amount));
  };

  return (
    <div className="balance-card">
      <div className="balance-header">
        <div>
          <span className="balance-label">TOTAL AVAILABLE BALANCE</span>
          <div className="balance-row">
            <h1>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
            <span className="badge-growth">↗ +2.4%</span>
          </div>
        </div>
        <button className="add-funds-btn" onClick={promptAddFunds}>+ Add Funds</button>
      </div>
      
      <div className="chart-container">
        <svg viewBox="0 0 500 150" className="smooth-chart">
          <path
            d="M 0,100 Q 75,130 150,70 T 300,10 T 450,40 L 500,20"
            fill="none"
            stroke="#0052cc"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
}