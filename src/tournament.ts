import type { LeaderboardRow, Match, Player } from "./types";

export const PLAYER_COUNT = 8;

export type FirstRoundSlots = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type FirstMatchSlots = [string, string, string, string];

export function createPlayers(names: string[]): Player[] {
  return names.map((name, index) => ({
    id: `player-${index + 1}`,
    name: name.trim()
  }));
}

export function validatePlayerNames(names: string[]): string[] {
  const errors: string[] = [];
  const normalizedNames = names.map((name) => name.trim().toLowerCase());

  if (names.some((name) => !name.trim())) {
    errors.push("Vui lòng nhập đủ tên 8 người chơi trước khi tạo bảng đấu.");
  }

  const uniqueNames = new Set(normalizedNames.filter(Boolean));
  if (uniqueNames.size !== normalizedNames.filter(Boolean).length) {
    errors.push("Tên người chơi không được trùng nhau.");
  }

  return errors;
}

export function createDefaultFirstRoundSlots(players: Player[]): FirstRoundSlots {
  if (players.length !== PLAYER_COUNT) {
    throw new Error("Round Robin Generator cần đúng 8 người chơi.");
  }

  return players.map((player) => player.id) as FirstRoundSlots;
}

export function validateFirstRoundSlots(slots: string[], players: Player[]): string[] {
  const errors: string[] = [];
  const playerIds = new Set(players.map((player) => player.id));
  const selectedIds = slots.filter(Boolean);

  if (slots.length !== PLAYER_COUNT || selectedIds.length !== PLAYER_COUNT) {
    errors.push("Vui lòng chọn đủ 8 người chơi cho vòng đầu trước khi tạo lịch.");
  }

  if (selectedIds.some((playerId) => !playerIds.has(playerId))) {
    errors.push("Vòng đầu có người chơi không thuộc bảng đấu này.");
  }

  if (new Set(selectedIds).size !== selectedIds.length) {
    errors.push("Mỗi người chơi chỉ được xuất hiện một lần trong vòng đầu.");
  }

  return errors;
}

export function createDefaultFirstMatchSlots(players: Player[]): FirstMatchSlots {
  if (players.length !== PLAYER_COUNT) {
    throw new Error("Round Robin Generator cần đúng 8 người chơi.");
  }

  return players.slice(0, 4).map((player) => player.id) as FirstMatchSlots;
}

export function validateFirstMatchSlots(slots: string[], players: Player[]): string[] {
  const errors: string[] = [];
  const playerIds = new Set(players.map((player) => player.id));
  const selectedIds = slots.filter(Boolean);

  if (slots.length !== 4 || selectedIds.length !== 4) {
    errors.push("Vui lòng chọn đủ 4 người chơi cho trận đầu trước khi tạo lịch.");
  }

  if (selectedIds.some((playerId) => !playerIds.has(playerId))) {
    errors.push("Trận đầu có người chơi không thuộc bảng đấu này.");
  }

  if (new Set(selectedIds).size !== selectedIds.length) {
    errors.push("Mỗi người chơi chỉ được xuất hiện một lần trong trận đầu.");
  }

  return errors;
}

function createFirstRoundFromFirstMatch(
  players: Player[],
  firstMatchSlots: FirstMatchSlots
): FirstRoundSlots {
  const firstMatchPlayerIds = new Set(firstMatchSlots);
  const remainingPlayerIds = players
    .map((player) => player.id)
    .filter((playerId) => !firstMatchPlayerIds.has(playerId));

  return [
    firstMatchSlots[0],
    firstMatchSlots[1],
    firstMatchSlots[2],
    firstMatchSlots[3],
    remainingPlayerIds[0],
    remainingPlayerIds[1],
    remainingPlayerIds[2],
    remainingPlayerIds[3]
  ];
}

function createRotationFromFirstRound(slots: FirstRoundSlots): string[] {
  const [
    court1TeamA1,
    court1TeamA2,
    court1TeamB1,
    court1TeamB2,
    court2TeamA1,
    court2TeamA2,
    court2TeamB1,
    court2TeamB2
  ] = slots;

  return [
    court1TeamA1,
    court2TeamA1,
    court2TeamB1,
    court1TeamB1,
    court1TeamB2,
    court2TeamB2,
    court2TeamA2,
    court1TeamA2
  ];
}

export function generateMatches(
  players: Player[],
  firstMatchSlots: FirstMatchSlots = createDefaultFirstMatchSlots(players)
): Match[] {
  if (players.length !== PLAYER_COUNT) {
    throw new Error("Round Robin Generator cần đúng 8 người chơi.");
  }

  const firstMatchErrors = validateFirstMatchSlots(firstMatchSlots, players);
  if (firstMatchErrors.length > 0) {
    throw new Error(firstMatchErrors.join(" "));
  }

  const rounds: Array<Array<[string, string]>> = [];
  const firstRoundSlots = createFirstRoundFromFirstMatch(players, firstMatchSlots);
  let rotation = createRotationFromFirstRound(firstRoundSlots);

  for (let round = 1; round <= 7; round += 1) {
    rounds.push([
      [rotation[0], rotation[7]],
      [rotation[1], rotation[6]],
      [rotation[2], rotation[5]],
      [rotation[3], rotation[4]]
    ]);

    rotation = [
      rotation[0],
      rotation[7],
      rotation[1],
      rotation[2],
      rotation[3],
      rotation[4],
      rotation[5],
      rotation[6]
    ];
  }

  return rounds.flatMap((pairs, roundIndex) => {
    const round = roundIndex + 1;

    return [
      {
        id: `round-${round}-court-1`,
        round,
        court: 1,
        teamA: { playerIds: pairs[0] },
        teamB: { playerIds: pairs[3] },
        scoreA: null,
        scoreB: null
      },
      {
        id: `round-${round}-court-2`,
        round,
        court: 2,
        teamA: { playerIds: pairs[1] },
        teamB: { playerIds: pairs[2] },
        scoreA: null,
        scoreB: null
      }
    ];
  });
}

export function isMatchComplete(match: Match): boolean {
  return (
    match.scoreA !== null &&
    match.scoreB !== null &&
    Number.isInteger(match.scoreA) &&
    Number.isInteger(match.scoreB) &&
    match.scoreA >= 0 &&
    match.scoreB >= 0 &&
    match.scoreA !== match.scoreB
  );
}

export function getMatchScoreError(match: Match): string | null {
  const hasScoreA = match.scoreA !== null;
  const hasScoreB = match.scoreB !== null;

  if (!hasScoreA && !hasScoreB) {
    return null;
  }

  if (hasScoreA !== hasScoreB) {
    return "Vui lòng nhập điểm cho cả hai đội để hoàn tất trận.";
  }

  if (
    match.scoreA === null ||
    match.scoreB === null ||
    match.scoreA < 0 ||
    match.scoreB < 0 ||
    !Number.isInteger(match.scoreA) ||
    !Number.isInteger(match.scoreB)
  ) {
    return "Điểm phải là số nguyên không âm.";
  }

  if (match.scoreA === match.scoreB) {
    return "Trận đã hoàn tất không được hòa điểm.";
  }

  return null;
}

export function calculateLeaderboard(
  players: Player[],
  matches: Match[]
): LeaderboardRow[] {
  const rows = new Map<string, LeaderboardRow>();

  players.forEach((player) => {
    rows.set(player.id, {
      playerId: player.id,
      playerName: player.name,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      pointDifferential: 0,
      winRate: 0
    });
  });

  matches.filter(isMatchComplete).forEach((match) => {
    const scoreA = match.scoreA ?? 0;
    const scoreB = match.scoreB ?? 0;
    const teamAWon = scoreA > scoreB;

    const applyResult = (
      playerId: string,
      pointsFor: number,
      pointsAgainst: number,
      won: boolean
    ) => {
      const row = rows.get(playerId);
      if (!row) {
        return;
      }

      row.matchesPlayed += 1;
      row.wins += won ? 1 : 0;
      row.losses += won ? 0 : 1;
      row.pointsFor += pointsFor;
      row.pointsAgainst += pointsAgainst;
      row.pointDifferential = row.pointsFor - row.pointsAgainst;
      row.winRate = row.matchesPlayed ? row.wins / row.matchesPlayed : 0;
    };

    match.teamA.playerIds.forEach((playerId) =>
      applyResult(playerId, scoreA, scoreB, teamAWon)
    );
    match.teamB.playerIds.forEach((playerId) =>
      applyResult(playerId, scoreB, scoreA, !teamAWon)
    );
  });

  return Array.from(rows.values()).sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    if (b.pointDifferential !== a.pointDifferential) {
      return b.pointDifferential - a.pointDifferential;
    }
    if (b.pointsFor !== a.pointsFor) {
      return b.pointsFor - a.pointsFor;
    }
    return a.playerName.localeCompare(b.playerName);
  });
}
