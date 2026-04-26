import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Send, Copy, RefreshCw, History, LogOut, Zap, TrendingUp, Users, Globe } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    isWalletConnected, 
    publicKey, 
    balance, 
    shortenAddress, 
    fetchBalance,
    loading,
    transactions 
  } = useWallet();

  useEffect(() => {
    if (!isWalletConnected) {
      navigate('/');
    }
  }, [isWalletConnected, navigate]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(publicKey);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleRefreshBalance = () => {
    fetchBalance(publicKey);
  };

  const getTotalSent = () => {
    return transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  };

  if (!isWalletConnected) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-poppins text-gradient flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              StellarTipJar
            </h1>
            <p className="text-gray-400 mt-2">Your decentralized tipping dashboard</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex items-center space-x-2 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-blue-400">{parseFloat(balance).toFixed(2)} XLM</p>
                <p className="text-gray-500 text-sm">≈ ${(parseFloat(balance) * 0.12).toFixed(2)} USD</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Tips Sent</p>
                <p className="text-2xl font-bold text-purple-400">{transactions.length}</p>
                <p className="text-gray-500 text-sm">Transactions</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Send className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Amount Sent</p>
                <p className="text-2xl font-bold text-green-400">{getTotalSent().toFixed(2)} XLM</p>
                <p className="text-gray-500 text-sm">≈ ${(getTotalSent() * 0.12).toFixed(2)} USD</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Network</p>
                <p className="text-2xl font-bold text-yellow-400">Testnet</p>
                <p className="text-gray-500 text-sm">Stellar</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Globe className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Balance Card */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-gradient">Wallet Overview</h2>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-gray-300 font-mono text-lg">{shortenAddress(publicKey)}</span>
                    <button
                      onClick={handleCopyAddress}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                      title="Copy full address"
                    >
                      <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleRefreshBalance}
                  disabled={loading}
                  className="p-3 hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
                  title="Refresh balance"
                >
                  <RefreshCw className={`w-6 h-6 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Enhanced Balance Display */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-blue-500/20 mb-6">
                <div className="text-center">
                  <p className="text-gray-400 mb-3 text-lg">Available Balance</p>
                  <p className="text-6xl font-bold font-poppins text-gradient mb-4">
                    {parseFloat(balance).toFixed(2)}
                  </p>
                  <p className="text-2xl text-blue-400 mb-2">XLM</p>
                  <p className="text-gray-500 text-lg">≈ ${(parseFloat(balance) * 0.12).toFixed(2)} USD</p>
                  
                  {/* Balance Status */}
                  <div className="flex justify-center mt-6">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">Wallet Connected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/send')}
                  className="card hover:scale-105 transition-all duration-300 cursor-pointer group bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-colors">
                      <Send className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold mb-1">Send Tip</h3>
                      <p className="text-gray-400">Send XLM to any Stellar address</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/history')}
                  className="card hover:scale-105 transition-all duration-300 cursor-pointer group bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition-colors">
                      <History className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold mb-1">View History</h3>
                      <p className="text-gray-400">Track your transactions</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tip Buttons */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-6 text-gradient">Quick Tips</h3>
              <div className="space-y-4">
                {[1, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => navigate('/send', { state: { amount } })}
                    className="w-full btn-secondary text-left py-4 px-6 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-500/50 group"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{amount} XLM</div>
                        <div className="text-sm text-gray-400">≈ ${(amount * 0.12).toFixed(2)} USD</div>
                      </div>
                      <Send className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-6 text-gradient">Recent Activity</h3>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="p-3 bg-gray-500/20 rounded-xl w-fit mx-auto mb-4">
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400 mb-4">No transactions yet</p>
                  <button
                    onClick={() => navigate('/send')}
                    className="btn-primary text-sm"
                  >
                    Send First Tip
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Send className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Tip Sent</p>
                          <p className="text-xs text-gray-400">{shortenAddress(tx.destination)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-400">-{tx.amount} XLM</p>
                      </div>
                    </div>
                  ))}
                  {transactions.length > 3 && (
                    <button
                      onClick={() => navigate('/history')}
                      className="w-full text-center py-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      View all {transactions.length} transactions →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Network Info */}
        <div className="text-center mt-12 text-gray-500">
          <p className="flex items-center justify-center space-x-2">
            <span>Connected to</span>
            <span className="text-blue-400 font-semibold">Stellar Testnet</span>
            <span>•</span>
            <span>Real-time updates</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;