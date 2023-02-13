import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import useTextState from "../../state/text";
import useGameState from "../../state/game";
import {
  addToLeaderBoard,
  getPositionInLeaderBoard,
} from "../../lib/leaderboard";
import useUserState from "../../state/user";
import { addMyResults, getGameEntry, GameEntry } from "../../lib/game";

export interface Props {}

/**
 *
 */
const GameOver = ({}: Props) => {
  const { resetGame, token, playerPositions } = useGameState();
  const { user } = useUserState();
  const { wpm, textState, resetText } = useTextState();
  const router = useRouter();

  const [addedToLeaderBoard, setAddedToLeaderBoard] = useState(false);

  const [position, setPosition] = useState(0);
  const [results, setResults] = useState<GameEntry["results"]>();

  const accuracy = useMemo(() => {
    const correct = textState.filter((c) => c.state === "correct").length;
    const incorrect = textState.filter((c) => c.state === "incorrect").length;
    const total = correct + incorrect;
    return (correct / total) * 100;
  }, [textState]);

  const score = useMemo(() => {
    return Math.floor(wpm * accuracy);
  }, [wpm, accuracy]);

  useEffect(() => {
    getPositionInLeaderBoard(score).then(setPosition);
  }, []);

  useEffect(() => {
    if (!score) return;

    addMyResults(
      token!,
      {
        wpm,
        accuracy,
        score,
      },
      user?.name || "Anonymous"
    );
  }, [token, wpm, accuracy, score, user]);

  useEffect(() => {
    (async function () {
      const game = await getGameEntry(token!);
      console.log(game);

      setResults(game?.results);
    })();
  }, [token, playerPositions]);

  return (
    <div className="text-black">
      <h1 className="text-2xl mb-4">Game Over</h1>

      <div className="flex flex-col">
        <div>WPM: {wpm.toFixed(2)}</div>
        <div>Accuracy: {accuracy.toFixed(2)}%</div>
        <div className="font-bold">Score: {score.toFixed(0)}</div>
        <div className="font-bold">
          Position: {position} {position < 11 ? "🎉" : ""}
        </div>
      </div>

      {results && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">Leaderboard</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(results)
              .map(([name, entry]) => ({
                player_name: name,
                ...entry,
              }))
              .sort((e1, e2) => e2.score - e1.score)
              .map((result, i) => (
                <div
                  key={i}
                  className={`flex justify-between ${
                    result.player_name === user?.name ? "font-bold" : ""
                  }`}
                >
                  <div className="w-[50px] text-left">
                    {i + 1}
                    {i === 0 ? " 🎉" : ""}
                  </div>
                  <div>{result.player_name}</div>
                  <div>{result.score}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <button
          className="bg-orange text-white px-4 py-2 rounded-md"
          onClick={() => {
            resetGame();
            resetText();

            router.push("/");
          }}
        >
          Play Again
        </button>

        <button
          className="bg-white text-black px-4 py-2 rounded-md"
          disabled={addedToLeaderBoard}
          onClick={() => {
            if (!user) return;
            addToLeaderBoard({
              player_name: user?.name,
              score,
              wpm,
              accuracy,
            });

            setAddedToLeaderBoard(true);
          }}
        >
          {addedToLeaderBoard ? "Added to Leaderboard" : "Add to Leaderboard"}
        </button>
      </div>
    </div>
  );
};

export default GameOver;
