import React, { useState } from 'react';
import './QuickTransfer.css';

export default function QuickTransfer({ onTransfer }) {
  const [selectedUser, setSelectedUser] = useState('Ahmad');
  const [amount, setAmount] = useState('');

  const users = [
    { name: 'Ahmad', img: 'https://i.pravatar.cc/40?img=11' },
    { name: 'Fatima', img: 'https://i.pravatar.cc/40?img=5' },
    { name: 'Nawid', img: 'https://i.pravatar.cc/40?img=3' },
  ];

  const handleSend = () => {
    if (amount > 0) {
      onTransfer(selectedUser, Number(amount));
      setAmount('');
    }
  };

  return (
    <div className="quick-transfer-panel">
      <h3>Quick Transfer</h3>
      <div className="avatar-list">
        <div className="add-avatar">+</div>
        {users.map(u => (
          <div 
            key={u.name} 
            className={`user-target ${selectedUser === u.name ? 'selected' : ''}`}
            onClick={() => setSelectedUser(u.name)}
          >
            <img src={u.img} alt={u.name} />
            <span>{u.name}</span>
          </div>
        ))}
      </div>
      <div className="transfer-input">
        <span>$</span>
        <input 
          type="number" 
          placeholder="0.00" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
      </div>
      <button className="send-btn" onClick={handleSend}>Send Money ➔</button>
    </div>
  );
}