import React from 'react';
import './UsageLimits.css';

export default function UsageLimits({ account }) {
  const dailyPercent = (account.dailyDebitUsed / account.dailyDebitLimit) * 100;

  return (
    <div className="usage-limits-panel">
      <h3>Usage Limits</h3>
      
      <div className="limit-item">
        <div className="limit-info">
          <span>Daily Debit Limit</span>
          <span>${account.dailyDebitUsed} / ${account.dailyDebitLimit}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${dailyPercent}%` }}></div>
        </div>
      </div>

      <div className="limit-item">
        <div className="limit-info">
          <span>Monthly Credit</span>
          <span>${account.monthlyCreditUsed} / ${account.monthlyCreditLimit}</span>
        </div>
      </div>
    </div>
  );
}