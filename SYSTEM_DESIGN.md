# Design System Inspired by RoundRobinGenerator

## 1. Visual Theme & Atmosphere

RoundRobinGenerator embodies a modern, approachable aesthetic that resonates with Gen Z users who value speed, clarity, and social connectivity. The design system balances playful energy with professional structure—sharp, minimal interfaces paired with warm, inviting interactions. The visual language prioritizes mobile-first simplicity without sacrificing sophistication: generous whitespace, bold typography hierarchies, and purposeful micro-interactions create a sense of effortless control. This is a design system for casual competition that feels refined, not gatekeeping. Every element serves a function; every interaction delights without distraction.

**Key Characteristics**
- Mobile-centric, thumb-friendly interactions
- Minimal ornamentation; maximum clarity
- Bold typography drives hierarchy and mood
- Warm neutrals + vibrant accent system
- Rapid feedback through color and movement
- Professional polish with Gen Z sensibility
- Cards and contained spaces for focused content
- Social-first (share, leaderboard visibility)

## 2. Color Palette & Roles

### Primary
- **Primary Action** (`#10B981`): Call-to-action buttons, active states, confirmation elements. Fresh, energetic, generates trust and forward momentum.
- **Primary Surface** (`#FFFFFF`): Card backgrounds, input fields, main content containers. Clean foundation for all interactive surfaces.

### Accent Colors
- **Success** (`#34D399`): Match completion, verified scores, winning states. Bright and celebratory.
- **Alert** (`#F59E0B`): Score entry warnings, pending confirmations, attention-seekers that aren't errors.
- **Error** (`#EF4444`): Invalid inputs, score conflicts, destructive actions. Direct and unmissable.

### Interactive
- **Link / Secondary CTA** (`#0EA5E9`): Links, secondary buttons, navigational hints. Cool, trustworthy, distinct from primary.
- **Hover State** (`#059669`): Darkened primary for interaction feedback. Deeper, more committed feel on press.
- **Disabled State** (`#D1D5DB`): Inactive buttons, locked fields, unavailable options. Communicates inactivity without visual noise.

### Neutral Scale
- **Text Primary** (`#111827`): All body text, primary headings, high-contrast reading surfaces.
- **Text Secondary** (`#6B7280`): Helper text, labels, metadata, de-emphasized information.
- **Text Tertiary** (`#9CA3AF`): Placeholders, hints, very subtle callouts.
- **Border Subtle** (`#E5E7EB`): Card borders, input outlines, dividers in light contexts.
- **Border Medium** (`#D1D5DB`): Form borders, stronger dividers, secondary containment.

### Surface & Borders
- **Background Primary** (`#F9FAFB`): Page backgrounds, light container washes. Minimal visual weight.
- **Background Secondary** (`#F3F4F6`): Grouped sections, alternating card backgrounds, subtle zones.
- **Surface Overlay** (`#FFFFFF` at `opacity: 0.95`): Modals, sheets, elevated content over backgrounds.

### Shadow Colors
- **Shadow Depth 1** (`#000000` at `opacity: 0.05`): Subtle cards, delicate elevation.
- **Shadow Depth 2** (`#000000` at `opacity: 0.10`): Interactive components, medium prominence.
- **Shadow Depth 3** (`#000000` at `opacity: 0.15`): Modals, heavy elevation, full-screen overlays.

## 3. Typography Rules

### Font Family
**Primary Font:** Inter (Google Fonts) — clean, geometric, modern. Stack: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Secondary Font:** Poppins (Google Fonts) — friendly, rounded, slightly playful for display and emphasis. Stack: `Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / Hero | Poppins | 32px | 700 | 1.2 (38px) | -0.01em | Page titles, tournament name |
| Heading 1 | Poppins | 28px | 700 | 1.3 (36px) | -0.005em | Section headers, leaderboard title |
| Heading 2 | Poppins | 24px | 600 | 1.3 (31px) | 0em | Card titles, match round labels |
| Heading 3 | Poppins | 18px | 600 | 1.4 (25px) | 0em | Player names, matchup headers |
| Body Large | Inter | 16px | 400 | 1.5 (24px) | 0em | Primary body text, player info |
| Body | Inter | 14px | 400 | 1.5 (21px) | 0em | Card content, match details |
| Body Small | Inter | 13px | 400 | 1.5 (20px) | 0em | Labels, secondary info |
| Button | Inter | 14px | 600 | 1.4 (20px) | 0.5px | All button text |
| Link | Inter | 14px | 500 | 1.5 (21px) | 0em | Inline links, share buttons |
| Caption | Inter | 12px | 400 | 1.4 (17px) | 0.3px | Timestamps, score metadata |
| Code / Mono | `SF Mono`, `Monaco`, monospace | 12px | 400 | 1.4 (17px) | 0em | Match IDs, score entries |

### Principles
- **Contrast First:** Typography hierarchy relies on size, weight, and color—not decorative effects.
- **Readability on Mobile:** Body text never smaller than 13px; line heights generous for thumb-scrolling comfort.
- **Weight Hierarchy:** 400 (regular) for body, 600 (semibold) for labels and small CTAs, 700 (bold) for headings only—limits visual noise.
- **Emphasis via Poppins:** Display and headings use the friendly, rounded Poppins to signal Gen Z approachability; body stays neutral with Inter for clarity.

## 4. Component Stylings

### Buttons

**Primary Button**
- **Background:** `#10B981`
- **Text Color:** `#FFFFFF`
- **Padding:** `12px 24px` (height 44px minimum on touch surfaces)
- **Border Radius:** `8px`
- **Border:** `none`
- **Font:** Inter, 14px, 600
- **Box Shadow:** `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Hover:** Background `#059669`, shadow `0 2px 4px rgba(0, 0, 0, 0.10)`
- **Active / Pressed:** Background `#047857`, shadow `0 1px 2px rgba(0, 0, 0, 0.05)`, `transform: scale(0.98)`
- **Disabled:** Background `#D1D5DB`, text `#9CA3AF`, cursor `not-allowed`, no shadow

**Secondary Button**
- **Background:** `#F3F4F6`
- **Text Color:** `#111827`
- **Padding:** `12px 24px` (height 44px)
- **Border Radius:** `8px`
- **Border:** `1px solid #E5E7EB`
- **Font:** Inter, 14px, 600
- **Box Shadow:** `none`
- **Hover:** Background `#E5E7EB`, border `#D1D5DB`
- **Active / Pressed:** Background `#D1D5DB`, `transform: scale(0.98)`
- **Disabled:** Background `#F9FAFB`, text `#9CA3AF`, border `#E5E7EB`, cursor `not-allowed`

**Ghost Button (Link-style)**
- **Background:** `transparent`
- **Text Color:** `#0EA5E9`
- **Padding:** `8px 12px`
- **Border Radius:** `6px`
- **Border:** `none`
- **Font:** Inter, 14px, 500
- **Box Shadow:** `none`
- **Hover:** Background `rgba(14, 165, 233, 0.08)`, text `#0EA5E9`
- **Active / Pressed:** Background `rgba(14, 165, 233, 0.15)`, `transform: scale(0.98)`
- **Disabled:** Text `#D1D5DB`, cursor `not-allowed`

### Cards & Containers

**Match Card**
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E5E7EB`
- **Border Radius:** `12px`
- **Padding:** `16px`
- **Box Shadow:** `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Hover:** Border `#D1D5DB`, shadow `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Gap Between Elements:** 12px
- **Interaction:** Tap to expand or edit scores; active state lightens background to `#F9FAFB`

**Player Card (Leaderboard Entry)**
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E5E7EB`
- **Border Radius:** `10px`
- **Padding:** `14px 16px`
- **Box Shadow:** `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Layout:** Flex row, space-between; rank badge on left, stats on right
- **Active / Highlighted:** Background `#F0FDF4`, border `#86EFAC`, indicates current player

**Section Container**
- **Background:** `#F9FAFB`
- **Padding:** `16px`
- **Border Radius:** `12px`
- **Border:** `none`
- **Margin Bottom:** `16px`
- **Typography:** Poppins, 18px, 600 header inside; body content in Inter, 14px

### Inputs & Forms

**Text Input / Score Entry**
- **Background:** `#FFFFFF`
- **Text Color:** `#111827`
- **Border:** `1px solid #D1D5DB`
- **Border Radius:** `8px`
- **Padding:** `12px 14px`
- **Font:** Inter, 14px, 400
- **Placeholder Color:** `#9CA3AF`
- **Focus:** Border `#10B981`, outline `none`, box-shadow `0 0 0 3px rgba(16, 185, 129, 0.1)`
- **Error State:** Border `#EF4444`, background `#FEF2F2`, box-shadow `0 0 0 3px rgba(239, 68, 68, 0.1)`
- **Disabled:** Background `#F3F4F6`, border `#E5E7EB`, text `#9CA3AF`, cursor `not-allowed`
- **Height:** 44px minimum (touch-friendly)

**Score Input (Numeric, Styled)**
- **Width:** 60px on mobile, 80px on desktop
- **Text Align:** `center`
- **Font:** `SF Mono`, 16px, 600, tabular-nums
- **Padding:** `12px 8px`
- **Background:** `#F9FAFB` (prefers subtle background to signal number-only intent)
- **Border:** `1px solid #E5E7EB`
- **Border Radius:** `6px`

**Checkbox / Toggle**
- **Size:** 20px × 20px
- **Border Radius:** `4px`
- **Unchecked:** Background `#FFFFFF`, border `1px solid #D1D5DB`
- **Checked:** Background `#10B981`, border `1px solid #10B981`, checkmark `#FFFFFF`, 2px stroke
- **Focus:** `box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1)`
- **Disabled Checked:** Background `#D1D5DB`, checkmark `#9CA3AF`

### Navigation

**Top Navigation Bar**
- **Background:** `#FFFFFF`
- **Border Bottom:** `1px solid #E5E7EB`
- **Padding:** `12px 16px`
- **Height:** 56px (mobile standard)
- **Flex Layout:** Space-between; title left, action buttons right
- **Title Font:** Poppins, 20px, 700, text `#111827`
- **Icon Buttons:** 44px × 44px hitbox, 24px icon, fill `#111827`, hover background `#F3F4F6`

**Bottom Tab Navigation (Mobile)**
- **Background:** `#FFFFFF`
- **Border Top:** `1px solid #E5E7EB`
- **Padding:** `0px` (full-width tabs)
- **Height:** 56px
- **Tab Item:** Flex column, center, gap 4px, flex 1
- **Inactive Tab:** Icon `#9CA3AF`, label `#6B7280`, font Inter 11px, 500
- **Active Tab:** Icon `#10B981`, label `#10B981`, background `rgba(16, 185, 129, 0.05)`

### Badges

**Status Badge**
- **Background:** `#F0FDF4` (success), or `#FEF3C7` (alert), or `#FEE2E2` (error)
- **Text Color:** `#15803D` (success), `#92400E` (alert), `#991B1B` (error)
- **Padding:** `4px 12px`
- **Border Radius:** `16px`
- **Font:** Inter, 12px, 600
- **Border:** `1px solid` matching text color at 30% opacity

**Rank Badge**
- **Background:** `#10B981`
- **Text Color:** `#FFFFFF`
- **Width / Height:** 32px (circle or square with 4px radius)
- **Font:** Poppins, 14px, 700
- **Display:** Rank number (1, 2, 3, etc.)
- **Box Shadow:** `0 2px 4px rgba(0, 0, 0, 0.10)`

## 5. Layout Principles

### Spacing System

**Base Unit:** 4px

**Scale:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Usage Context:**
- **4px / 8px:** Icon spacing, tight component gutters, micro-adjustments
- **12px:** Internal padding for buttons, gap between labels and fields, compact card interiors
- **16px:** Standard section padding, gap between major elements, card padding
- **24px:** Margin between logical page sections, spacing between groups
- **32px / 48px:** Page-level section breaks, hero spacing
- **64px:** Bottom padding before navigation, full-page section separation

### Grid & Container

**Max Width:** 480px (mobile first), 768px (tablet), 1024px (desktop reference—app is mobile-optimized)

**Mobile Container:**
- **Padding:** 16px on each side (safe area respecting iPhone notches and Android gestures)
- **Effective Width:** 100vw - 32px

**Column Strategy:**
- **Mobile:** Single column, full-width stacking
- **Tablet+:** Two-column layouts for leaderboard + match details (if implemented)

**Section Patterns:**
- **Matchup Row:** Flex row, gap 12px, centered vertically; team A — score input — team B
- **Card Grid:** Single column on mobile, no CSS Grid (simpler implementation)
- **Leaderboard:** Vertically stacked cards, no multi-column layout

### Whitespace Philosophy

Generous whitespace creates breathing room and signals refinement. No content feels cramped:
- Minimum 16px between distinct content blocks
- Match cards have 12px internal gaps between player names and scores
- Form fields have 16px vertical spacing between label and input
- Bottom padding of 80px on main content to clear fixed navigation
- Negative space around call-to-action buttons emphasizes them without borders

### Border Radius Scale

- **2px:** Reserved for very small elements (checkboxes, minor UI)
- **4px:** Tight, technical elements (badge corners, small inputs)
- **6px:** Compact interactive elements (small buttons, subtle containers)
- **8px:** Standard interactive surfaces (buttons, input fields, small cards)
- **10px:** Medium cards (player cards, results)
- **12px:** Large cards (match cards, section containers)
- **16px:** Full-height sheet containers, modals
- **20px:** Very large rounded elements (progress rings, large badges)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (L0) | No shadow, solid borders | Backgrounds, typography-only, text-only states |
| Raised (L1) | `0 1px 2px rgba(0, 0, 0, 0.05)` | Cards at rest, input fields, badges |
| Lifted (L2) | `0 2px 8px rgba(0, 0, 0, 0.08)` | Card hover states, interactive focus, buttons on press |
| Elevated (L3) | `0 4px 12px rgba(0, 0, 0, 0.10)` | Dropdowns, bottom sheets, modals beneath backdrop |
| Modal (L4) | `0 8px 24px rgba(0, 0, 0, 0.15)` | Full-screen modals, high-priority overlays |

**Shadow Philosophy:**
Shadows are minimal and purposeful. They create subtle separation without visual weight. All shadows use black at low opacity to preserve the light, clean aesthetic. Shadows increase on interaction (hover, focus, press) to provide tactile feedback. No decorative or colored shadows; depth comes from hierarchy, scale, and spacing first.

## 7. Do's and Don'ts

### Do
- **Do use Primary Green (`#10B981`) for all primary CTAs.** It signals action, trust, and forward momentum—essential for Gen Z UX.
- **Do prioritize the 44px touch target minimum** on all interactive elements. Gen Z users are on mobile; thumb accuracy matters.
- **Do pair Poppins headings with Inter body text** to create a friendly-yet-professional tone. This combination feels fresh and approachable.
- **Do use descriptive button labels** ("Enter Scores," "Share Results") over generic ones ("Submit," "OK").
- **Do animate state changes** (e.g., button press scales to 0.98, focus rings appear) to confirm every interaction.
- **Do organize content in cards** to create focused, scannable zones. One task per card keeps cognitive load low.
- **Do show leaderboard prominently** as a social proof mechanism—Gen Z loves seeing rankings and status.
- **Do use color for semantic meaning.** Green = success, amber = caution, red = error. Never use color alone; pair with icons or text.
- **Do test all interactions in mobile Safari and Chrome** to catch shadow, border-radius, and focus ring quirks early.

### Don't
- **Don't use more than three font sizes on a single screen.** Hierarchy should be clear and minimal, not chaotic.
- **Don't apply shadows to every element.** Reserve shadows for elevation; flat cards stay flat.
- **Don't use red for warnings unless they're destructive.** Use amber (`#F59E0B`) for "pending" or "review" states.
- **Don't create text smaller than 13px for body content.** Gen Z has higher mobile expectations; tiny text feels cheap.
- **Don't nest more than two levels of cards or containers.** Mobile screens are narrow; deep nesting causes confusion.
- **Don't mix rounded and sharp corners on the same component.** Pick a radius scale and stick to it (this design uses 8px–12px for interactive elements).
- **Don't force rounded corners on inputs.** 8px is friendly; 16px+ looks overly casual and reduces perceived usability.
- **Don't hide critical information behind taps or layers.** Match info, scores, and leaderboard should be visible with minimal scrolling.
- **Don't disable buttons without clear reason or loading state.** If a button can't be clicked, show why (validation error, loading spinner, etc.).
- **Don't animate on page load without purpose.** Respect `prefers-reduced-motion` and keep animations snappy (<300ms).

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile (xs) | 320px–479px | Single column, full-width cards, 16px padding, bottom tab nav |
| Mobile (sm) | 480px–639px | Still single column, full-width cards, same padding |
| Tablet (md) | 640px–767px | Option for two-column leaderboard + match list, side-by-side comparison |
| Tablet (lg) | 768px–1023px | Two-column layouts default, max-width container 768px |
| Desktop (xl) | 1024px+ | Three-column or split-view layouts, max-width 1024px, centered on screen |

**Priority:** Focus design and testing on Mobile (xs) and (sm). Tablet layouts are enhancement, not core.

### Touch Targets

- **Minimum Hit Area:** 44px × 44px for all buttons, tabs, and interactive elements
- **Recommended Spacing:** 12px gap between adjacent interactive targets to prevent fat-finger errors
- **Icon Sizing:** 24px icons within 44px hit areas; 8px padding on all sides
- **Form Fields:** 44px height minimum; 14px padding vertically (12px + ~2px visual compensation)
- **Link Text:** Never smaller than 14px; add 4px vertical padding for expanded touch area

### Collapsing Strategy

**Mobile (320px–479px):**
- Header: Logo / title left, single menu icon right
- Buttons: Full-width in forms, stacked vertically if >2 buttons
- Match Card: Player A name, score input (centered), player B name—all stacked vertically with 12px gaps
- Leaderboard: Full-width cards, no columns; rank badge left, name + stats fill row, overflow hidden
- Tables: Convert to stacked card layout; no horizontal scroll tables

**Tablet (640px+):**
- Header: Logo left, navigation links center, secondary action right
- Buttons: Inline at 24px gap; wrap only if space constrained
- Match Card: Flex row with proportional spacing; A | Score | B
- Leaderboard: Possible side-by-side or two-column grid depending on feature
- Bottom Nav: Optional; can switch to top-side nav for larger screens

**Desktop (1024px+):**
- Full horizontal navigation, no bottom tabs
- Side-by-side dashboard: match bracket on left, leaderboard on right
- Modals centered, max-width 600px
- Multi-column grids for bulk match display (if applicable)

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Primary Action (`#10B981`)
- **Secondary CTA:** Link / Secondary CTA (`#0EA5E9`)
- **Background:** Background Primary (`#F9FAFB`), Surface Primary (`#FFFFFF`)
- **Text (Primary):** Text Primary (`#111827`)
- **Text (Secondary):** Text Secondary (`#6B7280`)
- **Success:** Success (`#34D399`)
- **Warning:** Alert (`#F59E0B`)
- **Error:** Error (`#EF4444`)
- **Disabled:** Disabled State (`#D1D5DB`)
- **Borders:** Border Subtle (`#E5E7EB`)

### Iteration Guide

1. **All button text must be Inter, 14px, 600 weight.** Headings are Poppins; everything else interactive defaults to Inter semibold.

2. **Primary button is always `#10B981` background, `#FFFFFF` text.** Hover darkens to `#059669`. No exceptions for consistency.

3. **Every interactive element has a 44px minimum height.** Touch targets of 40px or less violate Gen Z mobile expectations and cause mis-taps.

4. **Cards use 12px border-radius; buttons 8px.** This scale creates visual coherence without looking overly rounded or too sharp.

5. **Spacing between major sections is 24px (6 × 4px base unit).** Internal card padding is 16px (4 × 4px). No arbitrary values.

6. **Shadows are minimal:** L1 cards get `0 1px 2px rgba(0, 0, 0, 0.05)`. L2 (hover) gets `0 2px 8px rgba(0, 0, 0, 0.08)`. Anything heavier looks heavy.

7. **Form labels are Inter, 13px, 500 weight, color `#6B7280`.** Input text is 14px, 400 weight. Placeholder is same size/weight but color `#9CA3AF`.

8. **Leaderboard rank badges are circular or 32px squares with 4px radius, Poppins 14px 700, green background.** These draw the eye intentionally.

9. **Focus rings on all interactive elements:** `outline: none; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1)` (green tint, matches brand). Test in Firefox and Safari.

10. **Bottom navigation on mobile is always 56px height, 5 equal-width tabs max.** Inactive tab: icon `#9CA3AF`, label `#6B7280`, 11px font. Active: icon and label both `#10B981`, subtle background wash.

11. **Match cards stack vertically on mobile:** Player A → Score Input → Player B, all left-aligned or centered. On tablet+, use flex row with justify-content space-between.

12. **The leaderboard must show at least rank, player name, wins, losses, win rate.** Use small, muted text for stats (`#6B7280`, 12px). Emphasize the name and rank visually.
