import React, { useEffect, useMemo } from "react";
import { CharacterState, TextState } from "../../state/text";
import useTextState from "../../state/text";
import useGameState from "../../state/game";
import { useInterval } from "../../lib/helper";
import GameOver from "../Gameover/index";
import { User } from "../../state/user";

export interface Props {}

/**
 *
 */
const TypingArea = ({}: Props) => {
  const {
    nextCharacter,
    previousCharacter,
    textState,
    setWPM,
    wpm,
    currentCharacter,
    currentIdx,
    lastTextState,
    setLastTextState,
  } = useTextState();

  const { state, ready, setReady, playerPositions } = useGameState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state !== "playing") {
        return;
      }

      if (!lastTextState) {
        setLastTextState({
          index: 0,
          date: Date.now(),
        });
      }

      if (e.key === "Backspace") {
        previousCharacter();
        return;
      }

      // handle shift key
      if (e.key === "Shift") {
        return;
      }

      nextCharacter(e.key === currentCharacter ? "correct" : "incorrect");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCharacter, nextCharacter, previousCharacter, state]);

  useInterval(() => {
    if (!lastTextState) return;

    const seconds = (Date.now() - lastTextState.date) / 1000;
    const currentWPM = Math.floor(
      (currentIdx - lastTextState.index) / 5 / (seconds / 60)
    );

    setLastTextState({
      index: currentIdx,
      date: Date.now(),
    });

    if (currentIdx === lastTextState.index) return;

    setWPM(Math.max(wpm * 0.9 + currentWPM * 0.1, 0));
  }, 1000);

  const getLetterClass = (cState: CharacterState, idx: number) => {
    let classes = "";

    if (idx === currentIdx) {
      classes += "bg-primary ";
    }

    switch (cState) {
      case "correct":
        classes += "text-green-500";
        break;
      case "incorrect":
        classes += "text-red-500";
        break;
      default:
        break;
    }

    return classes;
  };

  const words = useMemo(
    () =>
      textState.reduce(
        (acc, curr) => {
          if (curr.character === " ") {
            acc.push([]);
          } else {
            acc[acc.length - 1].push(curr);
          }

          return acc;
        },
        [[]] as TextState[][]
      ),
    [textState]
  );

  let wordIdx = 0;

  return (
    <div className="border-white border-2 p-4 relative min-w-[500px] min-h-[500px]">
      <div className="font-mono text-center flex flex-wrap justify-center">
        {words.map((word, idx) => {
          let result = (
            <div key={`w-${idx}`} className="flex">
              {word.map(({ character, state }, wIdx) => {
                return (
                  <span
                    key={wordIdx + wIdx}
                    className={
                      getLetterClass(state, wordIdx + wIdx) +
                      " block my-4 relative"
                    }
                  >
                    {character}

                    {playerPositions[wordIdx + wIdx] && (
                      <PlayerIndicator user={playerPositions[wordIdx + wIdx]} />
                    )}
                  </span>
                );
              })}
              <span
                className={
                  getLetterClass("correct", wordIdx + word.length) +
                  " block my-4"
                }
              >
                &nbsp;
                {playerPositions[wordIdx + word.length] && (
                  <PlayerIndicator
                    user={playerPositions[wordIdx + word.length]}
                  />
                )}
              </span>
            </div>
          );

          wordIdx += word.length + 1;

          return result;
        })}
      </div>
      {state === "idle" && (
        <div className="text-center absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-slate-300 bg-opacity-50">
          {!ready && (
            <button
              className="bg-orange p-2 rounded w-32"
              onClick={() => {
                setReady(true);
              }}
            >
              Start
            </button>
          )}
        </div>
      )}
      {state === "gameover" && (
        <div className="text-center absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-slate-300 overflow-auto">
          <GameOver />
        </div>
      )}
    </div>
  );
};

export default TypingArea;

const PlayerIndicator = ({ user }: { user: User }) => {
  return (
    <div
      className="text-[7px] font-mono text-white flex items-center justify-center absolute left-1/2 -translate-x-1/2"
      style={{
        color: user.color,
      }}
    >
      {user.initials}
    </div>
  );
};
