import React from 'react';
import './AccountCards.css';

export default function AccountCards({ accounts }) {
  // Extract account list dynamically from state props
  const accountList = accounts ? Object.values(accounts) : [];

  return (
    <div className="account-cards-panel">
      <h3>Active Accounts</h3>

      <div className="account-cards-list">
        {accountList.map((account, index) => {
          const balance = typeof account.balance === 'number' && !isNaN(account.balance)
            ? account.balance
            : parseFloat(account.balance) || 0;

          return (
            <div key={account.accountNumber || index} className="account-card-item">
              <div className="account-card-header">
                <div>
                  <span className="account-type-badge">Primary Savings</span>
                  <h4 className="account-holder-name">{account.accountName}</h4>
                </div>
                <span className="bank-logo-icon"></span>
              </div>

              <div className="account-card-body">
                <div className="account-info-group">
                  <span className="info-label">Account Number</span>
                  <span className="info-value">
                    {account.accountNumber ? `**** ${String(account.accountNumber).slice(-4)}` : 'N/A'}
                  </span>
                </div>

                <div className="account-info-group">
                  <span className="info-label">Branch</span>
                  <span className="info-value">{account.branch?.branchName || 'Main Branch'}</span>
                </div>
              </div>

              <div className="account-card-footer">
                <span className="balance-caption">Available Balance</span>
                <span className="account-balance-text">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}