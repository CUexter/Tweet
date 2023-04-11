import ListTweet from "@/components/ListTweet";
import { useRouter } from "next/router";

const Home = () => {
  const filter = {
    Retweeting_to: null,
  };

  const router = useRouter();
  return <ListTweet title="Following" filter={filter}></ListTweet>;
};

export default Home;
