import React, { useState } from 'react';
import { ScanFace, CheckCircle2, XCircle, Loader2, User, Award, BarChart2, Clock } from 'lucide-react';
import { useSimulateVerification } from '../hooks/useQueries';
import type { VerificationResult } from '../backend';
import AccessConfirmationSection from './AccessConfirmationSection';

function formatVerificationTime(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  return new Date(ms).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export default function VerificationResultSection() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [imageHash, setImageHash] = useState('');
  const { mutate: runVerification, isPending } = useSimulateVerification();

  const handleVerify = () => {
    runVerification(imageHash, {
      onSuccess: (data) => {
        setResult(data);
      },
    });
  };

  return (
    <>
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light mb-4">
              <ScanFace className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-medium tracking-widest uppercase">
                Verification Result
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
              Identity Verification
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Run a simulated verification against the member database. Enter a member's face hash
              to test a match, or leave blank to simulate an unknown visitor.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Input & Button */}
            <div className="card-premium p-6 mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Face Hash (Image Identifier)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={imageHash}
                  onChange={(e) => setImageHash(e.target.value)}
                  placeholder="Enter face hash or leave blank for unknown visitor..."
                  className="flex-1 px-4 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
                <button
                  onClick={handleVerify}
                  disabled={isPending}
                  className="px-6 py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:bg-gold-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ScanFace className="w-4 h-4" />
                      Run Verification
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Add a member first, then use their face hash to simulate a successful match.
              </p>
            </div>

            {/* Result Panel */}
            {result && (
              <div className="animate-fade-in-up">
                {/* Info Panel */}
                <div className="card-premium p-6 mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-5 tracking-wide uppercase">
                    Verification Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: User,
                        label: 'Passenger Name',
                        value: result.passengerName,
                      },
                      {
                        icon: Award,
                        label: 'Membership Tier',
                        value: result.membershipTier,
                      },
                      {
                        icon: BarChart2,
                        label: 'Confidence Score',
                        value: `${result.confidenceScore.toString()}%`,
                      },
                      {
                        icon: Clock,
                        label: 'Verification Time',
                        value: formatVerificationTime(result.verificationTime),
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/60"
                      >
                        <div className="w-8 h-8 rounded-md bg-gold-light flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                          <div className="text-sm font-semibold text-foreground">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`card-premium p-6 flex items-center justify-center gap-4 ${
                    result.accessGranted
                      ? 'border-success/40 bg-success-light/40'
                      : 'border-danger/40 bg-danger-light/40'
                  }`}
                >
                  {result.accessGranted ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-success" />
                      <div>
                        <div className="text-2xl font-display font-semibold text-success">
                          Access Granted
                        </div>
                        <div className="text-sm text-success/70">
                          Identity verified successfully
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-danger" />
                      <div>
                        <div className="text-2xl font-display font-semibold text-danger">
                          Access Denied
                        </div>
                        <div className="text-sm text-danger/70">
                          No matching member found
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Access Confirmation */}
      <AccessConfirmationSection result={result} />
    </>
  );
}
