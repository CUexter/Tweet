import type { TweetData } from "@/types/tweet";

import { Card } from "@mantine/core";

interface TweetProp {
  tweetData?: TweetData;
}
const Tweet = ({ tweetData }: TweetProp) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {tweetData?.user.display_name}: {tweetData?.TweetText[0]?.tweet_text}
    </Card>
  );
};

export default Tweet;
