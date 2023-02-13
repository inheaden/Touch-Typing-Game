import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CharacterState = "none" | "correct" | "incorrect";

export type TextState = {
  character: string;
  state: CharacterState;
};

export type LastTextState = {
  index: number;
  date: number;
};

interface GameTextState {
  textState: TextState[];
  currentCharacter: string;
  currentIdx: number;
  wpm: number;
  lastTextState?: LastTextState;
  text?: string;

  setText: (text: string) => void;
  nextCharacter: (characterState: CharacterState) => void;
  previousCharacter: () => void;
  setWPM: (wpm: number) => void;
  setLastTextState: (lastTextState: LastTextState) => void;
  resetText: () => void;
}

const useTextState = create<GameTextState>()(
  devtools((set) => ({
    textState: [] as TextState[],
    currentCharacter: "",
    currentIdx: 0,
    wpm: 0,

    setText: (text: string) => {
      set((state) => ({
        ...state,
        textState: text.split("").map((character) => ({
          character,
          state: "none",
        })),
        currentCharacter: text[0],
        currentIdx: 0,
        text,
      }));
    },

    nextCharacter: (characterState: CharacterState) => {
      set((state) => {
        if (state.currentIdx >= state.textState.length - 1) {
          return state;
        }

        return {
          ...state,
          textState: [
            ...state.textState.slice(0, state.currentIdx),
            {
              ...state.textState[state.currentIdx],
              state: characterState,
            },
            ...state.textState.slice(state.currentIdx + 1),
          ],
          currentIdx: state.currentIdx + 1,
          currentCharacter: state.textState[state.currentIdx + 1].character,
        };
      });
    },

    previousCharacter: () => {
      set((state) => {
        if (state.currentIdx === 0) {
          return state;
        }

        return {
          ...state,
          currentIdx: state.currentIdx - 1,
          currentCharacter: state.textState[state.currentIdx - 1].character,
          textState: [
            ...state.textState.slice(0, state.currentIdx - 1),
            {
              ...state.textState[state.currentIdx - 1],
              state: "none",
            },
            ...state.textState.slice(state.currentIdx),
          ],
        };
      });
    },

    setWPM: (wpm: number) => set({ wpm }),
    setLastTextState: (lastTextState: LastTextState) => set({ lastTextState }),

    resetText: () => {
      set({ textState: [] as TextState[] });
    },
  }))
);

export default useTextState;
