import supabase from "./supabase";

export type GameEntry = {
  token: string;
  text: string;
  started_by: string;
  results?: {
    [key: string]: {
      wpm: number;
      accuracy: number;
      score: number;
    };
  };
};

export async function addGameEntry(value: GameEntry): Promise<void> {
  await supabase.from("game").insert([value]);
}

export async function addMyResults(
  token: string,
  result: {
    wpm: number;
    accuracy: number;
    score: number;
  },
  name: string
): Promise<void> {
  const { data, error } = await supabase
    .from("game")
    .select("*")
    .eq("token", token)
    .limit(1);

  if (error) {
    console.log(error);
    return;
  }

  if (data.length === 0) {
    return;
  }

  const game = data[0];

  if (!game.results) {
    game.results = {};
  }

  game.results[name] = result;

  await supabase.from("game").update(game).eq("token", token);
}

export async function getGameEntry(
  token: string
): Promise<GameEntry | undefined> {
  return supabase
    .from("game")
    .select("*")
    .eq("token", token)
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
        return undefined;
      }

      if (data.length === 0) {
        return undefined;
      }

      return data[0];
    });
}
