import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Send, 
  Copy, 
  LogOut, 
  Zap, 
  TrendingUp, 
  History, 
  CheckCircle2, 
  CreditCard,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  Share2,
  Download,
  BarChart3,
  QrCode,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    isWalletConnected, 
    isSimulated,
    publicKey, 
    balance, 
    shortenAddress, 
    transactions,
    disconnectWallet,
    fetchBalance,
    analytics,
    goal
  } = useWallet();

  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const qrRef = useRef();

  useEffect(() => {
    if (!isWalletConnected) {
      navigate('/');
    } else if (publicKey) {
      fetchBalance(publicKey);
    }
  }, [isWalletConnected, navigate, publicKey, fetchBalance]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleShareLink = async () => {
    // Using a mock username for the link - in a real app this would be the user's registered name
    const shareLink = `${window.location.origin}/aniket`; 
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 50, 50, 400, 400);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `starsend-qr-${publicKey.slice(0, 8)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!isWalletConnected) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-poppins selection:bg-purple-500/30">
      {/* ────────────────────────── TOP NAVBAR ────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Stellar<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">TipJar</span>
            </span>
          </div>

          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* ────────────────────────── LEFT COLUMN ────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. WALLET INFO SECTION */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-blue-400" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Connected Wallet</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                      {isSimulated ? 'Demo Mode' : 'Active'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-mono font-bold tracking-tight text-white/90">
                      {shortenAddress(publicKey)}
                    </h2>
                    <button 
                      onClick={handleCopyAddress}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all relative group"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {copied ? 'Copied!' : 'Copy Address'}
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href={`https://stellar.expert/explorer/testnet/account/${publicKey}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold"
                  >
                    <span>Explorer</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. BALANCE CARD (LARGE MODERN) */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative bg-[#0a0a0a] rounded-[2.2rem] p-10 border border-white/10 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Total Balance</span>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-7xl md:text-8xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-none">
                      {parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-2xl font-bold text-purple-400 uppercase">XLM</span>
                  </div>
                  <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-gray-400 font-medium">
                    ≈ ${(parseFloat(balance) * 0.12).toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>

            {/* 3. QUICK ACTIONS (PART 1) */}
            <div className="grid md:grid-cols-2 gap-6">
              <button 
                onClick={() => navigate('/send')}
                className="group relative p-[1px] rounded-3xl overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div className="relative bg-[#0f0f0f] rounded-[calc(1.5rem-1px)] p-6 flex items-center gap-5 group-hover:bg-transparent transition-colors">
                  <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:bg-white/20 transition-colors">
                    <Send className="w-7 h-7 text-blue-400 group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-white">Send Tip</h3>
                    <p className="text-sm text-gray-400 group-hover:text-blue-100">Instantly tip any creator</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </button>

              <button 
                onClick={() => navigate('/history')}
                className="group relative p-[1px] rounded-3xl overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                <div className="relative bg-[#0f0f0f] rounded-[calc(1.5rem-1px)] p-6 flex items-center gap-5 group-hover:bg-transparent transition-colors">
                  <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:bg-white/20 transition-colors">
                    <History className="w-7 h-7 text-purple-400 group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-white">Full History</h3>
                    <p className="text-sm text-gray-400 group-hover:text-purple-100">Review all transactions</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
          </div>

          {/* ────────────────────────── RIGHT COLUMN ────────────────────────── */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 1. ANALYTICS CARD */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">My Analytics</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Tips</p>
                  <p className="text-xl font-bold">{analytics.totalTipsSent}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total XLM</p>
                  <p className="text-xl font-bold">{analytics.totalXLMSent.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* 2. RECEIVE TIPS (QR GENERATOR) */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 text-center">
              <div className="flex items-center gap-3 mb-6 text-left">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <QrCode className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold">Receive Tips</h3>
              </div>
              
              <div ref={qrRef} className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-xl shadow-blue-500/5">
                <QRCodeSVG 
                  value={`stellar:wallet?to=${publicKey}&amount=5`}
                  size={140}
                  level="H"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={downloadQR}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Download QR</span>
                </button>
                <button 
                  onClick={handleShareLink}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all text-xs font-bold text-purple-300"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share My Tip Link'}</span>
                </button>
              </div>
            </div>
            
            {/* 3. QUICK ACTIONS (PART 2 - QUICK TIPS) */}
            <div className="glass-card p-6 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">Quick Tipping</h3>
              </div>
              
              <div className="grid gap-3">
                {[1, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => navigate('/send', { state: { amount } })}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-500/30 transition-all active:scale-[0.98]"
                  >
                    <div>
                      <span className="text-xl font-bold group-hover:text-white transition-colors">{amount} XLM</span>
                      <p className="text-xs text-gray-500">≈ ${(amount * 0.12).toFixed(2)} USD</p>
                    </div>
                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Send className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. GOAL TRACKER CARD */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold">Goal Tracker</h3>
                </div>
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md uppercase">
                  {goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0}%
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Current</p>
                    <p className="text-xl font-bold">{goal.current} <span className="text-xs text-gray-500">XLM</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Target</p>
                    <p className="text-xl font-bold">{goal.target} <span className="text-xs text-gray-500">XLM</span></p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-1000"
                    style={{ width: `${goal.target > 0 ? (goal.current / goal.target) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <p className="text-[10px] text-center text-gray-500 italic">
                  Tip more to reach the creator's next milestone!
                </p>
              </div>
            </div>
            
            {/* 4. TRANSACTION HISTORY PREVIEW */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <History className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold">Recent Tips</h3>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Zap className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-500">No transactions yet.<br/>Start tipping now!</p>
                  </div>
                ) : (
                  transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          {tx.isSent ? <ArrowUpRight className="w-5 h-5 text-blue-400" /> : <TrendingUp className="w-5 h-5 text-green-400" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white/90">{tx.isSent ? 'Sent Tip' : 'Received Tip'}</p>
                          <p className="text-[11px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                            {shortenAddress(tx.isSent ? tx.destination : tx.sender)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${tx.isSent ? 'text-white' : 'text-green-400'}`}>
                          {tx.isSent ? '-' : '+'}{tx.amount} XLM
                        </p>
                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Success</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {transactions.length > 5 && (
                <button
                  onClick={() => navigate('/history')}
                  className="mt-6 w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold text-gray-400 hover:text-white"
                >
                  View All Activity
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ────────────────────────── FOOTER INFO ────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <span>Stellar Testnet</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Non-custodial</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Built for the <span className="text-blue-400 font-medium">Stellar RISE</span> hackathon
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
