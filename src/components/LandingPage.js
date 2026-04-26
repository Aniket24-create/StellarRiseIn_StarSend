import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Wallet, Zap, Shield, Globe, Star, Coins, Users, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { connectWallet, loading, isWalletConnected } = useWallet();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to connect wallet. Please make sure Freighter is installed and unlocked.');
    }
  };

  if (isWalletConnected) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl glow animate-float">
                  <Zap className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 text-gradient animate-pulse-slow">
              Stellar TipJar
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
              The Future of <span className="text-gradient font-semibold">Instant Tipping</span>
            </p>
            
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Send XLM tips instantly to creators, friends, and anyone worldwide. Built on Stellar's lightning-fast blockchain with minimal fees and maximum security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={handleConnectWallet}
                disabled={loading}
                className="btn-primary text-xl px-10 py-5 glow disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span>Connect Freighter Wallet</span>
                  </div>
                )}
              </button>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Free to use • Testnet Ready</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">< 3s</div>
                <div className="text-sm text-gray-500">Transaction Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">$0.00001</div>
                <div className="text-sm text-gray-500">Network Fee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-500">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">Global</div>
                <div className="text-sm text-gray-500">Worldwide Access</div>
              </div>
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="card text-center hover:scale-105 transition-transform group">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-colors">
                  <Zap className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Send XLM tips in under 3 seconds with Stellar's high-performance blockchain technology.</p>
            </div>
            
            <div className="card text-center hover:scale-105 transition-transform group">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition-colors">
                  <Shield className="w-10 h-10 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bank-Grade Security</h3>
              <p className="text-gray-400 text-sm">Protected by Stellar's proven blockchain and Freighter's secure wallet infrastructure.</p>
            </div>
            
            <div className="card text-center hover:scale-105 transition-transform group">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-500/20 rounded-2xl group-hover:bg-green-500/30 transition-colors">
                  <Coins className="w-10 h-10 text-green-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Micro Fees</h3>
              <p className="text-gray-400 text-sm">Pay only $0.00001 per transaction - perfect for small tips and frequent payments.</p>
            </div>
            
            <div className="card text-center hover:scale-105 transition-transform group">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-500/20 rounded-2xl group-hover:bg-yellow-500/30 transition-colors">
                  <Globe className="w-10 h-10 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Access</h3>
              <p className="text-gray-400 text-sm">Send tips to anyone, anywhere in the world, 24/7 without borders or restrictions.</p>
            </div>
          </div>

          {/* Use Cases */}
          <div className="card mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gradient">Perfect For</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Content Creators</h4>
                <p className="text-gray-400 text-sm">Receive instant tips from your audience for your amazing content</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Freelancers</h4>
                <p className="text-gray-400 text-sm">Get paid quickly for small tasks and micro-services</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Appreciation</h4>
                <p className="text-gray-400 text-sm">Show gratitude with instant tips for great service or help</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-gradient">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-400">1</div>
                <h4 className="text-lg font-semibold mb-2">Connect Wallet</h4>
                <p className="text-gray-400">Connect your Freighter wallet securely to get started</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-400">2</div>
                <h4 className="text-lg font-semibold mb-2">Enter Details</h4>
                <p className="text-gray-400">Add recipient address and tip amount</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-400">3</div>
                <h4 className="text-lg font-semibold mb-2">Send Instantly</h4>
                <p className="text-gray-400">Confirm and send your tip in seconds</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 space-y-2">
            <p className="flex items-center justify-center space-x-2">
              <span>Powered by</span>
              <span className="text-blue-400 font-semibold">Stellar Network</span>
              <span>•</span>
              <span className="text-purple-400">Testnet Environment</span>
            </p>
            <p className="text-sm">Built with ❤️ for the decentralized future</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;