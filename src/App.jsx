import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BalanceOverview from './components/BalanceOverview';
import AccountCards from './components/AccountCards';
import Transactions from './components/Transactions';
import MyCard from './components/MyCard';
import QuickTransfer from './components/QuickTransfer';
import UsageLimits from './components/UsageLimits';
import Settings from './components/Settings';
import './App.css';

const defaultBranch = {
  branchName: "Kabul Main Branch",
  branchCode: "KB001",
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [accounts, setAccounts] = useState({
    user1: {
      accountName: "Sara A",
      branch: defaultBranch,
      accountNumber: 1002345678,
      iban: "KB0011002345678",
      balance: 4850.00,
      dailyCreditLimit: 50000,
      monthlyCreditLimit: 500000,
      dailyDebitLimit: 30000,
      monthlyDebitLimit: 300000,
      dailyCreditUsed: 1200,
      monthlyCreditUsed: 5000,
      dailyDebitUsed: 350,
      monthlyDebitUsed: 1500,
      transactionHistory: [
        { 
          id: 101, 
          time: "8/24/2026, 11:30:00 AM", 
          action: "Salary Transfer", 
          targetName: "Kabul Main Branch",
          targetAccNumber: 1002345678,
          iban: "KB0011002345678",
          branchName: "Kabul Main Branch",
          amount: 2500, 
          balance: 4850.00, 
          type: "credit" 
        }
      ]
    },
    user2: {
      accountName: "Ahmad A",
      branch: defaultBranch,
      accountNumber: 1009876543,
      iban: "KB0011009876543",
      balance: 5000.00,
      dailyCreditLimit: 50000,
      monthlyCreditLimit: 500000,
      dailyDebitLimit: 30000,
      monthlyDebitLimit: 300000,
      dailyCreditUsed: 0,
      monthlyCreditUsed: 0,
      dailyDebitUsed: 0,
      monthlyDebitUsed: 0,
      transactionHistory: []
    }
  });

  const activeUser = accounts.user1;

  // Add credit funds handler
  const handleCredit = (amount) => {
    if (amount <= 0) return alert("Invalid credit amount.");
    if (activeUser.dailyCreditUsed + amount > activeUser.dailyCreditLimit) {
      return alert("Daily credit limit exceeded.");
    }

    setAccounts(prev => {
      const updatedBalance = prev.user1.balance + amount;
      return {
        ...prev,
        user1: {
          ...prev.user1,
          balance: updatedBalance,
          dailyCreditUsed: prev.user1.dailyCreditUsed + amount,
          monthlyCreditUsed: prev.user1.monthlyCreditUsed + amount,
          transactionHistory: [
            { 
              id: Date.now(), 
              time: new Date().toLocaleString(), 
              action: "Credit Deposit", 
              targetName: prev.user1.accountName,
              targetAccNumber: prev.user1.accountNumber,
              iban: prev.user1.iban,
              branchName: prev.user1.branch.branchName,
              amount, 
              balance: updatedBalance, 
              type: "credit" 
            },
            ...prev.user1.transactionHistory
          ]
        }
      };
    });
  };

  // Transfer funds handler
  const handleTransfer = ({ targetKey, targetName, targetAccNumber, amount }) => {
    const sender = accounts.user1;

    if (amount <= 0) return alert("Invalid transfer amount.");
    if (sender.dailyDebitUsed + amount > sender.dailyDebitLimit) return alert("Daily debit limit exceeded.");
    if (amount > sender.balance) return alert("Insufficient balance.");

    setAccounts(prev => {
      const senderNewBalance = prev.user1.balance - amount;
      const timestamp = new Date().toLocaleString();

      const newSenderHistoryItem = { 
        id: Date.now(), 
        time: timestamp, 
        action: `Transfer to ${targetName}`, 
        targetName: targetName,
        targetAccNumber: targetAccNumber || 'N/A',
        iban: `KB001${targetAccNumber || '000000'}`,
        branchName: defaultBranch.branchName,
        amount: -amount, 
        balance: senderNewBalance, 
        type: "debit" 
      };

      const updatedState = {
        ...prev,
        user1: {
          ...prev.user1,
          balance: senderNewBalance,
          dailyDebitUsed: prev.user1.dailyDebitUsed + amount,
          monthlyDebitUsed: prev.user1.monthlyDebitUsed + amount,
          transactionHistory: [newSenderHistoryItem, ...prev.user1.transactionHistory]
        }
      };

      // Update registered recipient balance if present
      if (targetKey && prev[targetKey]) {
        const recipientNewBalance = prev[targetKey].balance + amount;
        updatedState[targetKey] = {
          ...prev[targetKey],
          balance: recipientNewBalance,
          dailyCreditUsed: prev[targetKey].dailyCreditUsed + amount,
          monthlyCreditUsed: prev[targetKey].monthlyCreditUsed + amount,
          transactionHistory: [
            { 
              id: Date.now() + 1, 
              time: timestamp, 
              action: `Received from ${sender.accountName}`, 
              targetName: sender.accountName,
              targetAccNumber: sender.accountNumber,
              iban: sender.iban,
              branchName: sender.branch.branchName,
              amount, 
              balance: recipientNewBalance, 
              type: "credit" 
            },
            ...prev[targetKey].transactionHistory
          ]
        };
      }

      return updatedState;
    });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
        <h2>Logged Out</h2>
        <p>You have successfully logged out of your account.</p>
        <button 
          style={{ 
            padding: '10px 20px', 
            marginTop: '20px', 
            cursor: 'pointer', 
            background: '#0f52ba', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px' 
          }}
          onClick={() => setIsLoggedIn(true)}
        >
          Log Back In
        </button>
      </div>
    );
  }

  // Dynamic View Switching based on Navbar click
  const renderMainContent = () => {
    switch (activeTab) {
      case 'transactions':
        return <Transactions transactions={activeUser.transactionHistory} currentAccount={activeUser} />;
      
      case 'accounts':
        return <AccountCards accounts={accounts} />;
      
      case 'settings':
        return <Settings user={activeUser} onLogout={handleLogout} />;
      
      case 'dashboard':
      default:
        return (
          <div className="dashboard-grid">
            <div className="main-content-column">
              <BalanceOverview balance={activeUser.balance} onAddFunds={handleCredit} />
              <AccountCards accounts={accounts} />
              <Transactions transactions={activeUser.transactionHistory} currentAccount={activeUser} />
            </div>
            <div className="side-content-column">
              <MyCard accountName={activeUser.accountName} iban={activeUser.iban} />
              <QuickTransfer onTransfer={handleTransfer} accounts={accounts} />
              <UsageLimits account={activeUser} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-main">
        <Header user={activeUser.accountName} onLogout={handleLogout} />
        {renderMainContent()}
        
      </div>
    </div>
  );
}