import React from 'react';
import './Transactions.css';

export default function Transactions({ transactions }) {
  return (
    <div className="transactions-panel">
      <div className="panel-header">
        <h3>Recent Transactions</h3>
        <button className="view-all">View All</button>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ACTION</th>
            <th>DATE & TIME</th>
            <th>BALANCE AFTER</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(item => (
            <tr key={item.id}>
              <td className="desc-cell">
                <div className="trans-icon">💳</div>
                <div>
                  <p className="title">{item.action}</p>
                </div>
              </td>
              <td className="date-cell">{item.time}</td>
              <td><span className="category-pill">${item.balance.toFixed(2)}</span></td>
              <td className={`amount-cell ${item.amount < 0 ? 'negative' : 'positive'}`}>
                {item.amount < 0 ? `-$${Math.abs(item.amount).toFixed(2)}` : `+$${item.amount.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}