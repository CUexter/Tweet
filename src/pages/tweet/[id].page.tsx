import Tweet from "@/components/tweets/Tweet";
import { api } from "@/utils/api";
import { Text } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";

// interface TweetPageProp {}

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const tid = typeof id === "string" ? id : "error";
  if (tid === "error") return <>you shouldnt be here</>;
  const { data: mainTweet } = api.tweet.getTweet.useQuery({ id: tid });

  if (!mainTweet) return <>No tweet here</>;

  const { replied_by: replies } = mainTweet;
  const replies_id = replies.map((reply) => reply.id);

  return (
    <>
      <Head>
        <title>
          {mainTweet.user.display_name}: &quot;
          {mainTweet.TweetText[0]?.tweet_text}&quot;
        </title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto w-3/4 h-screen">
        {/* Main tweet */}
        <Tweet tweetID={tid} />
        <Text className="mx-auto w-3/4 my-4 px-1"> Replies: </Text>
        {replies_id.map((id) => (
          <Tweet key={id} tweetID={id} />
        ))}
      </div>
    </>
  );
};

export default TweetPage;
