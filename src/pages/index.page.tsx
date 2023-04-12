import ListTweet from "@/components/ListTweet";

const Home = () => {
  const filter = {
    original_tweet: null,
  };
  return <ListTweet title="Explore" filter={filter}></ListTweet>;
};

export default Home;
