import type { Prisma } from "@prisma/client";

import Timeline from "@/components/Timeline";
import { Container, Grid } from "@mantine/core";
import Head from "next/head";

interface HomeProp {
  title: string;
  filter: Prisma.TweetWhereInput;
}

const Home = ({ title, filter }: HomeProp) => {
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

export default Home;

export function getStaticProps() {
  const filter = {
    Retweeting_to: null,
  };
  return {
    props: { title: "Explore", filter: filter }, // will be passed to the page component as props
  };
}
