import React, { useEffect } from "react";
import useGameState from "../../state/game";
import { useRouter } from "next/router";
import useUserState from "../../state/user";
import useTextState from "../../state/text";
import { getGameEntry } from "../../lib/game";

export interface Props {}

/**
 *
 */
const GameHeader = ({}: Props) => {
  const { user } = useUserState();
  const { setToken } = useGameState();
  const { wpm, setText } = useTextState();
  const router = useRouter();

  const token = router.query.token as string;
  useEffect(() => {
    if (!token) return;

    setToken(token);

    getGameEntry(token)
      .then((game) => {
        setText(game?.text || "error");
      })
      .catch(() => {
        setText("error");
      });
  }, [token, setToken, setText]);

  const stringWpm = wpm.toFixed(2);

  return (
    <div className="flex flex-col w-100 mb-4">
      <div className="flex">
        <div>{user?.name}</div>
        <div className="flex-grow"></div>
        <div>
          WPM: <span className="w-16 inline-block text-right">{stringWpm}</span>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
