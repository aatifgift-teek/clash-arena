import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TournamentView {
    id: TournamentId;
    startTime: Timestamp;
    status: TournamentStatus;
    title: string;
    teamMode: TeamMode;
    contestType: ContestType;
    currentParticipants: bigint;
    game: Game;
    roomPassword?: string;
    viewMode: ViewMode;
    maxParticipants: bigint;
    entryFee: bigint;
    roomCode?: string;
    prizePool: bigint;
}
export interface UserView {
    id: UserId;
    username: string;
    createdAt: Timestamp;
    wins: bigint;
    totalEarnings: bigint;
    matchesPlayed: bigint;
}
export interface ParticipantView {
    status: ParticipantStatus;
    teamName?: string;
    userId: UserId;
    tournamentId: TournamentId;
}
export type TournamentId = bigint;
export type UserId = Principal;
export type TransactionId = bigint;
export interface Transaction {
    id: TransactionId;
    userId: UserId;
    timestamp: Timestamp;
    txType: TransactionType;
    amount: bigint;
    tournamentId?: TournamentId;
    reason: TransactionReason;
}
export interface MatchResult {
    damage: bigint;
    userId: UserId;
    earnings: bigint;
    position: bigint;
    tournamentId: TournamentId;
    kills: bigint;
}
export interface CreateTournamentArgs {
    startTime: Timestamp;
    title: string;
    teamMode: TeamMode;
    contestType: ContestType;
    game: Game;
    viewMode: ViewMode;
    maxParticipants: bigint;
    entryFee: bigint;
    prizePool: bigint;
}
export enum ContestType {
    Damage = "Damage",
    TopPosition = "TopPosition",
    MostKills = "MostKills"
}
export enum Game {
    BGMI = "BGMI",
    FreeFire = "FreeFire"
}
export enum ParticipantStatus {
    Eliminated = "Eliminated",
    Joined = "Joined",
    Completed = "Completed"
}
export enum TeamMode {
    Duo = "Duo",
    Squad = "Squad",
    Solo = "Solo"
}
export enum TournamentStatus {
    Live = "Live",
    WaitingResults = "WaitingResults",
    RoomCodePosted = "RoomCodePosted",
    Cancelled = "Cancelled",
    Completed = "Completed",
    Upcoming = "Upcoming"
}
export enum TransactionReason {
    Refund = "Refund",
    EntryFee = "EntryFee",
    PrizeWin = "PrizeWin",
    Signup = "Signup"
}
export enum TransactionType {
    Debit = "Debit",
    Credit = "Credit"
}
export enum Variant_ok_alreadyJoined_tournamentFull_insufficientFunds_notJoinable_notFound_notRegistered {
    ok = "ok",
    alreadyJoined = "alreadyJoined",
    tournamentFull = "tournamentFull",
    insufficientFunds = "insufficientFunds",
    notJoinable = "notJoinable",
    notFound = "notFound",
    notRegistered = "notRegistered"
}
export enum Variant_ok_anonymous_alreadyClaimed {
    ok = "ok",
    anonymous = "anonymous",
    alreadyClaimed = "alreadyClaimed"
}
export enum Variant_ok_anonymous_alreadyRegistered {
    ok = "ok",
    anonymous = "anonymous",
    alreadyRegistered = "alreadyRegistered"
}
export enum Variant_ok_invalidStatus_notFound_notAdmin {
    ok = "ok",
    invalidStatus = "invalidStatus",
    notFound = "notFound",
    notAdmin = "notAdmin"
}
export enum Variant_ok_notFound_notAdmin {
    ok = "ok",
    notFound = "notFound",
    notAdmin = "notAdmin"
}
export enum Variant_ok_userNotFound_notAdmin {
    ok = "ok",
    userNotFound = "userNotFound",
    notAdmin = "notAdmin"
}
export enum ViewMode {
    FPP = "FPP",
    TPP = "TPP"
}
export interface backendInterface {
    adminAdjustBalance(userId: UserId, amount: bigint, txType: TransactionType): Promise<Variant_ok_userNotFound_notAdmin>;
    adminCreateTournament(args: CreateTournamentArgs): Promise<{
        __kind__: "ok";
        ok: TournamentId;
    } | {
        __kind__: "notAdmin";
        notAdmin: null;
    }>;
    adminPostRoomCode(id: TournamentId, code: string, password: string | null): Promise<Variant_ok_notFound_notAdmin>;
    adminSubmitMatchResults(tournamentId: TournamentId, results: Array<MatchResult>): Promise<Variant_ok_invalidStatus_notFound_notAdmin>;
    adminUpdateTournamentStatus(id: TournamentId, status: TournamentStatus): Promise<Variant_ok_notFound_notAdmin>;
    claimAdmin(): Promise<Variant_ok_anonymous_alreadyClaimed>;
    getMatchResults(tournamentId: TournamentId): Promise<Array<MatchResult>>;
    getMyBalance(): Promise<bigint>;
    getMyProfile(): Promise<UserView | null>;
    getMyTransactions(): Promise<Array<Transaction>>;
    getParticipants(id: TournamentId): Promise<Array<ParticipantView>>;
    getProfile(userId: UserId): Promise<UserView | null>;
    getTournament(id: TournamentId): Promise<TournamentView | null>;
    isRegistered(): Promise<boolean>;
    joinTournament(tournamentId: TournamentId, teamName: string | null): Promise<Variant_ok_alreadyJoined_tournamentFull_insufficientFunds_notJoinable_notFound_notRegistered>;
    listTournaments(): Promise<Array<TournamentView>>;
    listUsers(): Promise<Array<UserView>>;
    register(username: string): Promise<Variant_ok_anonymous_alreadyRegistered>;
}
