import React, { useEffect, useState } from "react";
import { getLeaderBoard, LeaderBoardEntry } from "../../lib/leaderboard";

export interface Props {}

/**
 *
 */
const LeaderBoard = ({}: Props) => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardEntry[]>([]);

  useEffect(() => {
    getLeaderBoard().then(setLeaderBoard);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl mb-4">Leaderboard</h2>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>WPM</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.map((entry, idx) => (
            <tr key={entry.id}>
              <td>{idx + 1}</td>
              <td>{entry.player_name}</td>
              <td>{entry.score}</td>
              <td>{entry.wpm}</td>
              <td>{entry.accuracy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
