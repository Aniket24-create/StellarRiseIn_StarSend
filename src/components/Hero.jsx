import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import {
  Zap, ArrowRight, Wallet, Shield, Globe, Coins,
  Users, TrendingUp, ChevronDown, ChevronUp,
  Send, Eye, ArrowUpRight, Heart, CheckCircle2, Sparkles
} from 'lucide-react';

/* ──────────────────────────── FAQ Data ──────────────────────────── */
const faqData = [
  {
    q: 'What is Stellar TipJar?',
    a: 'Stellar TipJar is a decentralized tipping application built on the Stellar blockchain. It allows you to send and receive XLM tips instantly with near-zero fees.'
  },
  {
    q: 'Do I need a Freighter wallet?',
    a: 'Yes. Freighter is a free browser extension that lets you securely manage your Stellar account and sign transactions. Install it from freighter.app.'
  },
  {
    q: 'Is this safe to use?',
    a: 'Absolutely. All transactions are secured by the Stellar blockchain. We never have access to your private keys — everything is signed locally in your Freighter wallet.'
  },
  {
    q: 'What are the fees?',
    a: 'Stellar network fees are approximately $0.00001 per transaction — essentially free. There are no additional platform fees.'
  },
  {
    q: 'Can I use this on mainnet?',
    a: 'This version runs on the Stellar Testnet for safe experimentation. Mainnet support can be enabled by switching the network configuration.'
  },
];

/* ──────────────────────────── FAQ Item ──────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-600/60"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-transparent hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-gray-200 pr-4">{q}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-purple-400 shrink-0" />
          : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────── HERO COMPONENT ──────────────────────────── */
export default function Hero() {
  const navigate = useNavigate();
  const { connectWallet, simulateConnection, loading } = useWallet();
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setError('');
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (err) {
      if (err.message.includes('installed')) {
        setError('Freighter wallet extension not detected. Please install it from freighter.app');
      } else {
        setError('Failed to connect wallet. Please make sure Freighter is unlocked.');
      }
    }
  };

  const handleSimulate = () => {
    simulateConnection();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#0c0a20] text-white flex flex-col relative overflow-hidden">
      
      {/* Error Toast */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in w-full max-w-md px-4">
          <div className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl flex flex-col gap-3 text-red-400 shadow-2xl shadow-red-500/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium">{error}</span>
              <button onClick={() => setError('')} className="ml-auto hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4 rotate-45" />
              </button>
            </div>
            <button 
              onClick={handleSimulate}
              className="text-xs font-bold uppercase tracking-wider text-white bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-all text-center border border-red-500/30"
            >
              Simulate Connection (Dev Mode)
            </button>
          </div>
        </div>
      )}
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/[0.07] blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/[0.06] blur-[130px] rounded-full animate-float" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/[0.04] blur-[160px] rounded-full" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-5 backdrop-blur-md bg-black/30 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Stellar</span>
            <span className="text-gradient">TipJar</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleConnect}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-4 h-4" />
            {loading ? 'Connecting…' : 'Connect'}
          </button>
          <button
            onClick={handleSimulate}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs font-bold text-gray-400 transition-all"
          >
            Demo
          </button>
        </div>
      </nav>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative z-10 flex flex-1 items-center px-6 md:px-12 py-20 md:py-0">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

          {/* Left – Copy */}
          <div>
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-300 mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Live on Stellar Testnet
              </div>
            </div>

            <h1 className="animate-fade-in-up animate-fade-in-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 font-poppins">
              Instant Crypto{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Tipping Made Simple
              </span>
            </h1>

            <p className="animate-fade-in-up animate-fade-in-up-delay-2 text-base sm:text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              Send XLM tips to creators, friends, and anyone worldwide in under 3 seconds — with fees so low they're practically free. Powered by the Stellar blockchain.
            </p>

            <div className="animate-fade-in-up animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={handleConnect}
                disabled={loading}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-base hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                    Connecting…
                  </>
                ) : (
                  <>
                    Connect Wallet
                    <Wallet className="w-5 h-5 text-purple-600" />
                  </>
                )}
              </button>

              <button
                onClick={handleSimulate}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-purple-500/30 bg-purple-500/5 rounded-full font-semibold text-base hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 text-purple-300"
              >
                <Sparkles className="w-5 h-5" />
                Try Demo Mode
              </button>
            </div>

            {/* Trust row */}
            <div className="animate-fade-in-up animate-fade-in-up-delay-4 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> No sign-up</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Non-custodial</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Open-source</span>
            </div>
          </div>

          {/* Right – Floating UI Card */}
          <div className="hidden md:flex justify-center relative">
            {/* Orbiting particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-orbit">
                <div className="w-3 h-3 bg-purple-500 rounded-full blur-[2px] shadow-lg shadow-purple-500/50" />
              </div>
              <div className="animate-orbit-reverse">
                <div className="w-2 h-2 bg-blue-400 rounded-full blur-[1px] shadow-lg shadow-blue-400/50" />
              </div>
            </div>

            {/* Main card */}
            <div className="relative glass-card rounded-3xl p-8 w-[340px] animate-float shadow-2xl shadow-purple-500/[0.05]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-400 font-medium">Your Balance</span>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-1 font-poppins">1,250.00 <span className="text-lg text-gray-400 font-normal">XLM</span></div>
              <div className="text-sm text-green-400 mb-8 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.5% this week
              </div>

              {/* Mini actions */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Send, label: 'Send', color: 'blue' },
                  { icon: ArrowUpRight, label: 'Receive', color: 'purple' },
                  { icon: Eye, label: 'History', color: 'cyan' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors cursor-default">
                    <Icon className={`w-4 h-4 text-${color}-400`} />
                    <span className="text-xs text-gray-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Recent tip */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold">A</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Tip to Alice</div>
                  <div className="text-xs text-gray-500">Just now</div>
                </div>
                <span className="text-sm font-semibold text-green-400">+5 XLM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '< 3s', label: 'Transaction Speed', color: 'text-blue-400' },
            { value: '$0.00001', label: 'Network Fee', color: 'text-purple-400' },
            { value: '24/7', label: 'Always Available', color: 'text-green-400' },
            { value: '150+', label: 'Countries Supported', color: 'text-yellow-400' },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${color} mb-1`}>{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Built for the <span className="text-gradient">Modern Web3 Era</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Everything you need to send and receive tips on the Stellar blockchain — fast, secure, and beautifully simple.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Transactions settle in under 3 seconds on the Stellar network.', color: 'blue' },
              { icon: Shield, title: 'Bank-Grade Security', desc: 'Non-custodial — your keys stay in your Freighter wallet.', color: 'purple' },
              { icon: Coins, title: 'Near-Zero Fees', desc: 'Pay ~$0.00001 per transaction. Perfect for micro-tips.', color: 'green' },
              { icon: Globe, title: 'Global Access', desc: 'Send tips to anyone, anywhere, 24/7 with no borders.', color: 'yellow' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card glass-card-hover rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.03] group">
                <div className="flex justify-center mb-5">
                  <div className={`p-4 bg-${color}-500/10 rounded-2xl group-hover:bg-${color}-500/20 transition-colors`}>
                    <Icon className={`w-8 h-8 text-${color}-400`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section id="how-it-works" className="relative z-10 px-6 md:px-12 py-24 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3 block">Getting Started</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Three Simple <span className="text-gradient">Steps</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">Start tipping in under a minute. No sign-ups, no KYC, no hassle.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Install Freighter and connect your Stellar wallet with one click.', icon: Wallet, color: 'blue' },
              { step: '02', title: 'Enter Details', desc: 'Paste a recipient address, pick an amount, and add an optional memo.', icon: Send, color: 'purple' },
              { step: '03', title: 'Send Instantly', desc: 'Confirm in Freighter and your tip arrives in under 3 seconds.', icon: CheckCircle2, color: 'green' },
            ].map(({ step, title, desc, icon: Icon, color }, i) => (
              <div key={step} className="relative text-center group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t border-dashed border-gray-700/50" />
                )}
                <div className={`mx-auto mb-5 w-20 h-20 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 text-${color}-400`} />
                </div>
                <span className={`text-xs font-bold text-${color}-400 tracking-widest mb-2 block`}>STEP {step}</span>
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ USE CASES ═══════════════════ */}
      <section id="use-cases" className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3 block">Use Cases</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Perfect For <span className="text-gradient">Everyone</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Content Creators', desc: 'Let your audience show appreciation with instant XLM tips for streams, videos, and posts.', color: 'blue' },
              { icon: TrendingUp, title: 'Freelancers', desc: 'Get paid quickly for micro-tasks and small gigs — no invoicing, no waiting.', color: 'purple' },
              { icon: Heart, title: 'Appreciation', desc: 'Say thanks with a tip for great service, mentorship, or community contributions.', color: 'pink' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] group">
                <div className={`p-4 bg-${color}-500/10 rounded-2xl w-fit mb-5 group-hover:bg-${color}-500/20 transition-colors`}>
                  <Icon className={`w-8 h-8 text-${color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="relative z-10 px-6 md:px-12 py-24 bg-white/[0.01]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqData.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-12 md:p-16 glow-border-purple">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Ready to Start <span className="text-gradient">Tipping?</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">Connect your Freighter wallet and send your first tip in seconds. No sign-up required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConnect}
              disabled={loading}
              className="group flex items-center justify-center gap-2 px-10 py-4 bg-white text-black rounded-full font-semibold text-base hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connecting…' : 'Get Started Free'}
              {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
            <button
              onClick={handleConnect}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-10 py-4 border border-gray-600 rounded-full font-semibold text-base hover:bg-white/5 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wallet className="w-5 h-5 text-purple-400" />
              Connect Wallet
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Stellar<span className="text-gradient">TipJar</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">The fastest way to send and receive XLM tips on the Stellar blockchain.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://freighter.app/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Freighter Wallet</a></li>
              <li><a href="https://stellar.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Stellar.org</a></li>
              <li><a href="https://laboratory.stellar.org/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Stellar Laboratory</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Network</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Testnet Active</li>
              <li><a href="https://horizon-testnet.stellar.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Horizon API</a></li>
              <li><a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Block Explorer</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <span>© 2026 Stellar TipJar. Built with ❤️ for the Stellar ecosystem.</span>
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="text-blue-400 font-medium">Stellar Network</span>
            <span>•</span>
            <span className="text-purple-400 font-medium">Testnet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}