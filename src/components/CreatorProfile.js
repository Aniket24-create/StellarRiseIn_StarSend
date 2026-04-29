import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { QRCodeSVG } from 'qrcode.react';
import { User, CreditCard, Send, Share2, ArrowLeft, Zap, Coins } from 'lucide-react';

const CreatorProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { resolveUsername, shortenAddress } = useWallet();
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const resolved = resolveUsername(`@${username}`);
    if (resolved) {
      setAddress(resolved);
    } else {
      // If username not found in mock mapping, we could just show a generic profile or redirect
      setAddress('G... (Demo Address)');
    }
  }, [username, resolveUsername]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleTip = () => {
    navigate(`/send?to=${address}&username=${username}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-poppins selection:bg-purple-500/30 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Profile Card */}
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <User className="w-40 h-40 text-blue-400" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-purple-500/20">
              <User className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-2">@{username}</h1>
            <div className="flex items-center gap-2 text-gray-400 mb-8 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <CreditCard className="w-4 h-4" />
              <span className="font-mono">{shortenAddress(address)}</span>
            </div>

            {/* QR Section */}
            <div className="bg-white p-4 rounded-3xl mb-8 shadow-2xl shadow-blue-500/10">
              <QRCodeSVG 
                value={`stellar:wallet?to=${address}&amount=5`}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button 
                onClick={handleTip}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/25"
              >
                <Send className="w-5 h-5" />
                <span>Tip Now</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 active:scale-95 transition-all"
              >
                <Share2 className="w-5 h-5 text-purple-400" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-2xl">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Total Received</p>
              <p className="text-xl font-bold">1,240 XLM</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-2xl">
              <Coins className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Supporters</p>
              <p className="text-xl font-bold">48</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
