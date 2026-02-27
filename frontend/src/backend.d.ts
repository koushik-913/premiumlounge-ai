import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Member {
    id: string;
    name: string;
    faceHash: string;
    membershipTier: string;
}
export interface VerificationResult {
    verificationTime: bigint;
    accessGranted: boolean;
    passengerName: string;
    confidenceScore: bigint;
    membershipTier: string;
}
export interface EntryLog {
    result: string;
    passengerName: string;
    confidenceScore: bigint;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMember(name: string, membershipTier: string, faceHash: string): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEntryLogs(): Promise<Array<EntryLog>>;
    getMemberById(id: string): Promise<Member | null>;
    getMembers(): Promise<Array<Member>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    simulateVerification(imageHash: string): Promise<VerificationResult>;
}
