import React, { useState, useEffect } from 'react';
import { ImageIcon, Cpu, Database, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: ImageIcon,
    title: 'Capturing Image',
    description:
      'High-resolution facial image is captured from the camera feed and pre-processed for optimal analysis quality.',
    detail: 'Resolution: 1920×1080 · Format: RAW · Compression: Lossless',
  },
  {
    id: 2,
    icon: Cpu,
    title: 'Extracting Facial Features',
    description:
      'Deep neural network extracts 128-dimensional facial embeddings, mapping unique biometric characteristics.',
    detail: '128 feature vectors · 68 landmark points · Liveness detection',
  },
  {
    id: 3,
    icon: Database,
    title: 'Matching Premium Member Database',
    description:
      'Extracted features are compared against the encrypted member database using cosine similarity scoring.',
    detail: 'Threshold: 95% · Encrypted DB · Real-time matching',
  },
];

export default function AIProcessingSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light mb-4">
            <Cpu className="w-3.5 h-3.5 text-teal" />
            <span className="text-teal text-xs font-medium tracking-widest uppercase">
              AI Processing
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Verification Workflow
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            A three-stage AI pipeline processes each verification request with military-grade
            precision and speed.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-border z-0" />

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isCompleted = activeStep > index;

              return (
                <div
                  key={step.id}
                  className={`card-premium p-6 transition-all duration-500 ${
                    isActive
                      ? 'border-gold shadow-premium-lg scale-[1.02]'
                      : isCompleted
                      ? 'border-success/40 bg-success-light/30'
                      : 'opacity-70'
                  }`}
                >
                  {/* Step number & icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-gold text-white shadow-premium'
                          : isCompleted
                          ? 'bg-success text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-gold animate-pulse-ring" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium tracking-widest uppercase mb-0.5">
                        Step {step.id}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Technical detail */}
                  <div
                    className={`px-3 py-2 rounded-md text-xs font-mono transition-all duration-300 ${
                      isActive
                        ? 'bg-gold-light text-gold'
                        : isCompleted
                        ? 'bg-success-light text-success'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step.detail}
                  </div>

                  {/* Progress bar */}
                  {isActive && (
                    <div className="mt-4 h-0.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-gold animate-step-progress rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Processing indicator */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 rounded-full ${
                activeStep === i
                  ? 'w-6 h-2 bg-gold'
                  : activeStep > i
                  ? 'w-2 h-2 bg-success'
                  : 'w-2 h-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
