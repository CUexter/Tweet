import {
  Avatar,
  Button,
  Card,
  Group,
  Text,
  createStyles,
  rem,
} from "@mantine/core";

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
  data: {
    image: string;
    avatar: string;
    name: string;
    job: string;
  };
  isOpen: boolean;
}

const DeleteUser = ({ data, isOpen }: UserCardImageProps) => {
  const { classes, theme } = useStyles();

  if (isOpen == false) return null;
  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        sx={{ backgroundImage: `url(${data.image})`, height: 140 }}
      />
      <Avatar
        src={data.avatar}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {data.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {data.job}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        <div key={data.name}>
          <Text ta="center" fz="lg" fw={500}>
            {data.name}
          </Text>
          <Text ta="center" fz="sm" c="dimmed">
            {data.job}
          </Text>
        </div>
      </Group>
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
