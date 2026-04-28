# Design Brief

## Direction

FIRE ARENA — eSports tournament platform for Free Fire & BGMI with aggressive gaming aesthetic.

## Tone

Brutalist dark maximalism with electric neon accents; pure energy and competitive intensity.

## Differentiation

Glowing neon borders on CTAs and cards create unmistakable gaming energy; aggressive typography and card hover effects drive tournament discovery.

## Color Palette

| Token      | OKLCH       | Role                           |
| ---------- | ----------- | ------------------------------ |
| background | 0.08 0 0    | Near-black game base           |
| foreground | 0.94 0 0    | Off-white text on dark         |
| card       | 0.12 0 0    | Slightly elevated from bg      |
| primary    | 0.68 0.24 28 | Neon orange — actions & borders |
| accent     | 0.82 0.20 84 | Electric yellow — highlights   |
| muted      | 0.16 0 0    | Subdued card backgrounds       |
| destructive| 0.55 0.22 25 | Red warnings (minimal use)     |

## Typography

- Display: Space Grotesk — tournament titles, bold condensed, aggressive caps
- Body: DM Sans — UI labels, descriptions, balance to display
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-bold`, label `text-xs font-semibold uppercase`, body `text-sm`

## Elevation & Depth

Cards elevated via glowing orange inset shadow and border; primary CTAs feature outer glow. Flat card interiors with minimal shadow preserve readability on dark background.

## Structural Zones

| Zone    | Background      | Border              | Notes                          |
| ------- | --------------- | ------------------- | ------------------------------ |
| Header  | card (0.12 0 0) | accent bar bottom   | Neon accent stripe below       |
| Content | background      | none                | Full bleed, card grid overlay   |
| Cards   | card (0.12 0 0) | border (0.22 0 0)   | Hover scale +5%, glow-primary  |
| Footer  | muted (0.16 0 0)| border top (0.22 0 0)| Minimal footer with stats      |

## Spacing & Rhythm

16px base grid; card clusters with 1.5rem gaps, micro-spacing (0.5rem) within cards, aggressive padding on CTAs (1.5rem) to dominate interaction zones.

## Component Patterns

- Buttons: space-grotesk bold, orange glow primary, yellow glow accent, 3px square radius
- Cards: 12px square radius, glow inset border on hover, scale transform +5%
- Badges: uppercase, bold, accent yellow for active state, small pill shapes

## Motion

- Entrance: cards fade in with float animation, staggered across grid
- Hover: card scale +5% with 300ms smooth transition, glow pulsates
- Decorative: button glow pulses 2s, wallet balance floats continuously

## Constraints

- Never use soft rounded corners — all radius ≤ 4px for gaming edge
- Maintain minimum 7.5:1 contrast on all text (dark bg enforces this)
- Neon orange sparingly on CTAs; yellow reserved for high-priority metrics (prize pools, earnings)
- No gradient overlays; pure color intensity

## Signature Detail

Glowing box-shadow borders on tournament cards and CTAs create authentic gaming UI; pulsating glow animation on action buttons adds energy without motion chaos.
