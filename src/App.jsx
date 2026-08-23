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

export default function App() {
  const [account, setAccount] = useState({
    accountName: "Alexander Smith",
    accountNumber: "1002345678",
    iban: "KB0011002345678",
    balance: 124592.00,
    dailyCreditLimit: 50000,
    monthlyCreditLimit: 500000,
    dailyDebitLimit: 2000,
    monthlyDebitLimit: 300000,
    dailyCreditUsed: 0,
    monthlyCreditUsed: 4500,
    dailyDebitUsed: 1200,
    monthlyDebitUsed: 0,
    transactionHistory: [
      { id: 1, name: "Whole Foods Market", sub: "Debit Card", date: "Today, 10:42 AM", category: "Grocery", amount: -142.50, type: "debit" },
      { id: 2, name: "Tech Corp Inc.", sub: "Direct Deposit", date: "Yesterday", category: "Salary", amount: 4250.00, type: "credit" },
      { id: 3, name: "City Power & Light", sub: "Autopay", date: "Oct 24, 2023", category: "Bills", amount: -85.00, type: "debit" },
    ]
  });

  const handleCredit = (amount) => {
    if (amount <= 0) return alert("Invalid credit amount.");
    if (account.dailyCreditUsed + amount > account.dailyCreditLimit) return alert("Daily credit limit exceeded.");
    
    setAccount(prev => ({
      ...prev,
      balance: prev.balance + amount,
      dailyCreditUsed: prev.dailyCreditUsed + amount,
      monthlyCreditUsed: prev.monthlyCreditUsed + amount,
      transactionHistory: [
        {
          id: Date.now(),
          name: "Deposit / Add Funds",
          sub: "Manual Deposit",
          date: "Just now",
          category: "Deposit",
          amount: amount,
          type: "credit"
        },
        ...prev.transactionHistory
      ]
    }));
  };

  const handleDebit = (recipientName, amount) => {
    if (amount <= 0) return alert("Invalid debit amount.");
    if (account.dailyDebitUsed + amount > account.dailyDebitLimit) return alert("Daily debit limit exceeded.");
    if (amount > account.balance) return alert("Insufficient Balance.");

    setAccount(prev => ({
      ...prev,
      balance: prev.balance - amount,
      dailyDebitUsed: prev.dailyDebitUsed + amount,
      monthlyDebitUsed: prev.monthlyDebitUsed + amount,
      transactionHistory: [
        {
          id: Date.now(),
          name: `Transfer to ${recipientName}`,
          sub: "Quick Transfer",
          date: "Just now",
          category: "Transfer",
          amount: -amount,
          type: "debit"
        },
        ...prev.transactionHistory
      ]
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
            <AccountCards />
            <Transactions transactions={account.transactionHistory} />
          </div>
          <div className="side-content-column">
            <MyCard accountName={account.accountName} />
            <QuickTransfer onTransfer={handleDebit} />
            <UsageLimits account={account} />
          </div>
        </div>
      </div>
    </div>
  );
}