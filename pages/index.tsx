import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Game from "../components/TypingArea";
import Start from "../components/Start/index";
import Layout from "../components/Layout";
import LeaderBoard from "../components/Leaderboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Inheaden Touch Typing Game</title>
      </Head>
      <Layout>
        <Start />
        <LeaderBoard />
      </Layout>
    </>
  );
}
