import type { Prisma } from "@prisma/client";

import Head from "next/head";

import Timeline from "./Timeline";

interface ListTweetProp {
  title: string;
  filter: Prisma.TweetWhereInput;
}

const ListTweet = ({ title, filter }: ListTweetProp) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="justify-center">
        <Timeline whereFilter={filter}></Timeline>
      </main>
    </>
  );
};

export default ListTweet;
