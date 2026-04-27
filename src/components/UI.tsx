import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("glass-card p-6", className)}>
      {children}
    </div>
  );
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  glow = false,
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
  size?: 'sm' | 'md' | 'lg',
  glow?: boolean
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-neon-blue",
    secondary: "bg-purple-600 hover:bg-purple-700 text-white shadow-neon-purple",
    outline: "border border-white/20 hover:bg-white/10 text-white",
    ghost: "hover:bg-white/5 text-gray-400 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={cn(
        "rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2",
        variants[variant],
        sizes[size],
        glow && (variant === 'primary' ? 'neon-glow-blue' : 'neon-glow-purple'),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string }) {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
      <input 
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600",
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
}
