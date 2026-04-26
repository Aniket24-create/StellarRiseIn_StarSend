import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, ExternalLink, Send, Clock, CheckCircle, Search, Calendar, TrendingUp, Download } from 'lucide-react';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { transactions, isWalletConnected } = useWallet();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (!isWalletConnected) {
      navigate('/');
    }
  }, [isWalletConnected, navigate]);

  useEffect(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(tx => tx.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'amount-high':
          return parseFloat(b.amount) - parseFloat(a.amount);
        case 'amount-low':
          return parseFloat(a.amount) - parseFloat(b.amount);
        default:
          return 0;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterStatus, sortBy]);

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const shortenHash = (hash) => {
    if (!hash) return '';
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOnExplorer = (txHash) => {
    window.open(`https://stellar.expert/explorer/testnet/tx/${txHash}`, '_blank');
  };

  const getTotalSent = () => {
    return transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  };

  const getAverageAmount = () => {
    if (transactions.length === 0) return 0;
    return getTotalSent() / transactions.length;
  };

  if (!isWalletConnected) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold font-poppins text-gradient">Transaction History</h1>
              <p className="text-gray-400 mt-1">Track all your tip transactions</p>
            </div>
          </div>
          
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-blue-400">{transactions.length}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Send className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sent</p>
                <p className="text-2xl font-bold text-purple-400">{getTotalSent().toFixed(2)} XLM</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Amount</p>
                <p className="text-2xl font-bold text-green-400">{getAverageAmount().toFixed(2)} XLM</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-yellow-400">100%</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by address or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="card text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-500/20 rounded-2xl">
                  <Clock className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                {transactions.length === 0 ? 'No Transactions Yet' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {transactions.length === 0 
                  ? 'Your transaction history will appear here after you send your first tip.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
              {transactions.length === 0 && (
                <button
                  onClick={() => navigate('/send')}
                  className="btn-primary"
                >
                  Send Your First Tip
                </button>
              )}
            </div>
          ) : (
            filteredTransactions.map((tx, index) => (
              <div key={tx.id} className="card hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Send className="w-6 h-6 text-blue-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-lg">Tip Sent</span>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400 font-medium">Success</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <span>To:</span>
                          <span className="font-mono">{shortenAddress(tx.destination)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>TX:</span>
                          <span className="font-mono">{shortenHash(tx.id)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{formatDate(tx.timestamp)}</span>
                          <span className="text-gray-500">•</span>
                          <span>{formatTime(tx.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400 mb-2">
                      -{tx.amount} XLM
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      ≈ ${(parseFloat(tx.amount) * 0.12).toFixed(2)} USD
                    </div>
                    
                    <button
                      onClick={() => handleViewOnExplorer(tx.id)}
                      className="btn-secondary text-sm flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination (if needed for large datasets) */}
        {filteredTransactions.length > 10 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="btn-secondary px-4 py-2">Previous</button>
              <button className="btn-primary px-4 py-2">1</button>
              <button className="btn-secondary px-4 py-2">2</button>
              <button className="btn-secondary px-4 py-2">Next</button>
            </div>
          </div>
        )}

        {/* Network Info */}
        <div className="text-center mt-12 text-gray-500">
          <p>Showing transactions on Stellar Testnet • Real-time updates</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;