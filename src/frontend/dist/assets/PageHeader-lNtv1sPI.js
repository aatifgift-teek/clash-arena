import { j as jsxRuntimeExports } from "./index-Dpxe0gIA.js";
function PageHeader({
  title,
  subtitle,
  accent,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl md:text-4xl uppercase tracking-tight text-foreground leading-none", children: accent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: accent }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title })
      ] }) : title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1.5 font-body", children: subtitle })
    ] }),
    children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children })
  ] });
}
export {
  PageHeader as P
};
