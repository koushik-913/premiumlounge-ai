import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Member, VerificationResult, EntryLog } from '../backend';

// ── Members ──────────────────────────────────────────────────────────────────

export function useGetMembers() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      membershipTier,
      faceHash,
    }: {
      name: string;
      membershipTier: string;
      faceHash: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMember(name, membershipTier, faceHash);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

// ── Verification ──────────────────────────────────────────────────────────────

export function useSimulateVerification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageHash: string): Promise<VerificationResult> => {
      if (!actor) throw new Error('Actor not available');
      return actor.simulateVerification(imageHash);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entryLogs'] });
    },
  });
}

// ── Entry Logs ────────────────────────────────────────────────────────────────

export function useGetEntryLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<EntryLog[]>({
    queryKey: ['entryLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEntryLogs();
    },
    enabled: !!actor && !isFetching,
  });
}
