import React, { useState } from 'react';
import './BalanceOverview.css';

export default function BalanceOverview({ balance = 0, onAddFunds }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  
  const safeBalance = typeof balance === 'number' && !isNaN(balance) 
    ? balance 
    : parseFloat(balance) || 0;

 
  const chartPoints = [
    { month: 'Jan', value: safeBalance * 0.6 },
    { month: 'Feb', value: safeBalance * 0.75 },
    { month: 'Mar', value: safeBalance * 0.65 },
    { month: 'Apr', value: safeBalance * 0.9 },
    { month: 'May', value: safeBalance }
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (!isNaN(val) && val > 0 && typeof onAddFunds === 'function') {
      onAddFunds(val);
      setDepositAmount('');
    }
  };

  return (
    <div className="balance-overview-card">
      <div className="balance-header">
        <div>
          <span className="balance-label">TOTAL AVAILABLE BALANCE</span>
          <h1 className="balance-amount">
            ${safeBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
        </div>

       
        <form onSubmit={handleAdd} className="add-funds-form">
          <input 
            type="number" 
            placeholder="Amount" 
            value={depositAmount} 
            onChange={(e) => setDepositAmount(e.target.value)} 
          />
          <button type="submit" className="add-funds-btn">+ Add Funds</button>
        </form>
      </div>

     
      <div className="chart-container">
        <svg viewBox="0 0 500 120" className="interactive-chart">
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f52ba" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f52ba" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path 
            d="M 20 100 L 120 75 L 220 85 L 320 40 L 480 20 L 480 110 L 20 110 Z" 
            fill="url(#balanceGradient)" 
          />

    
          <path 
            d="M 20 100 L 120 75 L 220 85 L 320 40 L 480 20" 
            fill="none" 
            stroke="#0f52ba" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

         
          {chartPoints.map((pt, index) => {
            const xCoords = [20, 120, 220, 320, 480];
            const yCoords = [100, 75, 85, 40, 20];
            const cx = xCoords[index];
            const cy = yCoords[index];

            return (
              <g 
                key={pt.month} 
                onMouseEnter={() => setHoveredPoint(pt)} 
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle cx={cx} cy={cy} r="6" className="chart-node" />
                <text x={cx} y="118" textAnchor="middle" className="chart-label">{pt.month}</text>
              </g>
            );
          })}
        </svg>

        {hoveredPoint && (
          <div className="chart-tooltip">
            {hoveredPoint.month}: ${hoveredPoint.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        )}
      </div>
    </div>
  );
}