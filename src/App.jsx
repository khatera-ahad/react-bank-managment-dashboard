import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


import './App.css';

export default function App() { 
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header user={account.accountName} />
        <div className="main-content-column">
            <BalanceOverview balance={account.balance} onAddFunds={handleCredit} />
      </div>
    </div>
    </div>
  );
}