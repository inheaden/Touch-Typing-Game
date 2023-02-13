import { useRouter } from "next/router";
import React from "react";
import { randomString, getColorForString } from "../../lib/helper";
import useUserState from "../../state/user";
import useTextState from "../../state/text";
import { getRandomText } from "../../lib/text";
import { addGameEntry, getGameEntry } from "../../lib/game";

export interface Props {}

/**
 *
 */
const Start = ({}: Props) => {
  const { user, setUser } = useUserState();
  const { setText } = useTextState();
  const router = useRouter();

  const routerToken = router.query.token as string;
  const token = routerToken || randomString(10);

  return (
    <div className="flex flex-col gap-4 items-center w-screen max-w-lg">
      <h1 className="text-2xl mb-4">Touch Typing Game</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={user?.name || ""}
        className="border-2 border-white p-2 text-black rounded w-full text-center"
        onChange={(e) => {
          const value = e.target.value;

          if (!value) {
            setUser(null);
            return;
          }

          const initials = value.includes(" ")
            ? value
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
            : value.slice(0, 2).toUpperCase();

          setUser({
            name: value,
            initials,
            color: getColorForString(initials),
          });
        }}
      />
      <button
        className="bg-orange p-2 rounded w-full"
        style={{
          backgroundColor: user?.color,
        }}
        onClick={async () => {
          if (!user?.name) {
            return;
          }

          if (!routerToken) {
            const game = {
              token,
              text: getRandomText(),
              started_by: user.name,
            };

            await addGameEntry(game);
            setText(game.text);
          }

          router.push(`/game/${token}`);
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Start;
