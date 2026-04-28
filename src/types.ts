export type Player = {
  id: string;
  name: string;
};

export type Team = {
  playerIds: [string, string];
};

export type Match = {
  id: string;
  round: number;
  court: number;
  teamA: Team;
  teamB: Team;
  scoreA: number | null;
  scoreB: number | null;
};

export type LeaderboardRow = {
  playerId: string;
  playerName: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDifferential: number;
  winRate: number;
};
