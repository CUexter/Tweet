import type { User } from "@prisma/client";

import { api } from "@/utils/api";
import { Avatar, Button, Center, Text } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

const Displaycard = (props: User) => {
  console.log("being_followerd_ID", props.id);

  const followingMutation = api.following.following.useMutation();
  const unFollowingMutation = api.following.unFollowing.useMutation();
  const followingQuery = api.following.checkFollowing.useQuery({
    doing_following_ID: "123", //get the current user ID
    being_followed_ID: props.id,
  });

  function handleClick() {
    if (followingQuery.data) {
      unFollowingMutation
        .mutateAsync({
          id: followingQuery.data.id,
        })
        .then(() => {
          void followingQuery.refetch();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      followingMutation
        .mutateAsync({
          doing_following_ID: "123", //get the current user ID
          being_followed_ID: props.id,
        })
        .then(() => {
          void followingQuery.refetch();
        })
        .catch(() => {
          console.log("error");
        });
    }
  }

  return (
    <>
      <Center maw={400} h={100} mx="auto">
        <h5>
          Your Followings <IconUsers style={{ display: "inline-block" }} />
        </h5>
      </Center>
      <hr></hr>

      <Center maw={400} h={100} mx="auto">
        <Avatar
          style={{ margin: "10%" }}
          radius="xl"
          size="lg"
          color="indigo"
        />
        <p style={{ display: "block" }}>{props.name}</p>
        <br />
        <Text style={{ display: "block" }} size="xs" color="dimmed">
          {props.tag_name}
        </Text>

        <Button
          style={{ margin: "20%" }}
          onClick={handleClick}
          variant="light"
          radius="lg"
        >
          {followingQuery.data ? "Following" : "Follow"}
        </Button>
      </Center>

      <hr></hr>
    </>
  );
};

export default Displaycard;
