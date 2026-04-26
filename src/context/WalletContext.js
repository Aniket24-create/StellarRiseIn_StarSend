import React, { createContext, useContext, useState, useEffect } from 'react';
import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api';
import * as StellarSdk from '@stellar/stellar-sdk';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Initialize Stellar server (testnet)
  const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkWalletConnection = async () => {
    try {
      const connected = await isConnected();
      if (connected) {
        const key = await getPublicKey();
        setPublicKey(key);
        setIsWalletConnected(true);
        await fetchBalance(key);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      const key = await getPublicKey();
      setPublicKey(key);
      setIsWalletConnected(true);
      await fetchBalance(key);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async (key) => {
    try {
      const account = await server.loadAccount(key);
      const xlmBalance = account.balances.find(balance => balance.asset_type === 'native');
      setBalance(xlmBalance ? xlmBalance.balance : '0');
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0');
    }
  };

  const sendPayment = async (destinationKey, amount, memo = '') => {
    try {
      setLoading(true);

      // Load the source account
      const sourceAccount = await server.loadAccount(publicKey);

      // Create transaction
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationKey,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(30);

      if (memo) {
        transaction.addMemo(StellarSdk.Memo.text(memo));
      }

      const builtTransaction = transaction.build();

      // Sign transaction with Freighter
      const signedTransaction = await signTransaction(builtTransaction.toXDR(), {
        networkPassphrase: StellarSdk.Networks.TESTNET,
      });

      // Submit transaction
      const transactionResult = await server.submitTransaction(
        StellarSdk.TransactionBuilder.fromXDR(signedTransaction, StellarSdk.Networks.TESTNET)
      );

      // Update balance after successful transaction
      await fetchBalance(publicKey);

      // Add to transaction history
      const newTransaction = {
        id: transactionResult.hash,
        amount: amount,
        destination: destinationKey,
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      return transactionResult;
    } catch (error) {
      console.error('Error sending payment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const value = {
    isWalletConnected,
    publicKey,
    balance,
    loading,
    transactions,
    connectWallet,
    sendPayment,
    shortenAddress,
    fetchBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};