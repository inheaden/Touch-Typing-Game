// a function that generates a random string of letters
// and numbers of a given length
export function randomString(length: number) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function getColorForString(input: string): string {
  const colorMap = {
    red: "#ff0000",
    orange: "#ffa500",
    yellow: "#ffff00",
    green: "#008000",
    blue: "#0000ff",
    purple: "#800080",
    pink: "#ffc0cb",
    black: "#000000",
    gray: "#808080",
    brown: "#a52a2a",
    maroon: "#800000",
    navy: "#000080",
    aqua: "#00ffff",
    teal: "#008080",
    lime: "#00ff00",
    silver: "#c0c0c0",
    olive: "#808000",
    fuchsia: "#ff00ff",
  } as any;

  const hash = input
    .split("")
    .reduce((hash, char) => hash + char.charCodeAt(0), 0);
  const colorIndex = hash % Object.keys(colorMap).length;
  return colorMap[Object.keys(colorMap)[colorIndex]];
}
