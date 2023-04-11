import type { TweetData } from "@/types/tweet";

import Timeline from "@/components/Timeline";
import { prisma } from "@/server/db";
import { Container, Grid } from "@mantine/core";
import Head from "next/head";

interface HomeProp {
  tweetData: TweetData[];
  people: unknown;
  hashtag: unknown;
}

const Home = ({ tweetData }: HomeProp) => {
  return (
    <>
      <Head>
        <title>Tweet - Timeline</title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="justify-center">
        <Container>
          <Grid>
            <Timeline tweetData={tweetData}></Timeline>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const tweets: TweetData[] = await prisma.tweet.findMany({
    include: {
      TweetText: true,
      Retweeting_to: true,
      Retweeted_by: true,
      TweetAttachments: true,
      Likes: true,
      Polls: true,
      user: {
        select: {
          id: true,
          tag_name: true,
          image: true,
          display_name: true,
        },
      },
    },
    take: 10,
  });

  const tweetData = JSON.parse(
    JSON.stringify(tweets)
  ) as unknown as TweetData[];

  const props: HomeProp = {
    tweetData,
    hashtag: {},
    people: {},
  };
  return { props };
}
