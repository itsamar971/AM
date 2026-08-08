export const navigation = [
  { index: "00", label: "HOME", href: "#top" },
  { index: "01", label: "PROJECTS", href: "#read" },
  { index: "02", label: "BLOG", href: "#match" },
  { index: "03", label: "COLLAB", href: "#tailor" },
  { index: "04", label: "CONTACT", href: "#move" },
] as const;

export const resumeSignals = [
  { label: "Vision", value: "Your idea kept intact—every deliverable traces back to what you actually asked for.", code: "01" },
  { label: "Stack", value: "Context before templates—built on the right stack for your product, not a boilerplate.", code: "02" },
  { label: "Direction", value: "Direction set by you—every deliverable points at the outcome you actually want.", code: "03" },
] as const;

export const matchRoutes = [
  { place: "ENGINE", role: "BRIEF INTELLIGENCE", fit: "[Deconstruct Briefs] — Extract the real requirements and decode what the product actually needs." },
  { place: "FACTORY", role: "DESIGN SYSTEM", fit: "[Build Components] — Turn one idea into a consistent design system across web, app, and brand." },
  { place: "AUDIT", role: "QA & PERFORMANCE", fit: "[Reveal Gaps] — Catch performance, accessibility, and UX gaps before anything ships." },
  { place: "SHIELD", role: "SCOPE SHIELD", fit: "[Filter Scope Creep] — Fixed scope, phased rollout, no surprise line items." },
] as const;

export const operatingPrinciples = [
  {
    number: "01",
    verb: "UNDERSTAND",
    statement: "See the product the way a client will.",
    detail: "Structure, scope, and gaps—mapped without invented promises.",
  },
  {
    number: "02",
    verb: "DESIGN",
    statement: "Turn every gap into a design decision.",
    detail: "Design stays specific to the brand and close to what the product already is.",
  },
  {
    number: "03",
    verb: "BUILD",
    statement: "Change the framing. Never the facts.",
    detail: "Each deliverable speaks to its channel while remaining grounded in the source brief.",
  },
  {
    number: "04",
    verb: "SHIP",
    statement: "Act only inside known boundaries.",
    detail: "Approval, scope, and launch status must be clear before anything ships.",
  },
] as const;

export const boundaryChecks = [
  ["Scope screening", "On by default"],
  ["Project requirements", "Checked"],
  ["Client assets", "Linked"],
  ["Required approvals", "Confirmed"],
  ["Launch state", "Recorded"],
] as const;
