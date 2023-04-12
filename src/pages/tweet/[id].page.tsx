import Tweet from "@/components/tweets/Tweet";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

// interface TweetPageProp {}

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const tid = typeof id === "string" ? id : "error";
  if (tid === "error") return <>you shouldnt be here</>;
  const { data: mainTweet } = api.tweet.getTweet.useQuery({ id: tid });

  if (!mainTweet) return <>It not here</>;

  const { Retweeted_by: retweets } = mainTweet;
  const replies = retweets?.map((retweet) => retweet.retweet_id);

  return (
    <>
      <div className="mx-auto w-1/3 border h-screen">
        {/* Main tweet */}
        <Tweet tweetID={tid} />
        {/* Tweets below are tweets that reply to the main tweet */}
        {replies?.map((replyID) => (
          <Tweet key={replyID} tweetID={replyID} />
        ))}
      </div>
    </>
  );
};

export default TweetPage;
