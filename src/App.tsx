import {
  CalendarDays,
  Grid2X2,
  ListChecks,
  Medal,
  RotateCcw,
  Settings,
  Shuffle,
  Trophy,
  User,
  UserPlus
} from "lucide-react";
import { useMemo, useState } from "react";
import type { Match, Player } from "./types";
import {
  PLAYER_COUNT,
  calculateLeaderboard,
  createDefaultFirstMatchSlots,
  createPlayers,
  type FirstMatchSlots,
  generateMatches,
  getMatchScoreError,
  isMatchComplete,
  validateFirstMatchSlots,
  validatePlayerNames
} from "./tournament";

type Stage = "setup" | "bracket" | "matches" | "results";

const starterNames = Array.from({ length: PLAYER_COUNT }, (_, index) => {
  return index === 0 ? "" : "";
});

function getPlayerName(playerId: string, players: Player[]) {
  return players.find((player) => player.id === playerId)?.name ?? "Không rõ";
}

function navClass(isActive: boolean) {
  return isActive ? "nav-link nav-link-active" : "nav-link";
}

function TeamBlock({
  align = "start",
  playerIds,
  players,
}: {
  align?: "start" | "end";
  playerIds: [string, string];
  players: Player[];
}) {
  return (
    <div className={`team-block team-block-${align}`}>
      {playerIds.map((playerId) => {
        const name = getPlayerName(playerId, players);

        return (
          <div className="team-player" key={playerId}>
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function App() {
  const [stage, setStage] = useState<Stage>("setup");
  const [playerNames, setPlayerNames] = useState<string[]>(starterNames);
  const [players, setPlayers] = useState<Player[]>([]);
  const [firstMatchSlots, setFirstMatchSlots] = useState<FirstMatchSlots | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const leaderboard = useMemo(
    () => calculateLeaderboard(players, matches),
    [players, matches]
  );
  const completedMatches = matches.filter(isMatchComplete).length;
  const allMatchesFinished = matches.length > 0 && completedMatches === matches.length;

  const updatePlayerName = (index: number, value: string) => {
    setPlayerNames((current) =>
      current.map((name, nameIndex) => (nameIndex === index ? value : name))
    );
  };

  const createBracket = () => {
    const validationErrors = validatePlayerNames(playerNames);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      return;
    }

    const nextPlayers = createPlayers(playerNames);
    setPlayers(nextPlayers);
    setFirstMatchSlots(createDefaultFirstMatchSlots(nextPlayers));
    setMatches([]);
    setStage("bracket");
  };

  const updateBracketName = (playerId: string, value: string) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === playerId ? { ...player, name: value } : player
      )
    );
  };

  const updateFirstMatchSlot = (slotIndex: number, playerId: string) => {
    setFirstMatchSlots((current) => {
      if (!current) {
        return current;
      }

      return current.map((slot, index) =>
        index === slotIndex ? playerId : slot
      ) as FirstMatchSlots;
    });
  };

  const generateSchedule = () => {
    const validationErrors = [
      ...validatePlayerNames(players.map((player) => player.name)),
      ...validateFirstMatchSlots(firstMatchSlots ?? [], players)
    ];
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      return;
    }

    setMatches(generateMatches(players, firstMatchSlots ?? undefined));
    setStage("matches");
  };

  const updateScore = (
    matchId: string,
    scoreKey: "scoreA" | "scoreB",
    value: string
  ) => {
    setMatches((current) =>
      current.map((match) => {
        if (match.id !== matchId) {
          return match;
        }

        return {
          ...match,
          [scoreKey]: value === "" ? null : Number(value)
        };
      })
    );
  };

  const resetTournament = () => {
    setStage("setup");
    setPlayerNames(starterNames);
    setPlayers([]);
    setFirstMatchSlots(null);
    setMatches([]);
    setErrors([]);
  };

  return (
    <>
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-icon">
            <Trophy aria-hidden="true" size={20} />
          </span>
          <span>Round Robin Generator</span>
        </div>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <button className={navClass(stage === "setup")} type="button" onClick={() => setStage("setup")}>
            <Settings aria-hidden="true" size={18} />
            Thiết lập
          </button>
          <button
            className={navClass(stage === "bracket")}
            type="button"
            onClick={() => players.length === PLAYER_COUNT && setStage("bracket")}
          >
            <Grid2X2 aria-hidden="true" size={18} />
            Ghép trận
          </button>
          <button
            className={navClass(stage === "matches")}
            type="button"
            onClick={() => matches.length > 0 && setStage("matches")}
          >
            <ListChecks aria-hidden="true" size={18} />
            Nhập điểm
          </button>
          <button
            className={navClass(stage === "results")}
            type="button"
            onClick={() => allMatchesFinished && setStage("results")}
          >
            <Medal aria-hidden="true" size={18} />
            Xếp hạng
          </button>
        </nav>
        <button className="icon-button" type="button" onClick={resetTournament}>
          <RotateCcw aria-hidden="true" size={20} />
          <span className="sr-only">Tạo lại giải đấu</span>
        </button>
      </header>

      <main className="app-shell">
        {errors.length > 0 ? (
          <div className="alert" role="alert">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        {stage === "setup" ? (
          <section className="input-page">
            <div className="input-heading">
              <h1>Tạo giải đấu mới</h1>
              <p>Nhập 8 người chơi để tạo bảng thi đấu vòng tròn có thể chỉnh sửa.</p>
            </div>

            <div className="input-panel">
              <div className="player-grid">
                {playerNames.map((name, index) => (
                  <label className="player-input-card" key={index}>
                    <span className="floating-label">Người chơi {index + 1}</span>
                    <span className={name.trim() ? "person-chip person-chip-filled" : "person-chip"}>
                      {name.trim() ? (
                        <User aria-hidden="true" size={18} />
                      ) : (
                        <UserPlus aria-hidden="true" size={18} />
                      )}
                    </span>
                    <input
                      value={name}
                      onChange={(event) => updatePlayerName(index, event.target.value)}
                      placeholder="Nhập tên"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button className="primary-button full-width" type="button" onClick={createBracket}>
              <CalendarDays aria-hidden="true" size={18} />
              Tạo bảng thi đấu
            </button>
          </section>
        ) : null}

        {stage === "bracket" ? (
          <section className="input-page">
            <div className="input-heading">
              <h1>Chỉnh bảng đấu</h1>
              <p>Chỉnh tên và chọn trận đầu tiên trước khi tạo toàn bộ lịch thi đấu.</p>
            </div>

            <div className="input-panel">
              <div className="player-grid">
                {players.map((player, index) => (
                  <label className="player-input-card" key={player.id}>
                    <span className="floating-label">Vị trí {index + 1}</span>
                    <span className="slot-chip">{index + 1}</span>
                    <input
                      value={player.name}
                      onChange={(event) => updateBracketName(player.id, event.target.value)}
                      aria-label={`Vị trí bảng đấu ${index + 1}`}
                    />
                  </label>
                ))}
              </div>
            </div>

            {firstMatchSlots ? (
              <div className="first-round-panel">
                <div className="section-heading">
                  <p className="eyebrow">Trận đầu tiên</p>
                  <h2>Sắp xếp trận mở màn</h2>
                  <p>Chọn 4 người có thể bắt đầu trước. Những người còn lại sẽ được xếp sau.</p>
                </div>

                <div className="first-round-grid">
                  {[
                    { court: 1, label: "Đội A", indexes: [0, 1] },
                    { court: 1, label: "Đội B", indexes: [2, 3] }
                  ].map((group) => (
                    <div className="first-round-card" key={`${group.court}-${group.label}`}>
                      <div className="first-round-card-heading">
                        <span>Sân {group.court}</span>
                        <strong>{group.label}</strong>
                      </div>
                      {group.indexes.map((slotIndex) => (
                        <label className="select-field" key={slotIndex}>
                          <span>Người chơi {slotIndex % 2 === 0 ? 1 : 2}</span>
                          <select
                            value={firstMatchSlots[slotIndex]}
                            onChange={(event) =>
                              updateFirstMatchSlot(slotIndex, event.target.value)
                            }
                          >
                            {players.map((player) => (
                              <option key={player.id} value={player.id}>
                                {player.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="button-row">
              <button className="secondary-button" type="button" onClick={() => setStage("setup")}>
                Sửa thiết lập
              </button>
              <button className="primary-button" type="button" onClick={generateSchedule}>
                <Shuffle aria-hidden="true" size={18} />
                Tạo lịch thi đấu
              </button>
            </div>
          </section>
        ) : null}

        {stage === "matches" ? (
          <div className="workspace">
          <section className="match-area">
            <div className="match-page-heading">
              <div>
                <p>Giải đấu vòng tròn</p>
                <h1>Lịch thi đấu</h1>
              </div>
              <div className="active-count">
                <span>{matches.length - completedMatches} trận chưa xong</span>
              </div>
            </div>

            <div className="round-list">
              {Array.from(new Set(matches.map((match) => match.round))).map((round) => (
                <section className="round-section" key={round}>
                  <h3>Vòng {round}/7</h3>
                  <div className="round-grid">
                  {matches
                    .filter((match) => match.round === round)
                    .map((match) => {
                      const scoreError = getMatchScoreError(match);
                      const complete = isMatchComplete(match);
                      const hasAnyScore = match.scoreA !== null || match.scoreB !== null;
                      const statusLabel = complete
                        ? "Hoàn tất"
                        : hasAnyScore
                          ? "Đang nhập"
                          : "Chờ";

                      return (
                        <article
                          className={`match-card ${complete ? "match-card-complete" : ""}`}
                          key={match.id}
                        >
                          <div className="match-meta">
                            <span>Sân {match.court}</span>
                            <span className={complete ? "match-status complete" : hasAnyScore ? "match-status progress" : "match-status waiting"}>
                              {statusLabel}
                            </span>
                          </div>
                          <div className="matchup">
                            <TeamBlock playerIds={match.teamA.playerIds} players={players} />
                            <div className="versus">đấu với</div>
                            <TeamBlock align="end" playerIds={match.teamB.playerIds} players={players} />
                          </div>
                          <div className="score-entry">
                            <span>Nhập điểm</span>
                            <div className="score-pair">
                              <input
                                className="score-input"
                                inputMode="numeric"
                                min="0"
                                type="number"
                                value={match.scoreA ?? ""}
                                onChange={(event) =>
                                  updateScore(match.id, "scoreA", event.target.value)
                                }
                                placeholder="0"
                                aria-label={`Điểm đội A sân ${match.court}`}
                              />
                              <span>:</span>
                              <input
                                className="score-input"
                                inputMode="numeric"
                                min="0"
                                type="number"
                                value={match.scoreB ?? ""}
                                onChange={(event) =>
                                  updateScore(match.id, "scoreB", event.target.value)
                                }
                                placeholder="0"
                                aria-label={`Điểm đội B sân ${match.court}`}
                              />
                            </div>
                          </div>
                          {scoreError ? <p className="score-error">{scoreError}</p> : null}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <aside className="leaderboard-area">
            <div className="leaderboard-heading">
              <div>
                <p className="eyebrow">Trực tiếp</p>
                <h2>Bảng xếp hạng</h2>
              </div>
              {allMatchesFinished ? (
                <span className="badge success">
                  <Trophy aria-hidden="true" size={14} />
                  Chung cuộc
                </span>
              ) : null}
            </div>

            <div className="leaderboard-list">
              {leaderboard.map((row, index) => (
                <article className="leader-row" key={row.playerId}>
                  <span className="rank-badge">{index + 1}</span>
                  <div className="leader-main">
                    <strong>{row.playerName}</strong>
                    <span>
                      {row.matchesPlayed} trận · thắng {Math.round(row.winRate * 100)}%
                    </span>
                  </div>
                  <div className="leader-stats">
                    <span>{row.wins}T</span>
                    <span>{row.losses}B</span>
                    <span>{row.pointDifferential >= 0 ? "+" : ""}{row.pointDifferential}</span>
                  </div>
                </article>
              ))}
            </div>

            {allMatchesFinished ? (
              <div className="final-panel">
                <p className="eyebrow">Thống kê chung cuộc</p>
                <h3>{leaderboard[0]?.playerName} đứng đầu bảng</h3>
                <p>
                  Tất cả 14 trận đã hoàn tất. Mở trang kết quả để xem bảng xếp hạng đầy đủ.
                </p>
                <button className="primary-button full-width compact" type="button" onClick={() => setStage("results")}>
                  <Medal aria-hidden="true" size={18} />
                  Xem kết quả
                </button>
              </div>
            ) : null}
          </aside>
          </div>
        ) : null}

        {stage === "results" ? (
          <section className="results-page">
            <div className="results-heading">
              <div>
                <h1>Bảng xếp hạng chung cuộc</h1>
                <p>Giải đấu vòng tròn</p>
              </div>
              <button className="secondary-button" type="button" onClick={() => setStage("matches")}>
                Xem lịch đấu
              </button>
            </div>

            <div className="results-list">
              {leaderboard.map((row, index) => {
                const rank = index + 1;
                const isTop = rank === 1;
                const diffLabel =
                  row.pointDifferential > 0
                    ? `+${row.pointDifferential}`
                    : `${row.pointDifferential}`;

                return (
                  <article
                    className={isTop ? "result-row result-row-top" : "result-row"}
                    key={row.playerId}
                  >
                    {isTop ? <span className="winner-bar" aria-hidden="true" /> : null}
                    <span className={isTop ? "result-rank result-rank-top" : "result-rank"}>
                      {rank}
                    </span>
                    <div className="result-main">
                      <h3>{row.playerName}</h3>
                      <div className="result-badges">
                        <span>{row.wins} thắng</span>
                        <span>{row.losses} thua</span>
                        <span>{row.matchesPlayed} trận</span>
                      </div>
                    </div>
                    <div className="result-diff">
                      <strong className={row.pointDifferential < 0 ? "negative" : ""}>
                        {diffLabel}
                      </strong>
                      <span>Hiệu số</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
