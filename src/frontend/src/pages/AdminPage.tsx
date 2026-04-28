import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  Crown,
  Gavel,
  KeyRound,
  Lock,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CoinBadge } from "../components/CoinBadge";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useTournaments } from "../hooks/useTournaments";
import type {
  ContestType,
  Game,
  MatchResult,
  ParticipantView,
  TeamMode,
  TournamentStatus,
  TournamentView,
  UserView,
} from "../types";
import { teamModeLabel } from "../utils/format";

// ── Seed users ───────────────────────────────────────────────────────────────
const SEED_USERS: UserView[] = [
  {
    principal: "aaaaa-aaaab-bbbbb-ccccc-ddddd",
    username: "BlazeKing",
    coins: 4200,
    totalWins: 12,
    totalMatches: 34,
    createdAt: Date.now() - 30 * 86400000,
    winRate: 35.3,
  },
  {
    principal: "eeeee-fffff-ggggg-hhhhh-iiiii",
    username: "PhantomX99",
    coins: 1500,
    totalWins: 5,
    totalMatches: 21,
    createdAt: Date.now() - 15 * 86400000,
    winRate: 23.8,
  },
  {
    principal: "jjjjj-kkkkk-lllll-mmmmm-nnnnn",
    username: "NightRaider",
    coins: 8700,
    totalWins: 22,
    totalMatches: 50,
    createdAt: Date.now() - 60 * 86400000,
    winRate: 44.0,
  },
  {
    principal: "ooooo-ppppp-qqqqq-rrrrr-sssss",
    username: "StormBreaker",
    coins: 300,
    totalWins: 1,
    totalMatches: 8,
    createdAt: Date.now() - 5 * 86400000,
    winRate: 12.5,
  },
];

function truncatePrincipal(p: string) {
  if (p.length <= 16) return p;
  return `${p.slice(0, 8)}…${p.slice(-6)}`;
}

function seedParticipants(): ParticipantView[] {
  return [
    {
      userId: "u1",
      username: "BlazeKing",
      joinedAt: Date.now() - 3600000,
      teamMode: "Solo",
    },
    {
      userId: "u2",
      username: "PhantomX99",
      joinedAt: Date.now() - 2400000,
      teamMode: "Solo",
    },
    {
      userId: "u3",
      username: "NightRaider",
      joinedAt: Date.now() - 1200000,
      teamMode: "Solo",
    },
  ];
}

// ── Room Code Form ───────────────────────────────────────────────────────────
function RoomCodeForm({
  tournamentId,
  onDone,
}: { tournamentId: string; onDone: () => void }) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (!code.trim()) {
      toast.error("Room code is required");
      return;
    }
    toast.success(`Room code posted for ${tournamentId}`);
    onDone();
  }

  return (
    <div className="space-y-3 pt-3 border-t border-border">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Room Code
          </Label>
          <Input
            data-ocid="admin.room_code.input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. ARENA2025"
            className="mt-1 bg-muted border-border font-mono text-sm"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Password
          </Label>
          <Input
            data-ocid="admin.room_password.input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="optional"
            className="mt-1 bg-muted border-border font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleSubmit}
          data-ocid="admin.room_code.submit_button"
          className="btn-glow text-xs"
        >
          <KeyRound size={12} className="mr-1" /> Post Room Code
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDone}
          data-ocid="admin.room_code.cancel_button"
          className="text-xs"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ── Submit Results Form ──────────────────────────────────────────────────────
function SubmitResultsForm({
  tournamentId,
  participants,
  onDone,
}: {
  tournamentId: string;
  participants: ParticipantView[];
  onDone: () => void;
}) {
  const [results, setResults] = useState<Record<string, MatchResult>>(() =>
    Object.fromEntries(
      participants.map((p) => [
        p.userId,
        {
          tournamentId,
          userId: p.userId,
          username: p.username,
          kills: 0,
          position: 1,
          damage: 0,
          score: 0,
        },
      ]),
    ),
  );

  function setField(
    userId: string,
    field: "kills" | "position" | "damage",
    value: number,
  ) {
    setResults((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  }

  return (
    <div className="space-y-3 pt-3 border-t border-border">
      <div className="overflow-x-auto rounded border border-border">
        <table className="w-full text-xs min-w-[380px]">
          <thead>
            <tr className="bg-muted/60 border-b border-border">
              <th className="text-left p-2 font-bold text-muted-foreground uppercase tracking-wider">
                Player
              </th>
              <th className="text-center p-2 font-bold text-muted-foreground uppercase tracking-wider">
                Kills
              </th>
              <th className="text-center p-2 font-bold text-muted-foreground uppercase tracking-wider">
                Position
              </th>
              <th className="text-center p-2 font-bold text-muted-foreground uppercase tracking-wider">
                Damage
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, idx) => (
              <tr
                key={p.userId}
                data-ocid={`admin.results.row.${idx + 1}`}
                className="border-b border-border last:border-0"
              >
                <td className="p-2 font-semibold text-foreground">
                  {p.username}
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    min={0}
                    value={results[p.userId]?.kills ?? 0}
                    onChange={(e) =>
                      setField(p.userId, "kills", Number(e.target.value))
                    }
                    className="h-7 w-16 mx-auto text-center bg-muted border-border text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    min={1}
                    value={results[p.userId]?.position ?? 1}
                    onChange={(e) =>
                      setField(p.userId, "position", Number(e.target.value))
                    }
                    className="h-7 w-16 mx-auto text-center bg-muted border-border text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    min={0}
                    value={results[p.userId]?.damage ?? 0}
                    onChange={(e) =>
                      setField(p.userId, "damage", Number(e.target.value))
                    }
                    className="h-7 w-16 mx-auto text-center bg-muted border-border text-xs"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            toast.success("Match results submitted!");
            onDone();
          }}
          data-ocid="admin.results.submit_button"
          className="btn-glow text-xs"
        >
          <Gavel size={12} className="mr-1" /> Submit Results
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDone}
          data-ocid="admin.results.cancel_button"
          className="text-xs"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ── Tournament Row ───────────────────────────────────────────────────────────
type AdminAction = "room" | "results" | "participants" | null;

function TournamentAdminRow({
  t,
  index,
}: { t: TournamentView; index: number }) {
  const [action, setAction] = useState<AdminAction>(null);
  const [status, setStatus] = useState<TournamentStatus>(t.status);
  const participants = seedParticipants();

  function toggleAction(a: AdminAction) {
    setAction((prev) => (prev === a ? null : a));
  }

  function handleStatusChange(val: string) {
    setStatus(val as TournamentStatus);
    toast.success(`Status updated to ${val}`);
  }

  return (
    <Card
      data-ocid={`admin.tournament.item.${index}`}
      className="bg-card border-border"
    >
      <CardContent className="p-4 space-y-3">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <p className="font-display font-bold text-sm text-foreground uppercase truncate">
              {t.title}
            </p>
            <div className="flex flex-wrap gap-1.5 items-center">
              <StatusBadge status={status} />
              <Badge variant="outline" className="text-xs border-border">
                {t.game}
              </Badge>
              <Badge variant="outline" className="text-xs border-border">
                {teamModeLabel(t.teamMode)}
              </Badge>
              <CoinBadge amount={t.prizePool} variant="prize" size="sm" />
            </div>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {t.currentParticipants}/{t.maxParticipants}
          </span>
        </div>

        {/* Status change */}
        <div>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger
              data-ocid={`admin.tournament.status_select.${index}`}
              className="h-7 text-xs w-44 bg-muted border-border"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {(
                [
                  "Upcoming",
                  "Live",
                  "WaitingResults",
                  "Completed",
                  "Cancelled",
                ] as const
              ).map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={action === "room" ? "default" : "outline"}
            onClick={() => toggleAction("room")}
            data-ocid={`admin.tournament.room_button.${index}`}
            className="text-xs h-7"
          >
            <KeyRound size={11} className="mr-1" /> Room Code
          </Button>
          <Button
            type="button"
            size="sm"
            variant={action === "results" ? "default" : "outline"}
            onClick={() => toggleAction("results")}
            data-ocid={`admin.tournament.results_button.${index}`}
            className="text-xs h-7"
          >
            <Gavel size={11} className="mr-1" /> Submit Results
          </Button>
          <Button
            type="button"
            size="sm"
            variant={action === "participants" ? "default" : "outline"}
            onClick={() => toggleAction("participants")}
            data-ocid={`admin.tournament.participants_button.${index}`}
            className="text-xs h-7"
          >
            <Users size={11} className="mr-1" /> Participants
            {action === "participants" ? (
              <ChevronUp size={11} className="ml-1" />
            ) : (
              <ChevronDown size={11} className="ml-1" />
            )}
          </Button>
        </div>

        {/* Expandable panels */}
        {action === "room" && (
          <RoomCodeForm tournamentId={t.id} onDone={() => setAction(null)} />
        )}
        {action === "results" && (
          <SubmitResultsForm
            tournamentId={t.id}
            participants={participants}
            onDone={() => setAction(null)}
          />
        )}
        {action === "participants" && (
          <div className="pt-3 border-t border-border space-y-2">
            {participants.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No participants yet.
              </p>
            ) : (
              participants.map((p, pi) => (
                <div
                  key={p.userId}
                  data-ocid={`admin.participants.item.${pi + 1}`}
                  className="flex items-center justify-between bg-muted/40 px-3 py-2 rounded-sm"
                >
                  <span className="text-xs font-semibold text-foreground">
                    {p.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {teamModeLabel(p.teamMode)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Create Contest Tab ───────────────────────────────────────────────────────
function CreateContestTab() {
  const [form, setForm] = useState({
    title: "",
    game: "FreeFire" as Game,
    teamMode: "Solo" as TeamMode,
    contestType: "MostKills" as ContestType,
    viewMode: "TPP",
    entryFee: "50",
    prizePool: "5000",
    maxParticipants: "100",
    startTime: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleCreate() {
    if (!form.title.trim() || !form.startTime) {
      toast.error("Title and start time are required");
      return;
    }
    toast.success(`Contest "${form.title}" created!`);
    setForm({
      title: "",
      game: "FreeFire",
      teamMode: "Solo",
      contestType: "MostKills",
      viewMode: "TPP",
      entryFee: "50",
      prizePool: "5000",
      maxParticipants: "100",
      startTime: "",
    });
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="font-display text-sm uppercase tracking-wider flex items-center gap-2">
          <Plus size={15} className="text-primary" /> New Contest
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Title */}
        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Title *
          </Label>
          <Input
            data-ocid="admin.create.title_input"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. FIRE ARENA GRAND PRIX"
            className="mt-1 bg-muted border-border font-display font-bold uppercase"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Game */}
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Game
            </Label>
            <Select
              value={form.game}
              onValueChange={(v) => set("game", v as Game)}
            >
              <SelectTrigger
                data-ocid="admin.create.game_select"
                className="mt-1 bg-muted border-border"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="FreeFire">Free Fire</SelectItem>
                <SelectItem value="BGMI">BGMI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Team Mode */}
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Team Mode
            </Label>
            <Select
              value={form.teamMode}
              onValueChange={(v) => set("teamMode", v as TeamMode)}
            >
              <SelectTrigger
                data-ocid="admin.create.team_mode_select"
                className="mt-1 bg-muted border-border"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="Solo">Solo</SelectItem>
                <SelectItem value="Duo">Duo</SelectItem>
                <SelectItem value="Squad">Squad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Contest Type */}
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Contest Type
            </Label>
            <Select
              value={form.contestType}
              onValueChange={(v) => set("contestType", v as ContestType)}
            >
              <SelectTrigger
                data-ocid="admin.create.contest_type_select"
                className="mt-1 bg-muted border-border"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="TopPosition">Top Position</SelectItem>
                <SelectItem value="MostKills">Most Kills</SelectItem>
                <SelectItem value="MostDamage">Most Damage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* View Mode */}
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              View Mode
            </Label>
            <Select
              value={form.viewMode}
              onValueChange={(v) => set("viewMode", v)}
            >
              <SelectTrigger
                data-ocid="admin.create.view_mode_select"
                className="mt-1 bg-muted border-border"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="TPP">TPP</SelectItem>
                <SelectItem value="FPP">FPP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Entry Fee
            </Label>
            <Input
              data-ocid="admin.create.entry_fee_input"
              type="number"
              min={0}
              value={form.entryFee}
              onChange={(e) => set("entryFee", e.target.value)}
              className="mt-1 bg-muted border-border"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Prize Pool
            </Label>
            <Input
              data-ocid="admin.create.prize_pool_input"
              type="number"
              min={0}
              value={form.prizePool}
              onChange={(e) => set("prizePool", e.target.value)}
              className="mt-1 bg-muted border-border"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Max Players
            </Label>
            <Input
              data-ocid="admin.create.max_participants_input"
              type="number"
              min={2}
              value={form.maxParticipants}
              onChange={(e) => set("maxParticipants", e.target.value)}
              className="mt-1 bg-muted border-border"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Start Time *
          </Label>
          <Input
            data-ocid="admin.create.start_time_input"
            type="datetime-local"
            value={form.startTime}
            onChange={(e) => set("startTime", e.target.value)}
            className="mt-1 bg-muted border-border"
          />
        </div>

        <Button
          type="button"
          onClick={handleCreate}
          data-ocid="admin.create.submit_button"
          className="btn-glow w-full sm:w-auto font-display font-black uppercase tracking-widest"
        >
          <Plus size={14} className="mr-2" /> Create Contest
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Manage Users Tab ─────────────────────────────────────────────────────────
type AdjustEntry = { amount: string; type: "credit" | "debit" };

function ManageUsersTab() {
  const [users, setUsers] = useState<UserView[]>(SEED_USERS);
  const [adjustments, setAdjustments] = useState<Record<string, AdjustEntry>>(
    () =>
      Object.fromEntries(
        SEED_USERS.map((u) => [u.principal, { amount: "", type: "credit" }]),
      ),
  );

  function setAdjField(
    principal: string,
    key: keyof AdjustEntry,
    value: string,
  ) {
    setAdjustments((prev) => ({
      ...prev,
      [principal]: { ...prev[principal], [key]: value },
    }));
  }

  function handleAdjust(principal: string) {
    const adj = adjustments[principal];
    const amt = Number(adj.amount);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.principal === principal
          ? {
              ...u,
              coins:
                adj.type === "credit"
                  ? u.coins + amt
                  : Math.max(0, u.coins - amt),
            }
          : u,
      ),
    );
    setAdjField(principal, "amount", "");
    toast.success(
      `${adj.type === "credit" ? "Credited" : "Debited"} ${amt} coins to ${users.find((u) => u.principal === principal)?.username}`,
    );
  }

  return (
    <div className="space-y-3">
      {users.map((u, idx) => (
        <Card
          key={u.principal}
          data-ocid={`admin.user.item.${idx + 1}`}
          className="bg-card border-border"
        >
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-start justify-between">
              <div className="min-w-0 space-y-1">
                <p className="font-display font-bold text-foreground">
                  {u.username}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {truncatePrincipal(u.principal)}
                </p>
                <div className="flex flex-wrap gap-2 pt-0.5 items-center">
                  <CoinBadge amount={u.coins} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    {u.totalMatches} matches · {u.winRate.toFixed(1)}% win rate
                  </span>
                </div>
              </div>

              {/* Wallet adjustment */}
              <div className="flex items-center gap-2 flex-wrap">
                <Select
                  value={adjustments[u.principal]?.type ?? "credit"}
                  onValueChange={(v) => setAdjField(u.principal, "type", v)}
                >
                  <SelectTrigger
                    data-ocid={`admin.user.adjust_type.${idx + 1}`}
                    className="h-8 text-xs w-24 bg-muted border-border"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="credit" className="text-xs">
                      Credit
                    </SelectItem>
                    <SelectItem value="debit" className="text-xs">
                      Debit
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  data-ocid={`admin.user.adjust_amount.${idx + 1}`}
                  type="number"
                  min={1}
                  placeholder="coins"
                  value={adjustments[u.principal]?.amount ?? ""}
                  onChange={(e) =>
                    setAdjField(u.principal, "amount", e.target.value)
                  }
                  className="h-8 w-24 bg-muted border-border text-xs"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleAdjust(u.principal)}
                  data-ocid={`admin.user.adjust_button.${idx + 1}`}
                  className="h-8 text-xs btn-glow"
                >
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Main AdminPage ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { isAuthenticated, login } = useAuth();
  const { tournaments } = useTournaments();

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [claiming, setClaiming] = useState(false);

  function handleClaimAdmin() {
    if (!isAuthenticated) return;
    setClaiming(true);
    setTimeout(() => {
      setIsAdmin(true);
      setAdminExists(true);
      setClaiming(false);
      toast.success("Admin claimed! You now have full control of FIRE ARENA.");
    }, 900);
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div
        data-ocid="admin.access_denied"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center">
          <Lock size={28} className="text-destructive" />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm mt-1.5">
            You must be logged in to access the admin panel.
          </p>
        </div>
        <button
          type="button"
          data-ocid="admin.login_button"
          onClick={login}
          className="btn-glow font-display font-black text-sm uppercase tracking-widest"
        >
          Login with Internet Identity
        </button>
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div
        data-ocid="admin.not_admin"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center">
          <ShieldAlert size={28} className="text-destructive" />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
            Admin Access Required
          </h2>
          <p className="text-muted-foreground text-sm mt-1.5 max-w-sm">
            Only the platform admin can access this panel.
          </p>
        </div>
        {/* Claim admin — only when no admin exists yet */}
        {!adminExists && (
          <div className="mt-2 p-5 border border-accent/40 rounded-sm bg-accent/5 max-w-sm w-full space-y-3 text-left">
            <div className="flex items-center gap-2">
              <Crown size={15} className="text-accent" />
              <span className="font-display font-bold text-sm text-accent uppercase tracking-wider">
                No Admin Claimed Yet
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You can claim admin rights as the app deployer. This action is
              one-time and permanent — you'll have full control of the platform.
            </p>
            <button
              type="button"
              onClick={handleClaimAdmin}
              disabled={claiming}
              data-ocid="admin.claim_admin_button"
              className="btn-accent w-full font-display font-black text-sm uppercase tracking-widest disabled:opacity-60"
            >
              {claiming ? "Claiming…" : "Claim Admin"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Admin Panel ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <PageHeader
        accent="ADMIN"
        title="PANEL"
        subtitle="Manage tournaments, room codes, results, and users."
      >
        <div className="flex items-center gap-1.5 text-xs font-display font-bold uppercase text-primary bg-primary/10 border border-primary/30 px-2 py-1 rounded-sm">
          <ShieldCheck size={12} /> Admin
        </div>
      </PageHeader>

      <Tabs defaultValue="tournaments" data-ocid="admin.tabs">
        <TabsList className="bg-muted border border-border w-full grid grid-cols-3 sm:w-auto sm:flex h-auto p-0.5">
          <TabsTrigger
            value="tournaments"
            data-ocid="admin.tabs.tournaments_tab"
            className="font-display font-bold text-xs uppercase tracking-wider py-2"
          >
            Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="create"
            data-ocid="admin.tabs.create_tab"
            className="font-display font-bold text-xs uppercase tracking-wider py-2"
          >
            Create Contest
          </TabsTrigger>
          <TabsTrigger
            value="users"
            data-ocid="admin.tabs.users_tab"
            className="font-display font-bold text-xs uppercase tracking-wider py-2"
          >
            Users
          </TabsTrigger>
        </TabsList>

        {/* Tournaments */}
        <TabsContent value="tournaments" className="mt-4 space-y-3">
          {tournaments.length === 0 ? (
            <div
              data-ocid="admin.tournaments.empty_state"
              className="text-center py-12 text-muted-foreground text-sm"
            >
              No tournaments found. Create one in "Create Contest".
            </div>
          ) : (
            tournaments.map((t, idx) => (
              <TournamentAdminRow key={t.id} t={t} index={idx + 1} />
            ))
          )}
        </TabsContent>

        {/* Create Contest */}
        <TabsContent value="create" className="mt-4">
          <CreateContestTab />
        </TabsContent>

        {/* Manage Users */}
        <TabsContent value="users" className="mt-4">
          <ManageUsersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
