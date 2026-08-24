import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BalanceOverview from './components/BalanceOverview';
import AccountCards from './components/AccountCards';
import Transactions from './components/Transactions';
import MyCard from './components/MyCard';
import QuickTransfer from './components/QuickTransfer';
import UsageLimits from './components/UsageLimits';
import './App.css';

// Branch info object from your original JS file
const defaultBranch = {
  branchName: "Kabul Main Branch",
  branchCode: "KB001",
};

export default function App() {
  // Initialize state with Sara A's account setup from your original JS code
  const [account, setAccount] = useState({
    accountName: "Sara A",
    branch: defaultBranch,
    accountNumber: Math.floor(10000000000 + Math.random() * 9000000000),
    iban: `${defaultBranch.branchCode}${Math.floor(10000000000 + Math.random() * 9000000000)}`,
    balance: 1000, // Initial deposit from your JS script
    
    // Limits
    dailyCreditLimit: 50000,
    monthlyCreditLimit: 500000,
    dailyDebitLimit: 30000,
    monthlyDebitLimit: 300000,
    
    // Usage counters
    dailyCreditUsed: 0,
    monthlyCreditUsed: 0,
    dailyDebitUsed: 0,
    monthlyDebitUsed: 0,

    // Initial transaction log matching your JS logic
    transactionHistory: [
      {
        id: 1,
        time: new Date().toLocaleString(),
        action: "Initial Deposit",
        amount: 1000,
        balance: 1000,
        type: "credit"
      }
    ]
  });

  // Re-creating your JS credit function inside React state
  const handleCredit = (amount) => {
    if (amount <= 0) {
      alert("Invalid credit amount.");
      return;
    }
    if (account.dailyCreditUsed + amount > account.dailyCreditLimit) {
      alert("Daily credit limit exceeded.");
      return;
    }
    if (account.monthlyCreditUsed + amount > account.monthlyCreditLimit) {
      alert("Monthly credit limit exceeded.");
      return;
    }

    const newBalance = account.balance + amount;
    const newTransaction = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      action: "Credit Deposit",
      amount: amount,
      balance: newBalance,
      type: "credit"
    };

    setAccount(prev => ({
      ...prev,
      balance: newBalance,
      dailyCreditUsed: prev.dailyCreditUsed + amount,
      monthlyCreditUsed: prev.monthlyCreditUsed + amount,
      transactionHistory: [newTransaction, ...prev.transactionHistory]
    }));
  };

  // Re-creating your JS debit function inside React state
  const handleDebit = (recipientName, amount) => {
    if (amount <= 0) {
      alert("Invalid debit amount.");
      return;
    }
    if (account.dailyDebitUsed + amount > account.dailyDebitLimit) {
      alert("Daily debit limit exceeded.");
      return;
    }
    if (account.monthlyDebitUsed + amount > account.monthlyDebitLimit) {
      alert("Monthly debit limit exceeded.");
      return;
    }
    if (amount > account.balance) {
      alert("Insufficient Balance.");
      return;
    }

    const newBalance = account.balance - amount;
    const newTransaction = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      action: `Transfer to ${recipientName}`,
      amount: -amount,
      balance: newBalance,
      type: "debit"
    };

    setAccount(prev => ({
      ...prev,
      balance: newBalance,
      dailyDebitUsed: prev.dailyDebitUsed + amount,
      monthlyDebitUsed: prev.monthlyDebitUsed + amount,
      transactionHistory: [newTransaction, ...prev.transactionHistory]
    }));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header user={account.accountName} />
        <div className="dashboard-grid">
          <div className="main-content-column">
            <BalanceOverview balance={account.balance} onAddFunds={handleCredit} />
            <AccountCards mainBalance={account.balance} accountNumber={account.accountNumber} />
            <Transactions transactions={account.transactionHistory} />
          </div>
          <div className="side-content-column">
            <MyCard accountName={account.accountName} iban={account.iban} />
            <QuickTransfer onTransfer={handleDebit} />
            <UsageLimits account={account} />
          </div>
        </div>
      </div>
    </div>
  );
}