import type { Prisma } from "@prisma/client";

import { api } from "@/utils/api";
import { Stack } from "@mantine/core";

import Tweet from "./tweets/Tweet";

interface TimelineProp {
  whereFilter: Prisma.TweetWhereInput;
}

const Timeline = ({ whereFilter }: TimelineProp) => {
  const { data } = api.tweet.getLotTweets.useQuery({ filter: whereFilter });
  const tids = data || [];
  return (
    <Stack spacing="xl">
      {tids.map((tweet, index) => (
        <Tweet key={index} tweetID={tweet.id} />
      ))}
    </Stack>
  );
};

export default Timeline;
