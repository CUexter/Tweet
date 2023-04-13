import type { User } from "@prisma/client";

import { api } from "@/utils/api";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import Head from "next/head";
import { useState } from "react";

import Timeline from "./Timeline";

const UserProfile = ({ id }: Pick<User, "id">) => {
  const { data: userInfo } = api.user.getUserInfo.useQuery({ id });
  const utils = api.useContext();
  const checkFollow = api.follow.isFollowing.useQuery({ followee_id: id });
  const [isFollowed, setIsFollowed] = useState(
    checkFollow.data !== null ? true : false
  );
  const follow = api.follow.handleFollow.useMutation({
    onSuccess: () => {
      void utils.user.getUserInfo.invalidate();
      void utils.follow.isFollowing.invalidate();
      setIsFollowed((prev) => !prev);
    },
  });
  const theirTweetFilter = {
    original_tweet: null,
    user_id: id,
  };
  const handleFollow = () => {
    follow.mutate({ followee_id: id });
  };

  return (
    <>
      <Head>
        <title>{userInfo?.display_name}</title>
      </Head>
      <Center>
        <Card>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="UserProfile"
              height="20em"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Group>
              <Avatar src={userInfo?.image} color="yellow" />
              <Text weight={500}>{userInfo?.display_name}</Text>
            </Group>
            {userInfo?.is_admin && (
              <Badge color="pink" variant="light">
                is Admin
              </Badge>
            )}
          </Group>

          <Text size="sm" color="dimmed">
            {userInfo?.profile_desc}
          </Text>

          <Group mt="md" position="center" spacing={30}>
            <div>
              <Text ta="center" fz="lg" fw={500}>
                Followers
              </Text>
              <Text ta="center" fz="sm" c="dimmed">
                {userInfo?._count.being_followed}
              </Text>
            </div>

            <div>
              <Text ta="center" fz="lg" fw={500}>
                Following
              </Text>
              <Text ta="center" fz="sm" c="dimmed">
                {userInfo?._count.following}
              </Text>
            </div>

            <div>
              <Text ta="center" fz="lg" fw={500}>
                Tweets
              </Text>
              <Text ta="center" fz="sm" c="dimmed">
                {userInfo?._count.Tweet}
              </Text>
            </div>
          </Group>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={handleFollow}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
          <Title order={3}>Their tweet:</Title>
          <Card>
            <Timeline whereFilter={theirTweetFilter}></Timeline>
          </Card>
        </Card>
      </Center>
    </>
  );
};

export default UserProfile;
