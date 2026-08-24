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

const defaultBranch = {
  branchName: "Kabul Main Branch",
  branchCode: "KB001",
};

export default function App() {
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
        },
        { 
          id: 102, 
          time: "8/23/2026, 4:15:20 PM", 
          action: "Transfer to Ahmad A", 
          targetName: "Ahmad A",
          targetAccNumber: 1009876543,
          iban: "KB0011009876543",
          branchName: "Kabul Main Branch",
          amount: -150, 
          balance: 2350.00, 
          type: "debit" 
        },
        { 
          id: 103, 
          time: "8/22/2026, 2:45:10 PM", 
          action: "Online Purchase / Utilities", 
          targetName: "Kabul Power Co.",
          targetAccNumber: 8840192311,
          iban: "KB0018840192311",
          branchName: "Kabul Central",
          amount: -200, 
          balance: 2500.00, 
          type: "debit" 
        },
        { 
          id: 104, 
          time: "8/20/2026, 10:10:00 AM", 
          action: "Received from Fatima", 
          targetName: "Fatima",
          targetAccNumber: 1004455667,
          iban: "KB0011004455667",
          branchName: "Kabul Main Branch",
          amount: 1200, 
          balance: 2700.00, 
          type: "credit" 
        },
        { 
          id: 105, 
          time: "8/15/2026, 9:00:00 AM", 
          action: "Initial Account Deposit", 
          targetName: "Sara A",
          targetAccNumber: 1002345678,
          iban: "KB0011002345678",
          branchName: "Kabul Main Branch",
          amount: 1500, 
          balance: 1500.00, 
          type: "credit" 
        }
      ]
    },
    user2: {
      accountName: "Ahmad A",
      branch: defaultBranch,
      accountNumber: 1009876543,
      iban: "KB0011009876543",
      balance: 5000,
      dailyCreditLimit: 50000,
      monthlyCreditLimit: 500000,
      dailyDebitLimit: 30000,
      monthlyDebitLimit: 300000,
      dailyCreditUsed: 0,
      monthlyCreditUsed: 0,
      dailyDebitUsed: 0,
      monthlyDebitUsed: 0,
      transactionHistory: [
        { 
          id: 201, 
          time: "8/15/2026, 9:00:00 AM", 
          action: "Initial Deposit", 
          targetName: "Ahmad A",
          targetAccNumber: 1009876543,
          iban: "KB0011009876543",
          branchName: "Kabul Main Branch",
          amount: 5000, 
          balance: 5000, 
          type: "credit" 
        }
      ]
    }
  });

  const activeUser = accounts.user1;

  const handleCredit = (amount) => {
    if (amount <= 0) return alert("Invalid credit amount.");
    if (activeUser.dailyCreditUsed + amount > activeUser.dailyCreditLimit) return alert("Daily credit limit exceeded.");

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

  const handleTransfer = (targetAccountKey, amount) => {
    const sender = accounts.user1;
    const recipient = accounts[targetAccountKey];

    if (!recipient) return alert("Recipient account not found.");
    if (amount <= 0) return alert("Invalid transfer amount.");
    if (sender.dailyDebitUsed + amount > sender.dailyDebitLimit) return alert("Daily debit limit exceeded.");
    if (amount > sender.balance) return alert("Insufficient Balance.");

    setAccounts(prev => {
      const senderNewBalance = prev.user1.balance - amount;
      const recipientNewBalance = prev[targetAccountKey].balance + amount;
      const timestamp = new Date().toLocaleString();

      return {
        ...prev,
        user1: {
          ...prev.user1,
          balance: senderNewBalance,
          dailyDebitUsed: prev.user1.dailyDebitUsed + amount,
          monthlyDebitUsed: prev.user1.monthlyDebitUsed + amount,
          transactionHistory: [
            { 
              id: Date.now(), 
              time: timestamp, 
              action: `Transfer to ${recipient.accountName}`, 
              targetName: recipient.accountName,
              targetAccNumber: recipient.accountNumber,
              iban: recipient.iban,
              branchName: recipient.branch.branchName,
              amount: -amount, 
              balance: senderNewBalance, 
              type: "debit" 
            },
            ...prev.user1.transactionHistory
          ]
        },
        [targetAccountKey]: {
          ...prev[targetAccountKey],
          balance: recipientNewBalance,
          dailyCreditUsed: prev[targetAccountKey].dailyCreditUsed + amount,
          monthlyCreditUsed: prev[targetAccountKey].monthlyCreditUsed + amount,
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
            ...prev[targetAccountKey].transactionHistory
          ]
        }
      };
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header user={activeUser.accountName} />
        <div className="dashboard-grid">
          <div className="main-content-column">
            <BalanceOverview balance={activeUser.balance} onAddFunds={handleCredit} />
            <AccountCards mainBalance={activeUser.balance} accountNumber={activeUser.accountNumber} />
            
            <Transactions 
              transactions={activeUser.transactionHistory} 
              currentAccount={activeUser} 
            />
            
          </div>
          <div className="side-content-column">
            <MyCard accountName={activeUser.accountName} iban={activeUser.iban} />
            <QuickTransfer onTransfer={handleTransfer} accounts={accounts} />
            <UsageLimits account={activeUser} />
          </div>
        </div>
      </div>
    </div>
  );
}