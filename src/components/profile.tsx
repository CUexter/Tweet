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

import Timeline from "./Timeline";

const UserProfile = ({ id }: Pick<User, "id">) => {
  const { data: userInfo } = api.user.getUserInfo.useQuery({ id });
  const utils = api.useContext();
  const checkFollow = api.follow.isFollowing.useQuery({ followee_id: id });
  const follow = api.follow.handleFollow.useMutation({
    onSuccess: () => {
      void utils.user.getUserInfo.invalidate();
      void utils.follow.isFollowing.invalidate();
    },
  });
  const theirTweetFilter = {
    OR: [
      {
        original_tweet: null,
        user_id: id,
      },
      {
        retweeted_by: {
          some: {
            id: id,
          },
        },
      },
    ],
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
        <Card className="w-4/5">
          <Card.Section>
            <Image
              src={userInfo?.profile_picture}
              alt="UserProfile"
              height="20em"
              withPlaceholder
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
            type="button"
          >
            {checkFollow.data !== null ? "Unfollow" : "Follow"}
          </Button>
          <Title order={3}>Their tweet:</Title>
          <Card>
            <Timeline whereFilter={theirTweetFilter} />
          </Card>
        </Card>
      </Center>
    </>
  );
};

export default UserProfile;
