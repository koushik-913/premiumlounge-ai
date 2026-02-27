import React from 'react';
import { ScanFace, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'premiumlounge-ai');

  return (
    <footer className="bg-foreground text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <ScanFace className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display text-white text-base font-light tracking-wide">
                PremiumLounge AI
              </span>
              <div className="text-white/40 text-xs mt-0.5">
                Face Recognition Entry System
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-xs text-white/40 mb-1">
              © {year} PremiumLounge AI. All rights reserved.
            </p>
            <p className="text-xs text-white/40 flex items-center justify-center gap-1">
              Built with{' '}
              <Heart className="w-3 h-3 text-gold fill-gold" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-dark transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-dot-blink" />
            <span className="text-white/40">System Operational</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
          <span>Biometric Security System</span>
          <span>·</span>
          <span>AES-256 Encrypted</span>
          <span>·</span>
          <span>ICP Blockchain Powered</span>
          <span>·</span>
          <span>GDPR Compliant</span>
        </div>
      </div>
    </footer>
  );
}
