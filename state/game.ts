import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "./user";

export type State = "idle" | "playing" | "paused" | "gameover";

export type PlayerPositions = {
  [index: number]: User;
};

interface GameState {
  state: State;
  ready: boolean;
  token: string | null;
  playerPositions: PlayerPositions;
  gameOver: boolean;

  setState: (state: State) => void;

  setToken: (token: string | null) => void;
  setReady: (ready: boolean) => void;
  setGameOver: (gameOver: boolean) => void;

  setPlayerPositions: (playerPositions: PlayerPositions) => void;
  resetGame: () => void;
}

const useGameState = create<GameState>()(
  devtools((set) => ({
    state: "idle" as State,
    ready: false,
    gameOver: false,

    token: null as string | null,
    playerPositions: [],

    setState: (state: State) => set({ state }),

    setToken: (token: string | null) => set({ token }),
    setReady: (ready: boolean) => set({ ready }),
    setGameOver: (gameOver: boolean) => set({ gameOver }),

    setPlayerPositions: (playerPositions: PlayerPositions) =>
      set({ playerPositions }),

    resetGame: () => set({ state: "idle", ready: false, token: null }),
  }))
);

export default useGameState;
