import React, { useState } from 'react';
import { Users, Plus, Loader2, UserCheck, Hash } from 'lucide-react';
import { useGetMembers, useAddMember } from '../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const TIER_COLORS: Record<string, string> = {
  Diamond: 'bg-teal-light text-teal border-teal/20',
  Platinum: 'bg-secondary text-foreground border-border',
  Gold: 'bg-gold-light text-gold border-gold/20',
  Silver: 'bg-secondary text-muted-foreground border-border',
};

function getTierClass(tier: string): string {
  return TIER_COLORS[tier] || 'bg-secondary text-muted-foreground border-border';
}

export default function MemberManagementSection() {
  const { data: members, isLoading } = useGetMembers();
  const { mutate: addMember, isPending } = useAddMember();

  const [name, setName] = useState('');
  const [tier, setTier] = useState('Gold');
  const [faceHash, setFaceHash] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setError('');
    addMember(
      { name: name.trim(), membershipTier: tier, faceHash: faceHash.trim() || `hash_${Date.now()}` },
      {
        onSuccess: () => {
          setName('');
          setFaceHash('');
          setTier('Gold');
        },
      }
    );
  };

  return (
    <section id="member-management" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light mb-4">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">
              Member Management
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Premium Members
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Manage lounge members and their biometric profiles. Add new members and assign
            membership tiers for access control.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Member Form */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold-light flex items-center justify-center">
                  <Plus className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground">Add New Member</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. James Anderson"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  />
                  {error && <p className="text-xs text-danger mt-1">{error}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Membership Tier
                  </label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  >
                    <option value="Diamond">Diamond</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Face Hash (optional)
                  </label>
                  <input
                    type="text"
                    value={faceHash}
                    onChange={(e) => setFaceHash(e.target.value)}
                    placeholder="Auto-generated if blank"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this hash in the verification section to simulate a match.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:bg-gold-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding Member...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Member
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Members List */}
          <div className="lg:col-span-2">
            <div className="card-premium overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Registered Members</h3>
                <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  {members?.length ?? 0} total
                </span>
              </div>

              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              ) : !members || members.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">No members registered yet.</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Add your first member using the form.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="px-6 py-4 flex items-center gap-4 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-5 h-5 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm">{member.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Hash className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-mono truncate max-w-[200px]">
                            {member.faceHash}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getTierClass(
                          member.membershipTier
                        )}`}
                      >
                        {member.membershipTier}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
