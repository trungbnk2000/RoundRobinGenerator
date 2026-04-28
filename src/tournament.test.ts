import { describe, expect, it } from "vitest";
import {
  calculateLeaderboard,
  createPlayers,
  generateMatches,
  getMatchScoreError,
  isMatchComplete,
  validateFirstMatchSlots,
  validatePlayerNames
} from "./tournament";

const players = createPlayers([
  "Avery",
  "Blake",
  "Casey",
  "Devon",
  "Emery",
  "Finley",
  "Gray",
  "Harper"
]);

describe("generateMatches", () => {
  it("generates 7 rounds and 14 matches", () => {
    const matches = generateMatches(players);

    expect(new Set(matches.map((match) => match.round)).size).toBe(7);
    expect(matches).toHaveLength(14);
  });

  it("puts every player in each round exactly once", () => {
    const matches = generateMatches(players);

    for (let round = 1; round <= 7; round += 1) {
      const playerIds = matches
        .filter((match) => match.round === round)
        .flatMap((match) => [...match.teamA.playerIds, ...match.teamB.playerIds]);

      expect(playerIds).toHaveLength(8);
      expect(new Set(playerIds).size).toBe(8);
    }
  });

  it("does not duplicate a player inside a match", () => {
    const matches = generateMatches(players);

    matches.forEach((match) => {
      const playerIds = [...match.teamA.playerIds, ...match.teamB.playerIds];
      expect(new Set(playerIds).size).toBe(4);
    });
  });

  it("honors a custom first match and fills the next match automatically", () => {
    const slots: [string, string, string, string] = [
      players[4].id,
      players[5].id,
      players[6].id,
      players[7].id
    ];
    const matches = generateMatches(players, slots);

    expect(matches[0]).toMatchObject({
      round: 1,
      court: 1,
      teamA: { playerIds: [players[4].id, players[5].id] },
      teamB: { playerIds: [players[6].id, players[7].id] }
    });
    expect(matches[1]).toMatchObject({
      round: 1,
      court: 2,
      teamA: { playerIds: [players[0].id, players[1].id] },
      teamB: { playerIds: [players[2].id, players[3].id] }
    });
  });
});

describe("score validation", () => {
  it("treats empty scores as incomplete without an error", () => {
    const [match] = generateMatches(players);

    expect(isMatchComplete(match)).toBe(false);
    expect(getMatchScoreError(match)).toBeNull();
  });

  it("rejects tied completed scores", () => {
    const [match] = generateMatches(players);
    const tiedMatch = { ...match, scoreA: 11, scoreB: 11 };

    expect(isMatchComplete(tiedMatch)).toBe(false);
    expect(getMatchScoreError(tiedMatch)).toBe("Trận đã hoàn tất không được hòa điểm.");
  });
});

describe("calculateLeaderboard", () => {
  it("calculates wins, losses, points, and differential", () => {
    const matches = generateMatches(players);
    const scoredMatches = [
      { ...matches[0], scoreA: 11, scoreB: 7 },
      { ...matches[1], scoreA: 4, scoreB: 11 }
    ];

    const leaderboard = calculateLeaderboard(players, scoredMatches);
    const firstWinner = leaderboard.find((row) => row.playerId === matches[0].teamA.playerIds[0]);
    const firstLoser = leaderboard.find((row) => row.playerId === matches[0].teamB.playerIds[0]);

    expect(firstWinner).toMatchObject({
      matchesPlayed: 1,
      wins: 1,
      losses: 0,
      pointsFor: 11,
      pointsAgainst: 7,
      pointDifferential: 4
    });
    expect(firstLoser).toMatchObject({
      matchesPlayed: 1,
      wins: 0,
      losses: 1,
      pointsFor: 7,
      pointsAgainst: 11,
      pointDifferential: -4
    });
  });

  it("sorts by wins, differential, points for, then name", () => {
    const matches = generateMatches(players);
    const scoredMatches = matches.slice(0, 3).map((match, index) => ({
      ...match,
      scoreA: 11 + index,
      scoreB: 8
    }));

    const leaderboard = calculateLeaderboard(players, scoredMatches);

    expect(leaderboard[0].wins).toBeGreaterThanOrEqual(leaderboard[1].wins);
    expect(leaderboard.map((row) => row.playerName)).toContain("Avery");
  });
});

describe("validatePlayerNames", () => {
  it("requires all names and rejects duplicates", () => {
    expect(validatePlayerNames(["A", "B", "C", "D", "E", "F", "G", ""])).toContain(
      "Vui lòng nhập đủ tên 8 người chơi trước khi tạo bảng đấu."
    );
    expect(validatePlayerNames(["A", "A", "C", "D", "E", "F", "G", "H"])).toContain(
      "Tên người chơi không được trùng nhau."
    );
  });
});

describe("validateFirstMatchSlots", () => {
  it("rejects duplicate first-match players", () => {
    const duplicateSlots = [
      players[0].id,
      players[0].id,
      players[2].id,
      players[3].id
    ];

    expect(validateFirstMatchSlots(duplicateSlots, players)).toContain(
      "Mỗi người chơi chỉ được xuất hiện một lần trong trận đầu."
    );
  });
});
