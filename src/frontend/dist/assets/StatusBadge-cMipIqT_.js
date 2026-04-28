import { e as createLucideIcon, j as jsxRuntimeExports } from "./index-Dpxe0gIA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const STATUS_CONFIG = {
  Live: {
    label: "LIVE",
    classes: "text-destructive-foreground bg-destructive/20 border border-destructive/60",
    dot: "bg-destructive animate-pulse"
  },
  Upcoming: {
    label: "UPCOMING",
    classes: "text-accent bg-accent/10 border border-accent/30"
  },
  Completed: {
    label: "COMPLETED",
    classes: "text-muted-foreground bg-muted/50 border border-border"
  },
  Cancelled: {
    label: "CANCELLED",
    classes: "text-muted-foreground bg-muted/20 border border-border line-through"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = STATUS_CONFIG[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-bold font-display tracking-wider ${config.classes} ${className}`,
      children: [
        config.dot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${config.dot}` }),
        config.label
      ]
    }
  );
}
export {
  StatusBadge as S,
  Users as U
};
