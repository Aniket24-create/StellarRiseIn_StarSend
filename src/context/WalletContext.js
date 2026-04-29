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
  const [isSimulated, setIsSimulated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isGaslessEnabled, setIsGaslessEnabled] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalTipsSent: 0,
    totalXLMSent: 0,
    transactionCount: 0
  });

  const [goal, setGoal] = useState({
    target: 100,
    current: 45 // Mock starting value
  });

  // Mock Username Mapping
  const usernameMap = {
    '@aniket': 'GCPWRE2D7K2C7A7M7D7J7I7G7H7E7L7L7A7R7N7E7T7W7O7R7K7H7X7Y7Z7',
    '@starlord': 'GABC1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD',
    '@creator': 'GB7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V'
  };

  const resolveUsername = (input) => {
    if (input.startsWith('@')) {
      return usernameMap[input.toLowerCase()] || null;
    }
    return input;
  };

  // Initialize Stellar server (testnet)
  const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkWalletConnection = async () => {
    try {
      // Fast check without timeout for initial load
      const connected = await isConnected();
      if (connected) {
        const key = await getPublicKey();
        if (key) {
          setPublicKey(key);
          setIsWalletConnected(true);
          setIsSimulated(false);
          await fetchBalance(key);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout - Please ensure Freighter is installed and unlocked')), 10000);
      });

      const connectPromise = async () => {
        const connected = await isConnected();
        if (!connected) {
          throw new Error('Freighter wallet extension is not installed');
        }
        const key = await getPublicKey();
        setPublicKey(key);
        setIsWalletConnected(true);
        setIsSimulated(false);
        await fetchBalance(key);
      };

      await Promise.race([connectPromise(), timeoutPromise]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const simulateConnection = () => {
    setLoading(true);
    setTimeout(() => {
      const mockKey = 'GCPWRE2D7K2C7A7M7D7J7I7G7H7E7L7L7A7R7N7E7T7W7O7R7K7H7X7Y7Z7';
      setPublicKey(mockKey);
      setIsWalletConnected(true);
      setIsSimulated(true);
      setBalance('1250.00');
      setLoading(false);
    }, 1000);
  };

  const fetchBalance = async (key) => {
    if (isSimulated) return; // Don't fetch for mock account
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

      if (isSimulated) {
        // Simulate a delay for the transaction
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate a mock transaction result
        const transactionResult = {
          hash: 'sim_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          ledger: 123456,
          successful: true
        };

        // Update mock balance
        setBalance(prev => (parseFloat(prev) - parseFloat(amount)).toFixed(7));

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
      }

      // Load the source account
      const sourceAccount = await server.loadAccount(publicKey);

      // Fetch base fee from the network
      const feeStats = await server.feeStats();
      const networkFee = feeStats?.max_fee?.mode || StellarSdk.BASE_FEE;

      // Create transaction
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: networkFee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationKey,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(StellarSdk.TimeoutInfinite); // Avoid transaction expiration errors

      if (memo) {
        transaction.addMemo(StellarSdk.Memo.text(memo));
      }

      const builtTransaction = transaction.build();

      // Sign transaction with Freighter
      const signedTransaction = await signTransaction(builtTransaction.toXDR(), {
        networkPassphrase: StellarSdk.Networks.TESTNET,
        network: 'TESTNET'
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
      
      // Update Analytics
      setAnalytics(prev => ({
        totalTipsSent: prev.totalTipsSent + 1,
        totalXLMSent: prev.totalXLMSent + parseFloat(amount),
        transactionCount: prev.transactionCount + 1
      }));

      return transactionResult;
    } catch (error) {
      console.error('Error sending payment:', error);
      // Enhanced error object to capture response data
      if (error?.response?.data) {
        throw error.response.data;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setIsSimulated(false);
    setPublicKey('');
    setBalance('0');
  };

  const value = {
    isWalletConnected,
    isSimulated,
    publicKey,
    balance,
    loading,
    transactions,
    connectWallet,
    simulateConnection,
    disconnectWallet,
    sendPayment,
    shortenAddress,
    fetchBalance,
    isGaslessEnabled,
    setIsGaslessEnabled,
    analytics,
    goal,
    resolveUsername,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};