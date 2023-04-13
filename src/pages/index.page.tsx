import ListTweet from "@/components/ListTweet";
import { api } from "@/utils/api";
import { Tabs } from "@mantine/core";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: sessionData } = useSession();
  const filterAll = {
    original_tweet: null,
  };
  if (!sessionData) {
    return <ListTweet title="Explore" filter={filterAll}></ListTweet>;
  }
  const { data: userFollowing } = api.user.getFollowing.useQuery({
    id: sessionData.user.id,
  });
  const filterFollowing = {
    user_id: {
      in: userFollowing?.map((following) => following.being_followed_ID),
    },
  };

  return (
    <>
      <Tabs defaultValue="following">
        <Tabs.List position="center">
          <Tabs.Tab value="following">Following</Tabs.Tab>
          <Tabs.Tab value="all">All</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="following" pt="xs">
          <ListTweet title="Following" filter={filterFollowing}></ListTweet>
        </Tabs.Panel>
        <Tabs.Panel value="all" pt="xs">
          <ListTweet title="Explore" filter={filterAll}></ListTweet>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Home;
