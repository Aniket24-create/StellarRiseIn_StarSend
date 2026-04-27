"use client";

import React, { useState } from 'react';
import { Card, Button, Input } from './UI';
import { Search, CheckCircle, XCircle, ShieldCheck, QrCode } from 'lucide-react';
import { validateCertificate, Certificate } from '@/lib/certificates';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export function CertificateValidator() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const cert = await validateCertificate(certId);
      if (cert) {
        setResult(cert);
      } else {
        setError('Certificate not found. Please check the ID and try again.');
      }
    } catch (err) {
      setError('An error occurred during validation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <ShieldCheck className="text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Certificate Validation</h2>
          <p className="text-xs text-gray-400">Verify authenticity via ID or Hash</p>
        </div>
      </div>

      <form onSubmit={handleValidate} className="space-y-4">
        <div className="flex space-x-2">
          <Input 
            placeholder="Enter Certificate ID (e.g. CERT-2026-001)"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={loading} className="whitespace-nowrap">
            {loading ? 'Validating...' : 'Verify'}
          </Button>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" className="text-blue-400">
            <QrCode size={16} className="mr-2" />
            Scan QR Code
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3 text-red-400 text-sm"
          >
            <XCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{result.studentName}</h3>
                <p className="text-sm text-gray-400">{result.course}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                result.status === 'Valid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {result.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 mb-1">Issuer</p>
                <p className="font-medium">{result.issuer}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Issue Date</p>
                <p className="font-medium">{result.date}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-gray-500 mb-1">On-chain Proof (Stellar)</p>
                <p className="text-[10px] font-mono truncate text-blue-400 max-w-[150px]">{result.txHash}</p>
              </div>
              <button 
                onClick={() => setShowQR(!showQR)}
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <QrCode size={16} />
              </button>
            </div>

            {showQR && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 flex flex-col items-center justify-center space-y-2"
              >
                <div className="p-3 bg-white rounded-xl">
                  <QRCodeSVG value={`https://certifyx.vercel.app/verify/${result.id}`} size={120} />
                </div>
                <p className="text-[10px] text-gray-500">Scan to verify this certificate</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
