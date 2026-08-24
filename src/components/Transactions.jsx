import React, { useState } from 'react';
import './Transactions.css';

export default function Transactions({ transactions = [], currentAccount }) {
  const [showAll, setShowAll] = useState(false);

  if (!currentAccount) {
    return <div className="transactions-panel">Loading account details...</div>;
  }

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 3);

  return (
    <div className="transactions-panel">
      <div className="panel-header">
        <div>
          <h3>Recent Transactions</h3>
          <p className="account-meta-subtitle">
            Account: <strong>{currentAccount.accountName}</strong> | Acc #: {currentAccount.accountNumber} | IBAN: {currentAccount.iban}
          </p>
        </div>
        
        <button 
          className="view-all" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>ACCOUNT & TRANSACTION DETAILS</th>
            <th>DATE & TIME</th>
            <th>BRANCH & IBAN</th>
            <th className="text-right">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#697586' }}>
                No transactions available.
              </td>
            </tr>
          ) : (
            displayedTransactions.map((item) => (
              <tr key={item.id}>
                <td className="desc-cell">
                  <div className={`trans-icon ${item.type}`}>
                    {item.type === 'credit' ? '' : ''}
                  </div>
                  <div className="account-details">
                    <p className="title">{item.action}</p>
                    <p className="sub-detail">
                      Target/Sender: <strong>{item.targetName || currentAccount.accountName}</strong>
                    </p>
                    <p className="sub-detail-small">
                      Acc #: {item.targetAccNumber || currentAccount.accountNumber}
                    </p>
                  </div>
                </td>

                <td className="date-cell">
                  <div>{item.time}</div>
                  <span className="balance-after">
                    Bal: ${item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </td>

                <td className="branch-cell">
                  <p className="branch-name">{item.branchName || currentAccount.branch?.branchName}</p>
                  <p className="iban-code">{item.iban || currentAccount.iban}</p>
                </td>

                <td className={`amount-cell text-right ${item.type}`}>
                  {item.amount < 0 
                    ? `-$${Math.abs(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
                    : `+$${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}