"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Wallet, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import Link from 'next/link';

export default function LandingPage() {
  const { connect, isConnected, isConnecting } = useWallet();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 glass sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center neon-glow-blue">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-gradient">CertifyX + TipJar</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
        </div>
        <button 
          onClick={connect}
          disabled={isConnecting}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-sm neon-glow-purple hover:scale-105 transition-transform flex items-center space-x-2 disabled:opacity-50"
        >
          <Wallet size={18} />
          <span>{isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Connect Wallet'}</span>
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            The Future of <span className="text-gradient">Trust</span> and <span className="text-gradient">Gratitude</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Securely validate digital certificates with blockchain-backed integrity and send instant appreciation tips via the Stellar network.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <Link href="/dashboard">
              <button className="w-full md:w-auto px-8 py-4 bg-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 glass shadow-neon-blue">
                <span>Validate Certificate</span>
                <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="w-full md:w-auto px-8 py-4 bg-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all flex items-center justify-center space-x-2 glass shadow-neon-purple">
                <span>Send a Tip</span>
                <Send size={20} />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
          <FeatureCard 
            icon={<CheckCircle className="text-blue-400" />}
            title="Instant Validation"
            description="Verify any certificate's authenticity instantly using unique IDs or QR codes."
          />
          <FeatureCard 
            icon={<Shield className="text-purple-400" />}
            title="Stellar Secured"
            description="Leveraging the power of Stellar blockchain for transparent and immutable records."
          />
          <FeatureCard 
            icon={<Wallet className="text-cyan-400" />}
            title="Decentralized Tips"
            description="Direct peer-to-peer micro-payments with near-zero fees using XLM."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-10 glass border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 CertifyX + TipJar. Built for Demo Day. Powered by Stellar.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-8 text-left hover:scale-105 transition-transform cursor-default group">
      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
