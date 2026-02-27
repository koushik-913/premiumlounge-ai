import React from 'react';
import { ClipboardList, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useGetEntryLogs } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { EntryLog } from '../backend';

function formatTimestamp(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export default function EntryLogsSection() {
  const { data: logs, isLoading } = useGetEntryLogs();

  const sortedLogs = logs
    ? [...logs].sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))
    : [];

  return (
    <section id="entry-logs" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light mb-4">
            <ClipboardList className="w-3.5 h-3.5 text-teal" />
            <span className="text-teal text-xs font-medium tracking-widest uppercase">
              Entry Logs
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Verification History
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            A complete audit trail of all verification attempts, providing full transparency
            and accountability for lounge access events.
          </p>
        </div>

        <div className="card-premium overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-border bg-secondary/40 grid grid-cols-4 gap-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Timestamp
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Passenger
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Confidence
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Result
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : sortedLogs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">No entry logs yet.</p>
              <p className="text-muted-foreground text-xs mt-1">
                Run a verification to generate the first log entry.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {sortedLogs.map((log: EntryLog, index: number) => {
                const granted = log.result === 'Granted';
                return (
                  <div
                    key={index}
                    className="px-6 py-4 grid grid-cols-4 gap-4 items-center hover:bg-secondary/30 transition-colors"
                  >
                    {/* Timestamp */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>

                    {/* Passenger */}
                    <div className="text-sm font-medium text-foreground">
                      {log.passengerName}
                    </div>

                    {/* Confidence */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[80px] h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            granted ? 'bg-success' : 'bg-danger'
                          }`}
                          style={{ width: `${log.confidenceScore.toString()}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">
                        {log.confidenceScore.toString()}%
                      </span>
                    </div>

                    {/* Result */}
                    <div className="flex items-center gap-1.5">
                      {granted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-xs font-medium text-success">Granted</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-danger" />
                          <span className="text-xs font-medium text-danger">Denied</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          {sortedLogs.length > 0 && (
            <div className="px-6 py-3 border-t border-border bg-secondary/20 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {sortedLogs.length} total {sortedLogs.length === 1 ? 'entry' : 'entries'}
              </span>
              <span className="text-xs text-muted-foreground">
                Sorted by most recent first
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
