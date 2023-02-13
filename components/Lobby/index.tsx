import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import useUserState, { User } from "../../state/user";
import useGameState from "../../state/game";
import { RealtimeChannel } from "@supabase/supabase-js";
import useTextState from "../../state/text";
import { PlayerPositions } from "../../state/game";

export interface Props {}

interface Presence {
  online_at: string;
  user: User;
  ready: boolean;
  index: number;
  wpm: number;
  done?: boolean;
}

/**
 *
 */
const Lobby = ({}: Props) => {
  const { user } = useUserState();
  const { token, state, ready, setState, setPlayerPositions, setGameOver } =
    useGameState();
  const { currentIdx, wpm, textState } = useTextState();

  const [onlineUsers, setOnlineUsers] = useState<Presence[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel>();

  useEffect(() => {
    if (currentIdx === textState.length - 1) {
      setState("gameover");
    }
  }, [currentIdx, textState, setState]);

  useEffect(() => {
    if (!user || !token) return;

    const channel = supabase.channel(`online-users-${token}`, {
      config: {
        presence: {
          key: user?.initials,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      // console.log("Online users: ", channel.presenceState());
      setOnlineUsers(Object.values(channel.presenceState()).flat() as any[]);
    });

    // channel.on("presence", { event: "join" }, ({ newPresences }) => {
    //   console.log("New users have joined: ", newPresences);
    // });

    // channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
    //   console.log("Users have left: ", leftPresences);
    // });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        setChannel(channel);
      }
    });
  }, [user, token]);

  useEffect(() => {
    if (!channel) return;

    channel.track({
      online_at: new Date().toISOString(),
      user: user,
      ready,
      index: currentIdx,
      wpm,
    } as Presence);
  }, [channel, ready, user, currentIdx, wpm]);

  useEffect(() => {
    if (
      onlineUsers.length > 0 &&
      onlineUsers.every((presence) => presence.ready && state === "idle")
    ) {
      setState("playing");
    }

    if (
      onlineUsers.length > 0 &&
      onlineUsers.every((presence) => presence.done)
    ) {
      setGameOver(true);
    }

    setPlayerPositions(
      onlineUsers.reduce((acc, presence) => {
        if (presence.user.initials === user?.initials) return acc;

        acc[presence.index] = presence.user;
        return acc;
      }, {} as PlayerPositions)
    );
  }, [onlineUsers, setState, setPlayerPositions, state]);

  return (
    <div className="mt-2 flex justify-between items-start">
      <div className="">
        <div>
          {onlineUsers.length}{" "}
          {onlineUsers.length > 1 ? "users are" : "user is"} online:
        </div>
        <ul>
          {onlineUsers.map((presence) => (
            <li key={presence.user.initials}>
              {presence.user.name} ({presence.user.initials}){" "}
              {state === "idle"
                ? `- ${presence.ready ? "Ready" : "Not ready"}`
                : ""}
              {state === "playing"
                ? `- WPM: ${presence.wpm.toFixed(2)} - ${(
                    (presence.index / textState.length) *
                    100
                  ).toFixed(0)}% done`
                : ""}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        {typeof window !== "undefined" && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}?token=${token}`
              );
            }}
          >
            Copy lobby link
          </button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
