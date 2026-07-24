DESIGN_SYSTEM.md

Status: ACTIVE
Owner: CONDUCTOR

---

## Core Principle

**Design for humans, not for AI output.**

Every screen must feel intentional, crafted, and considered — not generated.
If it looks like a default Expo template screen or an unstyled RN scaffold, it is not acceptable.

Reference quality bar: real fintech apps with careful attention to detail — study their onboarding, transaction lists, and empty/error states before building equivalents here.

---

## Non-Negotiable Rules

### 1. Mobile First — Always

- Design at real device widths: 360–430px (small/large phones), verify on both iOS and Android via Expo Go or a simulator
- Touch targets minimum 44×44pt (iOS) / 48×48dp (Android)
- Respect safe areas — always use `react-native-safe-area-context`, never hardcode top/bottom padding
- Test every screen on a small device (e.g. iPhone SE / 360dp Android) before shipping — nothing should get cut off

### 2. No AI-Generated Look

Forbidden patterns:
- Generic centered "Welcome to [App]" screen with a big emoji icon
- Default card lists with a generic icon + placeholder "Item Title" / "Description here"
- Lorem ipsum in any shipped screen
- Cookie-cutter bottom tab bar: 3–5 icons, no states, no active-tab treatment

What "not AI-generated" looks like:
- Deliberate whitespace — not just padding: 16 everywhere
- Type hierarchy that guides the eye — one dominant element per screen
- Micro-interactions: pressed states, transitions (150–250ms via Reanimated), loading skeletons
- Real content in demos — real-looking transaction/merchant data, not "Item 1", "Item 2"

### 3. Typography

- Font scale: 12 / 14 / 16 / 20 / 24 / 32px
- Line height: 1.4–1.5 for body, 1.2 for headings
- Weight: 400 body, 500 labels, 600–700 headings/amounts
- Never more than 2 font sizes on one screen unless intentional (e.g. amount display is the deliberate exception)

## Approved Libraries

- **uniwind / NativeWind (Tailwind for React Native)** — already used in `apps/Dikapay` and `apps/Merchant` — use utility classes for all styling
- **react-native-reanimated** (already a dependency) — use for all animation and micro-interactions, not the legacy `Animated` API
- **react-native-gesture-handler** — use for any custom gesture/press interaction
- Accessible primitives: build on RN's own accessibility props (`accessibilityRole`, `accessibilityLabel`, `accessible`) — there is no Radix-equivalent in RN, so accessibility must be added explicitly per component, not assumed

These tools are building blocks, not a finished design. The goal is still a UI that feels crafted — not a default styled-scaffold.

---

### 4. Color

- Use a 2-color palette max per surface (background + text + 1 accent)
- Dark mode ready — use theme tokens (Tailwind config `theme.colors` / a shared theme object), never hardcoded hex scattered across components
- Accent color must have 4.5:1 contrast ratio on its background (WCAG AA)
- Avoid full black (#000) and full white (#fff) — use near-black and off-white

### 5. Spacing

Use a 4/8px grid. All spacing values must be multiples of 4 or 8.
- 4px — micro (icon gap, input padding-y)
- 8px — small (between related elements)
- 16px — base (card padding, section gap)
- 24px — medium (between sections)
- 32–48px — large (screen sections, empty states)

Never: `padding: 13` or `margin: 7`

### 6. Components

Every interactive component must have:
- Default state
- Pressed state (`Pressable` with `style={({pressed}) => ...}` or Reanimated press scale)
- Disabled state (visually distinct, not just non-functional)
- Loading state (skeleton or spinner where async — e.g. balance/transaction fetch)
- Empty state (never a blank screen — e.g. "No transactions yet")
- Error state (retry affordance, not a silent failure)

### 7. Interactions

- Transitions: 150ms ease for opacity/color, 200ms ease for transform (Reanimated `withTiming`)
- No janky layout shifts — reserve space before async content loads (skeletons sized to match real content)
- Button presses must have immediate visual feedback (scale-down or opacity change on press)
- Forms: validate on blur, show inline error below the field, never only a toast

### 8. Motion — MANDATORY after every UI build

Every screen should include restrained motion so it feels like a real product, not a static mockup.

**Required:**
- Screen enter: fade + slight translateY (`FadeInUp` from `react-native-reanimated`) staggered per section, not per row
- Loading → content transition: crossfade, never an abrupt swap
- Pull-to-refresh and pagination: native platform affordances, not custom reinvention
- Success/failure of a payment or slip-verification action: a clear, brief (under 1.5s) confirmation animation — never just a silent state change

**What NOT to do:**
- No full-screen particle/canvas effects
- No animation longer than 300ms for UI feedback (reserve longer for one-off celebratory moments, and only with explicit approval)
- No animation that blocks the user from proceeding (e.g. can't tap "confirm" until a decorative animation finishes)

### 9. Layout Patterns (preferred)

- Navigation: Expo Router tabs/stack — active tab must have a clear visual state (color + optional label weight change), not just icon swap
- Lists: `FlatList`/`FlashList` with proper `keyExtractor`, never `.map()` inside a `ScrollView` for long/dynamic lists
- Forms: full-width fields, generous vertical spacing, sticky primary action button above the keyboard (use `react-native-keyboard-controller`, already a dependency in `apps/Dikapay`)
- Dashboard/home: hero balance/summary card + scrollable content below

---

## What Workers Must Do

Before shipping any UI:

1. View the component on a small device (360dp width) — does it work?
2. Check: does this look like an unstyled RN scaffold? If yes, redesign.
3. Verify every interactive element has pressed + disabled + loading states
4. Use real-looking placeholder content (not "Item 1", "Lorem ipsum")
5. Confirm color contrast passes WCAG AA
6. **Reference first** — before writing any UI code, identify one real app to reference for the pattern (e.g. a transaction list, a QR scan flow). Never design from scratch.

---

## What Workers Must NOT Do

- Reach for a heavy generic component library (e.g. React Native Paper, UI Kitten) as a shortcut — style with uniwind/Tailwind classes to match the app's own visual language
- Ship a screen with only default RN styles
- Center everything — use intentional alignment
- Add animations that last longer than 300ms for routine feedback (unless explicit request)
- Block the keyboard from being dismissible, or let it cover the field being edited

---

## Inspiration References

Study real fintech / payment app flows (onboarding, QR scan, transaction history, slip verification) before designing any equivalent screen here — the goal is a UI that feels like it was designed by someone who cares, not generated.
