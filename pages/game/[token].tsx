import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import TypingArea from "../../components/TypingArea";
import Layout from "../../components/Layout";
import GameHeader from "../../components/GameHeader";
import Lobby from "../../components/Lobby";

export default function Game() {
  return (
    <>
      <Head>
        <title>Inheaden Touch Typing Game</title>
      </Head>
      <Layout>
        <GameHeader />
        <TypingArea />
        <Lobby />
      </Layout>
    </>
  );
}
