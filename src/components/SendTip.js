import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Send, QrCode, X, CheckCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

const SendTip = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    sendPayment, 
    loading, 
    balance, 
    isWalletConnected,
  } = useWallet();
  
  // STEP 2: ADD STATES
  const [recipient, setRecipient] = useState(""); 
  const [amount, setAmount] = useState(location.state?.amount || ""); 
  const [gasless, setGasless] = useState(false); 
  const [resolvedAddress, setResolvedAddress] = useState(""); 
  const [message, setMessage] = useState(""); 

  const [memo, setMemo] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  // STEP 3: USERNAME SYSTEM
  const aliasMap = { 
    "@aniket": "GABC123456789", 
    "@john": "GXYZ987654321", 
  }; 
  
  const resolveUsername = (value) => { 
    setRecipient(value); 
  
    if (value.startsWith("@")) { 
      const address = aliasMap[value]; 
      if (address) { 
        setResolvedAddress(address); 
        setMessage("Resolved to: " + address); 
      } else { 
        setResolvedAddress(""); 
        setMessage("Username not found"); 
      } 
    } else { 
      setResolvedAddress(""); 
      setMessage(""); 
    } 
  }; 

  // STEP 5: QR SCAN FEATURE (Logic)
  const startScan = async () => { 
    setIsScanning(true);
    // Wait for reader div to be ready
    setTimeout(async () => {
      try {
        const scanner = new Html5Qrcode("reader"); 
        scannerRef.current = scanner;

        await scanner.start( 
          { facingMode: "environment" }, 
          { fps: 10, qrbox: 250 }, 
          (decodedText) => { 
            setRecipient(decodedText); 
            setMessage("Address detected from QR"); 
            scanner.stop(); 
            setIsScanning(false);
          }, 
          (error) => console.log(error) 
        ); 
      } catch (err) {
        console.error("Scanner error", err);
        setIsScanning(false);
      }
    }, 100);
  }; 

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      await scannerRef.current.stop();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  // STEP 7: UPDATE SEND FUNCTION
  const handleSend = async (e) => { 
    if (e) e.preventDefault();
    const finalAddress = resolvedAddress || recipient; 
  
    if (!finalAddress || !amount) { 
      setMessage("Enter all fields"); 
      return; 
    } 
  
    // existing sendTip logic integrated here
    try {
      const result = await sendPayment(finalAddress, amount, memo);
      
      if (gasless) { 
        setMessage("Transaction sent with zero fees"); 
      } else { 
        setMessage("Tip sent successfully"); 
      }

      // Small delay to show message before navigating
      setTimeout(() => {
        navigate('/success', { 
          state: { 
            transactionHash: result.hash,
            amount: amount,
            recipient: finalAddress,
            isGasless: gasless
          } 
        });
      }, 1500);

    } catch (error) {
      console.error('Send tip error:', error);
      setMessage(error.message || 'Transaction failed');
    }
  }; 

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    if (!isWalletConnected) {
      navigate('/');
    }
  }, [isWalletConnected, navigate]);

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
        <form onSubmit={handleSend} className="card">
          <div className="space-y-6">
            {/* Recipient Address */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Recipient Address</label>
                {/* STEP 5: QR SCAN FEATURE Button */}
                <button 
                  type="button"
                  onClick={startScan}
                  className="flex items-center space-x-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <QrCode className="w-3 h-3" />
                  <span>Scan QR</span>
                </button>
              </div>
              
              {/* STEP 4: UPDATE INPUT FIELD */}
              <input
                type="text"
                value={recipient}
                onChange={(e) => resolveUsername(e.target.value)}
                placeholder="Recipient Address or @username"
                className="input-field w-full font-mono text-sm"
                required
              />
              
              {/* Helper text below input */}
              {message && (
                <p className={`text-xs mt-1 font-medium flex items-center gap-1 ${
                  message.includes('Resolved') || message.includes('detected') || message.includes('successfully')
                    ? 'text-blue-400' 
                    : message.includes('failed') || message.includes('not found') || message.includes('Enter')
                    ? 'text-red-400'
                    : 'text-gray-400'
                }`}>
                  {message.includes('successfully') || message.includes('detected') ? <CheckCircle className="w-3 h-3" /> : null}
                  {message}
                </p>
              )}
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

            {/* STEP 6: GASLESS MODE Checkbox */}
            <div className="flex items-center space-x-2 mb-4">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gasless}
                  onChange={() => setGasless(!gasless)}
                  className="w-4 h-4 rounded border-gray-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                />
                <span>Gasless Mode (No Fees)</span>
              </label>
            </div>

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

      {/* STEP 5: QR SCAN FEATURE div#reader */}
      {isScanning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-white/10 overflow-hidden relative">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold">Scan Recipient QR</h3>
              <button 
                onClick={stopScanner}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div id="reader" style={{ width: "100%", minHeight: "250px" }} className="overflow-hidden rounded-2xl border border-white/5 bg-black"></div>
              <p className="text-center text-xs text-gray-500 mt-4">
                Position the Stellar address QR code within the frame
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendTip;