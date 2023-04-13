import { api } from "@/utils/api";
import { Avatar, Button, Paper, Text, createStyles, rem } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  data:
    | {
        id: string;
        name: string | null;
        email: string | null;
        tag_name: string | null;
        profile_picture: string | null;
      }
    | null
    | undefined;
  isOpen: boolean;
}

const DeleteUser = ({ data, isOpen }: UserCardImageProps) => {
  const { classes, theme } = useStyles();
  const [userId, setUserId] = useState("");
  const deleteMutation = api.user.deleteUser.useMutation();
  const deleteTweetMutation = api.user.deleteRelatedTweet.useMutation();

  const handleClick = async () => {
    if (window.confirm("Are you sure you want to delete?") && data != null) {
      console.log("Del target: " + data.id);
      await deleteTweetMutation
        .mutateAsync({ id: data.id })
        .catch((e) => console.log(e));
      await deleteMutation
        .mutateAsync({ id: data.id })
        .catch((e) => console.log(e));
    }
  };

  if (isOpen == false) return null;

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={data?.profile_picture} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {data?.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {data?.email} • {data?.tag_name}
      </Text>

      <Button
        variant="default"
        fullWidth
        mt="md"
        onClick={() => void handleClick()}
      >
        Delete
      </Button>
    </Paper>
  );
};

export default DeleteUser;