import React from 'react';
import { Camera, Eye, Scan } from 'lucide-react';

export default function FaceDetectionSection() {
  return (
    <section id="live-entry" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light mb-4">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">Live Entry</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Face Detection
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Our advanced camera system captures and analyzes facial features in real-time,
            ensuring precise identification for every lounge entry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Camera Card */}
          <div className="flex justify-center">
            <div className="card-premium p-6 w-full max-w-md">
              {/* Camera Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-dot-blink" />
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                    Camera Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-border" />
                  <div className="w-1.5 h-1.5 rounded-full bg-border" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
              </div>

              {/* Camera Feed Area */}
              <div className="relative bg-foreground/5 rounded-lg overflow-hidden aspect-[4/3]">
                {/* Simulated camera background */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/8 via-foreground/4 to-foreground/10" />

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(oklch(0.18 0.01 260) 1px, transparent 1px), linear-gradient(90deg, oklch(0.18 0.01 260) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Face Detection Frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-48">
                    {/* Corner brackets */}
                    {/* Top-left */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
                    {/* Top-right */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
                    {/* Bottom-left */}
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
                    {/* Bottom-right */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />

                    {/* Pulsing outer ring */}
                    <div className="absolute inset-[-12px] border border-gold/30 rounded-sm animate-pulse-ring" />

                    {/* Face silhouette */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        viewBox="0 0 80 96"
                        className="w-24 h-28 opacity-20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse cx="40" cy="38" rx="28" ry="34" stroke="oklch(0.62 0.12 75)" strokeWidth="1.5" />
                        <ellipse cx="28" cy="34" rx="5" ry="4" stroke="oklch(0.62 0.12 75)" strokeWidth="1.5" />
                        <ellipse cx="52" cy="34" rx="5" ry="4" stroke="oklch(0.62 0.12 75)" strokeWidth="1.5" />
                        <path d="M30 52 Q40 58 50 52" stroke="oklch(0.62 0.12 75)" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M20 72 Q40 88 60 72" stroke="oklch(0.62 0.12 75)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* Scan line */}
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent animate-scan-line"
                      style={{ position: 'absolute' }}
                    />
                  </div>
                </div>

                {/* Corner labels */}
                <div className="absolute top-3 left-3 text-gold/60 text-[10px] font-mono tracking-wider">
                  CAM-01
                </div>
                <div className="absolute top-3 right-3 text-gold/60 text-[10px] font-mono tracking-wider">
                  HD 1080p
                </div>
                <div className="absolute bottom-3 left-3 text-gold/60 text-[10px] font-mono tracking-wider">
                  DETECTING...
                </div>
                <div className="absolute bottom-3 right-3 text-gold/60 text-[10px] font-mono tracking-wider">
                  30 FPS
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Scan className="w-3.5 h-3.5 text-gold" />
                  <span>Scanning for faces...</span>
                </div>
                <span className="font-mono text-gold">LIVE</span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-light text-foreground mb-3">
                How Face Detection Works
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our system uses state-of-the-art computer vision to detect and locate faces
                within the camera frame, preparing them for biometric analysis.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Camera,
                  title: 'High-Resolution Capture',
                  desc: 'Full HD camera captures a clear image of the passenger approaching the lounge entrance.',
                },
                {
                  icon: Eye,
                  title: 'Face Localization',
                  desc: 'AI algorithms detect and isolate the facial region with sub-pixel precision using bounding box detection.',
                },
                {
                  icon: Scan,
                  title: 'Quality Assessment',
                  desc: 'The system evaluates image quality, lighting, and angle before proceeding to feature extraction.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
