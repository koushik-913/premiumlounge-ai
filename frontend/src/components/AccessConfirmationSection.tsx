import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, ShieldX } from 'lucide-react';
import type { VerificationResult } from '../backend';

interface Props {
  result: VerificationResult | null;
}

export default function AccessConfirmationSection({ result }: Props) {
  if (!result) {
    return (
      <section className="py-24 bg-secondary/40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="card-premium p-12">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-3xl font-light text-foreground mb-3">
              Access Confirmation
            </h2>
            <p className="text-muted-foreground">
              Run a verification above to see the access confirmation status.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const granted = result.accessGranted;

  return (
    <section className="py-24 bg-secondary/40">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div
          className={`card-premium p-12 text-center transition-all duration-500 ${
            granted
              ? 'border-success/50 bg-gradient-to-b from-success-light/60 to-white'
              : 'border-danger/50 bg-gradient-to-b from-danger-light/60 to-white'
          }`}
        >
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              granted ? 'bg-success/10' : 'bg-danger/10'
            }`}
          >
            {granted ? (
              <ShieldCheck className="w-10 h-10 text-success" />
            ) : (
              <ShieldX className="w-10 h-10 text-danger" />
            )}
          </div>

          {/* Status */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${
              granted ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
            }`}
          >
            {granted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium tracking-wide">
              {granted ? 'Access Authorized' : 'Access Restricted'}
            </span>
          </div>

          {/* Main Message */}
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
            {granted
              ? 'Access Authorized – Welcome to Premium Lounge'
              : 'Entry Denied – Unauthorized Access Attempt'}
          </h2>

          <p
            className={`text-base leading-relaxed max-w-md mx-auto mb-8 ${
              granted ? 'text-success/80' : 'text-danger/80'
            }`}
          >
            {granted
              ? `Welcome, ${result.passengerName}. Your ${result.membershipTier} membership has been verified. Please proceed to the lounge entrance.`
              : 'Your identity could not be verified against our member database. Please contact the lounge staff for assistance.'}
          </p>

          {/* Divider */}
          <div
            className={`w-16 h-0.5 mx-auto mb-8 ${granted ? 'bg-success/30' : 'bg-danger/30'}`}
          />

          {/* Details */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground text-xs mb-1">Passenger</div>
              <div className="font-semibold text-foreground">{result.passengerName}</div>
            </div>
            <div className={`w-px h-8 ${granted ? 'bg-success/20' : 'bg-danger/20'}`} />
            <div className="text-center">
              <div className="text-muted-foreground text-xs mb-1">Tier</div>
              <div className="font-semibold text-foreground">{result.membershipTier}</div>
            </div>
            <div className={`w-px h-8 ${granted ? 'bg-success/20' : 'bg-danger/20'}`} />
            <div className="text-center">
              <div className="text-muted-foreground text-xs mb-1">Confidence</div>
              <div className="font-semibold text-foreground">
                {result.confidenceScore.toString()}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
