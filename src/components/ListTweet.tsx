import type { Prisma } from "@prisma/client";

import { Container, Grid } from "@mantine/core";
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
        <Container>
          <Grid>
            <Timeline whereFilter={filter}></Timeline>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default ListTweet;
