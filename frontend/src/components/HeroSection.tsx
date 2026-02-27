import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';

export default function HeroSection() {
  const handleScrollToLiveEntry = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('live-entry');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/lounge-hero.dim_1920x1080.png')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-dot-blink" />
          <span className="text-white/90 text-xs font-medium tracking-[0.15em] uppercase">
            AI-Powered Biometric Access
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
          Premium Lounge AI
          <br />
          <span className="text-gold font-normal">Face Recognition</span>
          <br />
          <span className="font-light">Entry System</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/75 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Seamless, secure, and instantaneous biometric verification for exclusive lounge access.
          Powered by advanced AI facial recognition technology.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleScrollToLiveEntry}
            className="px-8 py-3.5 bg-gold text-white font-medium text-sm tracking-wide rounded-sm hover:bg-gold-dark transition-all duration-200 shadow-premium-lg"
          >
            Begin Verification
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('member-management');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="px-8 py-3.5 border border-white/40 text-white font-medium text-sm tracking-wide rounded-sm hover:bg-white/10 transition-all duration-200"
          >
            Manage Members
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { icon: Shield, label: 'Secure Access', value: '99.9%' },
            { icon: Zap, label: 'Response Time', value: '<0.5s' },
            { icon: Users, label: 'Members', value: 'Unlimited' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="w-5 h-5 text-gold mx-auto mb-2 opacity-80" />
              <div className="text-white text-xl font-display font-light">{value}</div>
              <div className="text-white/50 text-xs mt-0.5 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
