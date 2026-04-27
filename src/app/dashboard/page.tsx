"use client";

import React from 'react';
import { useWallet } from '@/context/WalletContext';
import { CertificateValidator } from '@/components/CertificateValidator';
import { TipJar } from '@/components/TipJar';
import { Card, Button } from '@/components/UI';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  Shield, 
  Bell,
  Search,
  ExternalLink
} from 'lucide-react';
import { shortenAddress } from '@/lib/stellar';
import Link from 'next/link';

export default function Dashboard() {
  const { address, isConnected } = useWallet();

  return (
    <div className="flex min-h-screen bg-mesh">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-gradient">CertifyX</span>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarItem icon={<History size={20} />} label="History" />
          <SidebarItem icon={<Bell size={20} />} label="Notifications" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-6 mt-auto">
          <div className="glass-card p-4 mb-6">
            <p className="text-[10px] text-gray-500 uppercase mb-2">Connected Wallet</p>
            <p className="text-xs font-mono text-blue-400">{isConnected ? shortenAddress(address!) : 'Not Connected'}</p>
          </div>
          <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors w-full px-4 py-2">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-gray-400">Manage your certificates and tips in one place.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
              />
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">Landing Page</Button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-8">
            <CertificateValidator />
            
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Recent Verifications</h3>
                <button className="text-xs text-blue-400 hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <HistoryItem 
                  title="Stellar Dev Certificate" 
                  date="Apr 24, 2026" 
                  status="Valid" 
                  id="CERT-2026-001"
                />
                <HistoryItem 
                  title="Web3 Security Course" 
                  date="Apr 22, 2026" 
                  status="Valid" 
                  id="CERT-2026-002"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <TipJar />
            
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Transaction History</h3>
                <button className="text-xs text-purple-400 hover:underline">View on Explorer</button>
              </div>
              <div className="space-y-4">
                <TxItem 
                  to="G...4X9R" 
                  amount="5.0 XLM" 
                  date="2 hours ago" 
                  status="Completed"
                />
                <TxItem 
                  to="G...K2JP" 
                  amount="10.0 XLM" 
                  date="1 day ago" 
                  status="Completed"
                />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function HistoryItem({ title, date, status, id }: { title: string, date: string, status: string, id: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-400 text-xs font-bold">
          {id.split('-')[2]}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-[10px] text-gray-500">{date} • ID: {id}</p>
        </div>
      </div>
      <span className="text-[10px] px-2 py-1 bg-green-500/10 text-green-400 rounded-full font-bold">
        {status}
      </span>
    </div>
  );
}

function TxItem({ to, amount, date, status }: { to: string, amount: string, date: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-purple-500/10 rounded flex items-center justify-center text-purple-400">
          <ExternalLink size={14} />
        </div>
        <div>
          <p className="text-sm font-medium">Sent to {to}</p>
          <p className="text-[10px] text-gray-500">{date} • {status}</p>
        </div>
      </div>
      <span className="text-sm font-bold text-gradient">
        -{amount}
      </span>
    </div>
  );
}
