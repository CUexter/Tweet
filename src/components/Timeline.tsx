import type { TweetData } from "@/types/tweet";

import { Stack } from "@mantine/core";

import Tweet from "./tweets/Tweet";

interface TimelineProp {
  tweetData: TweetData[];
  hashtag?: string;
  people?: string;
}

const Timeline = ({ tweetData }: TimelineProp) => {
  return (
    <Stack spacing="xl">
      {tweetData.map((tweet, index) => (
        <Tweet key={index} tweetID={tweet.id} />
      ))}
    </Stack>
  );
};

export default Timeline;
