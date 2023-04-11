import ListTweet from "@/components/ListTweet";

const Home = () => {
  const filter = {
    Retweeting_to: null,
  };
  return <ListTweet title="Explore" filter={filter}></ListTweet>;
};

export default Home;
