import type { Prisma } from "@prisma/client";

import { Card } from "@mantine/core";
import { useSession } from "next-auth/react";
import Head from "next/head";

import Timeline from "./Timeline";
import TweetComposer from "./tweets/TweetComposer";

interface ListTweetProp {
  title: string;
  filter: Prisma.TweetWhereInput;
}

const ListTweet = ({ title, filter }: ListTweetProp) => {
  const { data } = useSession();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="justify-center">
        {data?.user && (
          <Card m={"4em"}>
            <TweetComposer />
          </Card>
        )}
        <Timeline whereFilter={filter}></Timeline>
      </main>
    </>
  );
};

export default ListTweet;
