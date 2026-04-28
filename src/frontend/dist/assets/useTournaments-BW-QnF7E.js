import { j as jsxRuntimeExports, Y as Slot, q as cn, Z as cva, r as reactExports } from "./index-Dpxe0gIA.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const SEED_TOURNAMENTS = [
  {
    id: "t1",
    title: "INFERNO BLAZE — SOLO CUP",
    game: "FreeFire",
    teamMode: "Solo",
    contestType: "MostKills",
    entryFee: 50,
    prizePool: 5e3,
    maxParticipants: 100,
    currentParticipants: 72,
    status: "Upcoming",
    scheduledAt: Date.now() + 2 * 3600 * 1e3,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 28
  },
  {
    id: "t2",
    title: "THUNDERSTRIKE DUO WARS",
    game: "FreeFire",
    teamMode: "Duo",
    contestType: "TopPosition",
    entryFee: 100,
    prizePool: 12e3,
    maxParticipants: 50,
    currentParticipants: 48,
    status: "Live",
    scheduledAt: Date.now() - 3600 * 1e3,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 2
  },
  {
    id: "t3",
    title: "BGMI SQUAD MASSACRE",
    game: "BGMI",
    teamMode: "Squad",
    contestType: "MostDamage",
    entryFee: 200,
    prizePool: 25e3,
    maxParticipants: 25,
    currentParticipants: 20,
    status: "Upcoming",
    scheduledAt: Date.now() + 5 * 3600 * 1e3,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 5
  },
  {
    id: "t4",
    title: "FREE FIRE NIGHT CLASH",
    game: "FreeFire",
    teamMode: "Solo",
    contestType: "TopPosition",
    entryFee: 30,
    prizePool: 3e3,
    maxParticipants: 100,
    currentParticipants: 100,
    status: "Completed",
    scheduledAt: Date.now() - 24 * 3600 * 1e3,
    createdBy: "admin",
    isJoined: true,
    spotsLeft: 0
  },
  {
    id: "t5",
    title: "BGMI KING OF KILLS",
    game: "BGMI",
    teamMode: "Solo",
    contestType: "MostKills",
    entryFee: 75,
    prizePool: 8e3,
    maxParticipants: 100,
    currentParticipants: 40,
    status: "Upcoming",
    scheduledAt: Date.now() + 12 * 3600 * 1e3,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 60
  },
  {
    id: "t6",
    title: "FIRE ARENA GRAND PRIX",
    game: "FreeFire",
    teamMode: "Squad",
    contestType: "TopPosition",
    entryFee: 500,
    prizePool: 1e5,
    maxParticipants: 25,
    currentParticipants: 10,
    status: "Upcoming",
    scheduledAt: Date.now() + 48 * 3600 * 1e3,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 15
  }
];
function useTournaments() {
  const [tournaments, setTournaments] = reactExports.useState(SEED_TOURNAMENTS);
  function joinTournament(id) {
    setTournaments(
      (prev) => prev.map(
        (t) => t.id === id && t.spotsLeft > 0 && t.status !== "Completed" && t.status !== "Cancelled" ? {
          ...t,
          isJoined: true,
          currentParticipants: t.currentParticipants + 1,
          spotsLeft: t.spotsLeft - 1
        } : t
      )
    );
    return true;
  }
  function getTournament(id) {
    return tournaments.find((t) => t.id === id);
  }
  return { tournaments, joinTournament, getTournament };
}
export {
  Badge as B,
  useTournaments as u
};
