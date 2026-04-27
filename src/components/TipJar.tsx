"use client";

import React, { useState } from 'react';
import { Card, Button, Input } from './UI';
import { Send, Wallet, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { sendTip, shortenAddress } from '@/lib/stellar';
import { motion, AnimatePresence } from 'framer-motion';

export function TipJar() {
  const { address, balance, isConnected, connect, refreshBalance } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ hash: string } | null>(null);
  const [error, setError] = useState('');

  const handleSendTip = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!address || !recipient || !amount) return;

    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      const result = await sendTip(recipient, amount, address);
      if (result.success && result.hash) {
        setSuccess({ hash: result.hash });
        setRecipient('');
        setAmount('');
        refreshBalance();
      } else {
        setError(result.error || 'Transaction failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const setPredefinedAmount = (val: string) => setAmount(val);

  if (!isConnected) {
    return (
      <Card className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
          <Wallet className="text-purple-400 w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">
          Connect your Freighter wallet to start sending tips on the Stellar network.
        </p>
        <Button onClick={connect} variant="secondary" glow>
          Connect Freighter
        </Button>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Send className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Stellar TipJar</h2>
            <p className="text-xs text-gray-400">Send instant XLM tips</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Your Balance</p>
          <p className="text-lg font-bold text-gradient">{parseFloat(balance).toFixed(2)} XLM</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-green-400 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tip Sent Successfully!</h3>
            <p className="text-gray-400 text-sm mb-6">Thank you for your generosity.</p>
            
            <div className="w-full bg-white/5 p-3 rounded-lg mb-6 flex items-center justify-between">
              <span className="text-xs text-gray-500">Hash: {shortenAddress(success.hash)}</span>
              <a 
                href={`https://stellar.expert/explorer/testnet/tx/${success.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 text-xs flex items-center hover:underline"
              >
                View Explorer <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
            
            <Button onClick={() => setSuccess(null)} variant="outline" className="w-full">
              Send Another Tip
            </Button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSendTip} 
            className="space-y-6"
          >
            <Input 
              label="Recipient Address"
              placeholder="G..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              error={error}
            />
            
            <div className="space-y-3">
              <Input 
                label="Amount (XLM)"
                placeholder="0.00"
                type="number"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="grid grid-cols-3 gap-2">
                {['1', '5', '10'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPredefinedAmount(val)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                      amount === val ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {val} XLM
                  </button>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              variant="secondary" 
              className="w-full py-4" 
              glow
              disabled={loading || !recipient || !amount}
            >
              {loading ? 'Processing...' : 'Send Tip Now'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}
