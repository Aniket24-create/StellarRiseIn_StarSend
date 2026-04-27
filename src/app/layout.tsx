import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CertifyX + TipJar | Secure Validation & Web3 Tipping",
  description: "Production-ready Digital Certificate Validation and Stellar TipJar dApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-mesh min-h-screen text-white`}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
