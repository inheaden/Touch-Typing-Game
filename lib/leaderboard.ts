import supabase from "./supabase";

export type LeaderBoardEntry = {
  id: string;
  player_name: string;
  score: number;
  wpm: number;
  accuracy: number;
};

export async function getPositionInLeaderBoard(score: number): Promise<number> {
  const { count } = await supabase
    .from("leaderboard")
    .select("*", { count: "exact" })
    .gt("score", score);

  return (count || 0) + 1;
}

export async function getLeaderBoard(): Promise<LeaderBoardEntry[]> {
  return supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .limit(10)
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
        return [];
      }

      return data;
    });
}

export async function addToLeaderBoard(
  value: Omit<LeaderBoardEntry, "id">
): Promise<void> {
  await supabase.from("leaderboard").insert([value]);
}
