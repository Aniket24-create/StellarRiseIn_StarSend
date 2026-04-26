import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import SendTip from './components/SendTip';
import Success from './components/Success';
import TransactionHistory from './components/TransactionHistory';
import { WalletProvider, useWallet } from './context/WalletContext';

function AppContent() {
  const { isWalletConnected } = useWallet();

  // If wallet is connected, show the main app routes
  if (isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendTip />} />
          <Route path="/success" element={<Success />} />
          <Route path="/history" element={<TransactionHistory />} />
        </Routes>
      </div>
    );
  }

  // If wallet is not connected, show Hero landing page
  return <Hero />;
}

function App() {
  return (
    <WalletProvider>
      <Router>
        <AppContent />
      </Router>
    </WalletProvider>
  );
}

export default App;