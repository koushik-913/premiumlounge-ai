import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FaceDetectionSection from './components/FaceDetectionSection';
import AIProcessingSection from './components/AIProcessingSection';
import VerificationResultSection from './components/VerificationResultSection';
import MemberManagementSection from './components/MemberManagementSection';
import EntryLogsSection from './components/EntryLogsSection';
import SystemStatusSection from './components/SystemStatusSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Section 1 – Hero */}
        <HeroSection />

        {/* Section 2 – Face Detection (Live Entry) */}
        <FaceDetectionSection />

        {/* Section 3 – AI Processing */}
        <AIProcessingSection />

        {/* Section 4 – Verification Result + Section 5 – Access Confirmation */}
        <VerificationResultSection />

        {/* Section 6 – Member Management */}
        <MemberManagementSection />

        {/* Section 7 – Entry Logs */}
        <EntryLogsSection />

        {/* Section 8 – Security & System Status */}
        <SystemStatusSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
