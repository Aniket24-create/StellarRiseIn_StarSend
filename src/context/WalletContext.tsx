"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { connectFreighter, getXLMBalance } from '@/lib/stellar';

interface WalletContextType {
  address: string | null;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isConnecting, setIsConnecting] = useState(false);

  const refreshBalance = useCallback(async () => {
    if (address) {
      const bal = await getXLMBalance(address);
      setBalance(bal);
    }
  }, [address]);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const pubKey = await connectFreighter();
      if (pubKey) {
        setAddress(pubKey);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (address) {
      refreshBalance();
    }
  }, [address, refreshBalance]);

  return (
    <WalletContext.Provider value={{ 
      address, 
      balance, 
      isConnected: !!address, 
      isConnecting, 
      connect, 
      refreshBalance 
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
