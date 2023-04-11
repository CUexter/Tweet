import type { TweetData } from "@/types/tweet";

import { api } from "@/utils/api";
import { Card } from "@mantine/core";

interface TweetProp {
  tweetID: string;
  tweetData?: TweetData;
}
const Tweet = ({ tweetID, tweetData }: TweetProp) => {
  // if they didn't pass in any tweetData, get it
  ({ data: tweetData } = api.tweet.getTweet.useQuery(
    { id: tweetID },
    { enabled: tweetData === undefined }
  ));
  // if the data is null, could be private or doesn't exist (private tweet is an advanced feature and this doesnt work so i'll work on it later)
  // ({ data: tweetData } = api.tweet.getPrivateTweet.useQuery(
  //   { id: tweetID },
  //   { enabled: false }
  // ));
  // if null after private query, it doesn't exist
  if (!tweetData) {
    return <>It not here</>;
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {tweetData?.user.display_name}: {tweetData?.TweetText[0]?.tweet_text}
    </Card>
  );
};

export default Tweet;
