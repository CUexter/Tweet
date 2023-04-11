import Tweet from "@/components/tweets/Tweet";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

// interface TweetPageProp {}

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const tid = typeof id === "string" ? id : "error";
  const { data: mainTweet } = api.tweet.getTweet.useQuery({ id: tid });

  if (!mainTweet) return <>It not here</>;

  const { Retweeting_to: retweets } = mainTweet;
  const replies = retweets
    ?.filter((retweet) => retweet.on_profile === false)
    ?.map((reply) => api.tweet.getTweet.useQuery({ id: reply.retweet_id }));

  return (
    <>
      {/* Main tweet */}
      <Tweet tweetData={mainTweet} />
      {/* Tweets below are tweets that reply to the main tweet */}
      {replies?.map((reply) => (
        <Tweet key={reply.data?.id} tweetData={reply.data} />
      ))}
    </>
  );
};

export default TweetPage;
