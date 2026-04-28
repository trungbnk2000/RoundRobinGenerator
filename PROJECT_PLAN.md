# Pickleball Round Robin Generator - Project Plan

## 1. Goal

Build a small web app that lets a user enter 8 pickleball player names, generates a round robin match schedule, captures match scores, and automatically updates a leaderboard showing wins, losses, and points.

## 2. Core Scope

### Included

- Player setup form for exactly 8 player names.
- Round robin match generation for doubles pickleball.
- Match list with two teams per match.
- Score inputs for each match.
- Leaderboard that updates from submitted scores.
- Clear reset/start-over flow.
- Basic validation for missing names, duplicate names, and invalid scores.
- Static site deployment through GitHub Pages.
- Mobile-first browser experience.

### Not Included In First Version

- Login or saved user accounts.
- Tournament history across browser sessions, unless local storage is added as a stretch goal.
- Flexible player counts other than 8.
- Advanced bracket or playoff generation.
- Court assignment optimization.
- Referee/admin permissions.

## 3. User Flow

1. User opens the app.
2. User enters 8 player names.
3. User clicks `Generate Matches`.
4. App creates a round robin schedule.
5. User enters scores after each match.
6. App updates each player's wins, losses, point totals, and ranking.
7. User can reset the tournament and start again.

## 4. Round Robin Format

The app should generate doubles matches from 8 players.

Recommended first-version format:

- Each match has 4 players: 2 players per team.
- Use a rotation algorithm so players are paired with different partners where possible.
- Track player participation so each player gets a balanced number of matches.
- Avoid immediately repeated teammates or opponents when possible.

For 8 players, a practical first version can generate 7 rounds:

- 4 players sit out or play depending on available court count.
- If assuming 1 court, each round has 1 match and 4 players sit out.
- If assuming 2 courts, each round has 2 matches and all 8 players play each round.

Initial app assumption:

- Use 2 courts.
- Generate 7 rounds.
- Each round has 2 doubles matches.
- Total matches: 14.

This gives the app a complete event structure while keeping the UI simple.

## 5. Score Rules

For each match, users enter:

- Team A score.
- Team B score.

Validation:

- Scores must be whole numbers.
- Scores cannot be negative.
- Scores cannot be equal if the match is marked complete.
- Empty score fields mean the match is not complete yet.

Leaderboard calculation:

- Match win: team with the higher score.
- Match loss: team with the lower score.
- Each player on the winning team receives 1 win.
- Each player on the losing team receives 1 loss.
- Points for each player increase by their team's score.
- Optional point differential can be calculated as points for minus points against.

Recommended leaderboard columns:

- Rank.
- Player.
- Matches Played.
- Wins.
- Losses.
- Points For.
- Points Against.
- Point Differential.

Sorting:

1. Wins descending.
2. Point Differential descending.
3. Points For descending.
4. Player name ascending.

## 6. Main Screens And Components

### Player Setup

Purpose: collect the 8 player names.

Elements:

- 8 text inputs.
- Generate Matches button.
- Validation messages.

### Match Schedule

Purpose: show generated rounds and allow score entry.

Elements:

- Round sections.
- Match cards or compact rows.
- Team A player names.
- Team B player names.
- Score input for Team A.
- Score input for Team B.
- Match completion state.

### Leaderboard

Purpose: show current standings.

Elements:

- Table sorted by ranking rules.
- Empty state before scores are entered.
- Live updates as scores change.

### Tournament Actions

Elements:

- Reset tournament button.
- Optional: edit players and regenerate.
- Optional: export/print schedule.

## 7. Data Model

### Player

```ts
type Player = {
  id: string;
  name: string;
};
```

### Team

```ts
type Team = {
  playerIds: [string, string];
};
```

### Match

```ts
type Match = {
  id: string;
  round: number;
  court: number;
  teamA: Team;
  teamB: Team;
  scoreA: number | null;
  scoreB: number | null;
};
```

### Leaderboard Row

```ts
type LeaderboardRow = {
  playerId: string;
  playerName: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDifferential: number;
};
```

## 8. Match Generation Approach

Use a deterministic scheduler for the first version so results are predictable and easy to test.

Implementation idea:

1. Start with 8 player IDs in order.
2. Generate round rotations using a standard round robin circle method.
3. For each round, create 4 pairs.
4. Combine pairs into 2 doubles matches.
5. Rotate pairings each round to reduce repeated partners.
6. Return an array of 14 matches grouped by round.

Quality targets:

- Every player appears once per round.
- Every player plays 7 matches total.
- Partner repetition should be minimized.
- Opponent repetition should be reasonably distributed.

If the deterministic algorithm creates poor pairing balance, use a scoring-based generator:

- Generate candidate team assignments.
- Penalize repeated partners.
- Penalize repeated opponents.
- Choose the lowest-penalty schedule.

## 9. State Management

The app can use simple local component state for version 1.

Suggested state:

- `players`
- `matches`
- `validationErrors`

Derived state:

- `leaderboard`
- `completedMatchCount`
- `totalMatchCount`

Optional persistence:

- Save players and matches to `localStorage`.
- Restore tournament when the page reloads.

## 10. Recommended Technology

The app should be built as a static site that can be hosted with GitHub Pages.

Recommended stack:

- React for the UI.
- Vite for the build tool and local development server.
- TypeScript for safer scheduler and leaderboard logic.
- Plain CSS or CSS modules for styling.
- Vitest for unit tests.
- GitHub Pages for hosting.
- GitHub Actions for automatic deployment after pushing to the main branch.

Why this stack fits:

- Vite outputs static HTML, CSS, and JavaScript files that work well on GitHub Pages.
- React is enough for the interactive form, score inputs, schedule, and leaderboard without needing a backend.
- TypeScript helps prevent mistakes in match generation and scoring logic.
- The whole app can run in the browser with no server, database, or login system.
- `localStorage` can preserve tournament progress on the same device.

Deployment target:

- Build command: `npm run build` or `yarn build`.
- Output directory: `dist`.
- Hosting: GitHub Pages.
- URL format: `https://<github-username>.github.io/<repository-name>/`.

Important GitHub Pages configuration:

- Configure Vite `base` to match the repository name when deploying to a project page.
- Example: if the repository is `RoundRobinGenerator`, set `base: "/RoundRobinGenerator/"`.
- Add a GitHub Actions workflow to build the app and publish the `dist` folder.

Alternative simpler stack:

- Vanilla HTML, CSS, and JavaScript.

Use this only if the app should stay extremely small. React + Vite is still recommended because the app has enough state and derived calculations to benefit from components and tests.

## 11. Mobile Web Design Requirements

- The first screen should be the actual generator, not a marketing landing page.
- The layout should be designed mobile-first, then enhanced for desktop.
- Primary usage should feel comfortable on a phone during live pickleball play.
- Inputs and tap targets should be large enough for quick use outdoors.
- The player setup form should be a single-column layout on mobile.
- Match cards should stack vertically on mobile.
- Score inputs should be easy to tap and edit with numeric keyboards.
- The leaderboard should avoid cramped columns on small screens.
- Important leaderboard columns on mobile should be Rank, Player, Wins, Losses, and Points.
- Secondary stats such as Points Against and Point Differential can be shown with horizontal scroll, expandable rows, or a wider desktop table.
- Match rows should be easy to scan during live play.
- Score inputs should be large enough for quick entry.
- Leaderboard should remain readable on smaller screens.
- Completed matches should be visually distinct from incomplete matches.
- Invalid scores should be shown near the relevant match.

## 12. Testing Plan

### Unit Tests

- Generates exactly 7 rounds.
- Generates exactly 14 matches.
- Each round includes all 8 players exactly once.
- No match contains the same player twice.
- Leaderboard calculates wins and losses correctly.
- Leaderboard calculates points for, points against, and differential correctly.
- Leaderboard sorting handles tie breakers.
- Invalid scores are rejected.

### Manual Tests

- Enter fewer than 8 names.
- Enter duplicate names.
- Generate matches with valid names.
- Submit a few scores and verify leaderboard updates.
- Clear a score and verify leaderboard recalculates.
- Reset tournament.
- Check layout on mobile width.

## 13. Implementation Phases

### Phase 1: Project Setup

- Create a React + Vite + TypeScript app.
- Add styling foundation.
- Add Vitest test setup.
- Configure Vite for GitHub Pages deployment.

### Phase 2: Core Data And Scheduler

- Define player, match, and leaderboard types.
- Implement round robin match generation.
- Add unit tests for schedule quality.

### Phase 3: Score And Leaderboard Logic

- Implement score validation.
- Implement leaderboard calculation.
- Add unit tests for standings.

### Phase 4: UI

- Build player setup form.
- Build match schedule view.
- Build score inputs.
- Build leaderboard table.
- Build reset flow.

### Phase 5: Polish

- Add responsive layout improvements.
- Add local storage persistence if desired.
- Add print/export option if time allows.
- Add GitHub Actions deployment workflow.
- Run final manual checks.

### Phase 6: Deployment

- Create a GitHub repository if one does not already exist.
- Push the app to GitHub.
- Enable GitHub Pages using GitHub Actions.
- Confirm the deployed app works on a mobile browser.
- Confirm refresh behavior works on the GitHub Pages URL.

## 14. Open Decisions

- Should the project use npm or yarn?
- Should the first version support only 2 courts, or let users choose 1 or 2 courts?
- Should matches play to 11, 15, or any score?
- Should point totals mean only points scored, or should the app also show point differential?
- Should generated schedules prioritize unique partners over unique opponents?
- Should tournament data persist after browser refresh?

## 15. Recommended First Build

Build the first version as a mobile-first static single-page web app with:

- React + Vite + TypeScript.
- Exactly 8 players.
- 2 courts.
- 7 rounds.
- 14 total matches.
- Editable score fields.
- Live leaderboard.
- Reset button.
- GitHub Pages deployment.

This keeps the app useful immediately while leaving room to add flexible player counts, court options, and persistence later.
