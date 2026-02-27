# Specification

## Summary
**Goal:** Build a Premium Airport Lounge Face Recognition Entry System — a single-page application with a Motoko backend managing members, simulated verification, and entry logs, paired with an elegant premium-themed frontend.

**Planned changes:**

**Backend (Motoko actor):**
- Store member records with fields: name, membership tier (Gold/Platinum/Diamond), and mock facial feature hash
- Expose `addMember`, `getMembers`, `getMemberById` functions
- Expose `simulateVerification(mockImageHash)` returning: passengerName, membershipTier, confidenceScore, verificationTime, accessGranted
- Store entry logs on each `simulateVerification` call; expose `getEntryLogs` returning chronological log entries (timestamp, name, result, confidenceScore)

**Frontend:**
- Fixed top navigation bar with exactly four links: "Live Entry", "Member Management", "Entry Logs", "Security & System Status" — smooth-scroll to corresponding sections
- **Section 1 – Hero:** Full-width hero using `lounge-hero.dim_1920x1080.png` as background with dark gradient overlay; title "Premium Lounge AI – Face Recognition Entry System" and a short subtitle
- **Section 2 – Face Detection:** Centered card with simulated camera feed area, CSS/SVG bounding-box frame overlay, and a pulsing scan animation
- **Section 3 – AI Processing:** Three-step stepper (Capturing Image → Extracting Facial Features → Matching Premium Member Database), each with icon, label, description, and animated connector
- **Section 4 – Verification Result:** "Run Verification" button calls `simulateVerification`; displays Passenger Name, Membership Tier, Confidence Score, Verification Time in an info panel; animated green "Access Granted" or red "Access Denied" status badge
- **Section 5 – Access Confirmation:** Conditional confirmation card — green checkmark + "Access Authorized – Welcome to Premium Lounge" or red X + denial message based on verification result
- **Member Management section:** Table/card grid of all members; add-member form (name, tier) calling `addMember` and refreshing the list; empty state message
- **Entry Logs section:** Reverse-chronological log list showing timestamp, name, result, confidence score; empty state message
- **Security & System Status section:** Static dashboard with status dots for Face Recognition Engine, Database Connection, Camera Feed, and Last System Check
- Premium light theme: soft-grey (#F5F5F7) backgrounds, charcoal typography, gold or muted teal accents, Inter font, subtle card shadows, smooth scroll, minimal hover micro-animations — no blue or purple

**User-visible outcome:** Users can view the premium lounge entry interface, simulate face recognition verification to see passenger results and access decisions, manage lounge members, review entry logs, and check system status — all within a calm, elegant single-page experience.
