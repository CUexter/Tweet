import { Avatar, Button, Card, Text, createStyles, rem } from "@mantine/core";

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

  if (isOpen == false) return null;
  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section />
      <Avatar
        src={data?.profile_picture}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {data?.tag_name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {data?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {data?.email}
      </Text>
      <Button
        variant="outline"
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
      >
        Delete
      </Button>
    </Card>
  );
};

export default DeleteUser;
