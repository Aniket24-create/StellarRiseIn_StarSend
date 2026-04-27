import { server, STELLAR_NETWORK } from './stellar';
import * as StellarSdk from "@stellar/stellar-sdk";

export interface Certificate {
  id: string;
  studentName: string;
  issuer: string;
  course: string;
  date: string;
  status: 'Valid' | 'Invalid' | 'Revoked';
  txHash?: string;
}

// Mock database for demonstration
const MOCK_CERTIFICATES: Record<string, Certificate> = {
  "CERT-2026-001": {
    id: "CERT-2026-001",
    studentName: "John Doe",
    issuer: "Blockchain Academy",
    course: "Stellar Developer Bootcamp",
    date: "2026-03-15",
    status: 'Valid',
    txHash: "0587239472394723947239472394723947239472394723947239472394723947"
  },
  "CERT-2026-002": {
    id: "CERT-2026-002",
    studentName: "Jane Smith",
    issuer: "Tech Institute",
    course: "Advanced Web3 Development",
    date: "2026-04-10",
    status: 'Valid',
    txHash: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
};

export async function validateCertificate(id: string): Promise<Certificate | null> {
  // In a real app, this would query a backend or a smart contract/memo on Stellar
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network lag
  return MOCK_CERTIFICATES[id] || null;
}

export async function verifyOnChain(txHash: string) {
  try {
    const tx = await server.transactions().transaction(txHash).call();
    return tx;
  } catch (e) {
    console.error("Chain verification failed:", e);
    return null;
  }
}

export async function anchorCertificate(certId: string, studentName: string, senderPublicKey: string) {
  try {
    const account = await server.loadAccount(senderPublicKey);
    const hash = StellarSdk.hash(Buffer.from(`${certId}:${studentName}`)).toString('hex');
    
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: senderPublicKey, // Pay to self
          asset: StellarSdk.Asset.native(),
          amount: "0.00001",
        })
      )
      .addMemo(StellarSdk.Memo.text(`CertX:${certId}`))
      .setTimeout(60)
      .build();

    // Note: In real app, you'd sign with Freighter here
    return {
      success: true,
      memo: `CertX:${certId}`,
      hash: hash
    };
  } catch (e) {
    console.error("Anchoring failed:", e);
    return { success: false, error: "Failed to anchor certificate" };
  }
}
