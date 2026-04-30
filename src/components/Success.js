import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ExternalLink, Home, Send, Copy, FileText, Link as LinkIcon } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const { transactionHash, amount, recipient, isGasless, timestamp } = location.state || {};

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(22);
    doc.text('StarSend Tip Receipt', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(timestamp || Date.now()).toLocaleString()}`, 20, 40);
    doc.text(`Amount: ${amount} XLM`, 20, 50);
    doc.text(`Recipient: ${recipient}`, 20, 60);
    doc.text(`Transaction Hash: ${transactionHash || 'N/A'}`, 20, 70);
    doc.text(`Status: Success`, 20, 80);
    doc.text(`Fee: ${isGasless ? '0 XLM (Gasless)' : '0.00001 XLM'}`, 20, 90);
    
    doc.text('Thank you for using StarSend!', 20, 110);
    
    const fileName = transactionHash ? `starsend-receipt-${transactionHash.slice(0, 8)}.pdf` : 'starsend-receipt.pdf';
    doc.save(fileName);
  };

  const handleCopyHash = async () => {
    try {
      await navigator.clipboard.writeText(transactionHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch (err) {
      console.error('Failed to copy hash:', err);
    }
  };

  const handleCopyPaymentLink = async () => {
    const link = `${window.location.origin}/send?to=${recipient}&amount=${amount}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleViewOnExplorer = () => {
    if (transactionHash && !transactionHash.startsWith('sim_')) {
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
        <h1 className="text-3xl font-bold font-poppins mb-2 text-green-400">
          Tip Sent Successfully!
        </h1>
        
        {isGasless && (
          <p className="text-blue-400 font-bold mb-4 animate-pulse">
            Transaction sent with zero fees
          </p>
        )}
        
        <p className="text-gray-300 mb-8">
          Your tip has been sent to the Stellar network and will be confirmed shortly.
        </p>

        {/* Transaction Details */}
        {transactionHash && (
          <div className="card mb-8 text-left">
            <h3 className="font-semibold mb-4 text-center">
              {transactionHash.startsWith('sim_') ? 'Simulated Transaction Details' : 'Transaction Details'}
            </h3>
            
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
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{shortenHash(transactionHash)}</span>
                  <button onClick={handleCopyHash} className="p-1 hover:bg-white/10 rounded transition-colors">
                    {copiedHash ? <CheckCircle className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-blue-400" />}
                  </button>
                </div>
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
          <button
            onClick={handleDownloadReceipt}
            className="btn-primary w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600"
          >
            <FileText className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>

          <button
            onClick={handleCopyPaymentLink}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <LinkIcon className="w-4 h-4 text-purple-400" />
            <span>{copiedLink ? 'Link Copied!' : 'Copy Payment Link'}</span>
          </button>
          {transactionHash && !transactionHash.startsWith('sim_') && (
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