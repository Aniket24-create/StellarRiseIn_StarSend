import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';

const SendTip = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendPayment, loading, balance, isWalletConnected } = useWallet();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(location.state?.amount || '');
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isWalletConnected) {
      navigate('/');
    }
  }, [isWalletConnected, navigate]);

  const validateStellarAddress = (address) => {
    // Basic Stellar address validation (starts with G and is 56 characters)
    return /^G[A-Z0-9]{55}$/.test(address);
  };

  const handleSendTip = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!recipient.trim()) {
      setError('Please enter a recipient address');
      return;
    }

    if (!validateStellarAddress(recipient)) {
      setError('Invalid Stellar address format');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > parseFloat(balance)) {
      setError('Insufficient balance');
      return;
    }

    try {
      const result = await sendPayment(recipient, amount, memo);
      navigate('/success', { 
        state: { 
          transactionHash: result.hash,
          amount: amount,
          recipient: recipient 
        } 
      });
    } catch (error) {
      console.error('Send tip error:', error);
      let errorMessage = 'Transaction failed. Please try again.';
      
      if (error?.response?.data?.extras?.result_codes) {
        const resultCodes = error.response.data.extras.result_codes;
        if (resultCodes.operations && resultCodes.operations.includes('op_no_destination')) {
          errorMessage = 'The recipient account does not exist. It must be funded with at least 1 XLM before it can receive tips.';
        } else if (resultCodes.operations && resultCodes.operations.includes('op_underfunded')) {
          errorMessage = 'You do not have enough XLM to send this tip.';
        } else if (resultCodes.operations && resultCodes.operations.includes('op_line_full')) {
          errorMessage = 'Recipient cannot hold any more XLM.';
        } else {
          errorMessage = `Transaction failed: ${resultCodes.operations ? resultCodes.operations[0] : resultCodes.transaction}`;
        }
      } else if (error?.message) {
        if (error.message.includes('User declined')) {
          errorMessage = 'Transaction was rejected in the wallet.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
    }
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  if (!isWalletConnected) {
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold font-poppins">Send Tip</h1>
        </div>

        {/* Balance Info */}
        <div className="card mb-6">
          <div className="text-center">
            <p className="text-gray-400 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-blue-400">{parseFloat(balance).toFixed(2)} XLM</p>
          </div>
        </div>

        {/* Send Form */}
        <form onSubmit={handleSendTip} className="card">
          <div className="space-y-6">
            {/* Recipient Address */}
            <div>
              <label className="block text-sm font-medium mb-2">Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="input-field w-full font-mono text-sm"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Amount (XLM)</label>
              <input
                type="number"
                step="0.0000001"
                min="0.0000001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="input-field w-full"
                required
              />
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-medium mb-2">Quick Amounts</label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 5, 10].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => handleQuickAmount(quickAmount)}
                    className={`btn-secondary py-3 ${
                      amount === quickAmount.toString() 
                        ? 'bg-blue-500/20 border-blue-500' 
                        : ''
                    }`}
                  >
                    {quickAmount} XLM
                  </button>
                ))}
              </div>
            </div>

            {/* Memo (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Memo <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Thank you for your work!"
                className="input-field w-full"
                maxLength="28"
              />
              <p className="text-xs text-gray-500 mt-1">Max 28 characters</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Transaction Summary */}
            {amount && recipient && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium mb-2">Transaction Summary</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>{amount} XLM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Fee:</span>
                    <span>~0.00001 XLM</span>
                  </div>
                  <div className="flex justify-between font-medium text-white border-t border-gray-600 pt-1 mt-2">
                    <span>Total:</span>
                    <span>{(parseFloat(amount) + 0.00001).toFixed(7)} XLM</span>
                  </div>
                </div>
              </div>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || !recipient || !amount}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Send Tip</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendTip;