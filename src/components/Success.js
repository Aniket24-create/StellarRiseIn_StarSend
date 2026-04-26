import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ExternalLink, Home, Send } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { transactionHash, amount, recipient } = location.state || {};

  const handleViewOnExplorer = () => {
    if (transactionHash) {
      window.open(`https://stellar.expert/explorer/testnet/tx/${transactionHash}`, '_blank');
    }
  };

  const shortenHash = (hash) => {
    if (!hash) return '';
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-500/20 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold font-poppins mb-4 text-green-400">
          Tip Sent Successfully!
        </h1>
        
        <p className="text-gray-300 mb-8">
          Your tip has been sent to the Stellar network and will be confirmed shortly.
        </p>

        {/* Transaction Details */}
        {transactionHash && (
          <div className="card mb-8 text-left">
            <h3 className="font-semibold mb-4 text-center">Transaction Details</h3>
            
            <div className="space-y-3">
              {amount && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Amount:</span>
                  <span className="font-medium">{amount} XLM</span>
                </div>
              )}
              
              {recipient && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Recipient:</span>
                  <span className="font-mono text-sm">{shortenAddress(recipient)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="font-mono text-sm">{shortenHash(transactionHash)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-medium">Confirmed</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {transactionHash && (
            <button
              onClick={handleViewOnExplorer}
              className="btn-secondary w-full flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Stellar Explorer</span>
            </button>
          )}
          
          <button
            onClick={() => navigate('/send')}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Another Tip</span>
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Network Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Transaction processed on Stellar Testnet</p>
        </div>
      </div>
    </div>
  );
};

export default Success;