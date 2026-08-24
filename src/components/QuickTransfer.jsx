import React, { useState } from 'react';
import './QuickTransfer.css';

export default function QuickTransfer({ onTransfer, accounts }) {
  // Store recipient targets dynamically in local state
  const [recipients, setRecipients] = useState([
    { key: 'user2', name: accounts?.user2?.accountName || 'Ahmad A', avatar: '👨‍💼' }
  ]);

  const [selectedRecipient, setSelectedRecipient] = useState(recipients[0]);
  const [amount, setAmount] = useState('');
  
  // Modal state for adding a new target recipient
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const handleSendMoney = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid transfer amount.");
      return;
    }

    if (typeof onTransfer === 'function') {
      onTransfer(selectedRecipient.key, numericAmount);
      setAmount('');
    }
  };

  const handleAddRecipient = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    // Create a new recipient entry
    const newKey = `user_${Date.now()}`;
    const newRecipient = {
      key: newKey,
      name: newName.trim(),
      avatar: '👤'
    };

    setRecipients(prev => [...prev, newRecipient]);
    setSelectedRecipient(newRecipient);
    setNewName('');
    setIsModalOpen(false);
  };

  return (
    <div className="quick-transfer-panel">
      <h3>Quick Transfer</h3>
      
      {/* Recipient Selection Bar */}
      <div className="avatar-list">
        <button 
          type="button" 
          className="add-avatar-btn" 
          title="Add new recipient"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        {recipients.map((user) => (
          <div 
            key={user.key} 
            className={`user-target ${selectedRecipient.key === user.key ? 'selected' : ''}`}
            onClick={() => setSelectedRecipient(user)}
          >
            <div className="avatar-box">{user.avatar}</div>
            <span className="user-name">{user.name}</span>
          </div>
        ))}
      </div>

     
      <form onSubmit={handleSendMoney} className="transfer-form">
        <div className="transfer-input-container">
          <span className="currency-symbol">$</span>
          <input 
            type="number" 
            placeholder="0.00" 
            step="any"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="send-btn">
          Send Money to {selectedRecipient.name} ➔
        </button>
      </form>

      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Add New Recipient</h4>
            <form onSubmit={handleAddRecipient}>
              <input 
                type="text" 
                placeholder="Enter recipient name" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                required 
                autoFocus
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="confirm-btn">
                  Add Person
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}