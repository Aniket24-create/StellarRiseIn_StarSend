import { 
  isConnected, 
  getPublicKey, 
  signTransaction, 
  setAllowed,
  Network
} from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";
import { logger } from "./logger";

export const STELLAR_NETWORK = "TESTNET";
export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const server = new StellarSdk.Horizon.Server(HORIZON_URL);

export async function checkFreighter() {
  return await isConnected();
}

export async function connectFreighter() {
  if (await isConnected()) {
    const publicKey = await getPublicKey();
    return publicKey;
  }
  return null;
}

export async function getXLMBalance(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    const balance = account.balances.find(b => b.asset_type === 'native');
    return balance ? balance.balance : "0";
  } catch (e) {
    console.error("Error fetching balance:", e);
    return "0";
  }
}

export async function sendTip(recipient: string, amount: string, senderPublicKey: string) {
  try {
    const account = await server.loadAccount(senderPublicKey);
    
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: recipient,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(60)
      .build();

    const xdr = transaction.toXDR();
    const signedXdr = await signTransaction(xdr, { network: STELLAR_NETWORK as Network });
    
    const result = await server.submitTransaction(
      StellarSdk.TransactionBuilder.fromXDR(signedXdr, StellarSdk.Networks.TESTNET) as StellarSdk.Transaction
    );
    
    logger.log('info', 'Tip sent successfully', { hash: result.hash, sender: senderPublicKey, recipient });

    return {
      success: true,
      hash: result.hash,
    };
  } catch (e: any) {
    logger.log('error', 'Transaction failed', { error: e.message, sender: senderPublicKey });
    console.error("Transaction failed:", e);
    return {
      success: false,
      error: e.message || "Transaction failed",
    };
  }
}

export function shortenAddress(address: string) {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
