import { api } from "@/utils/api";
import { Avatar, Button, Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";

// Data received containing the info of the target user
interface UserCardImageProps {
  data:
    | {
        id: string;
        display_name: string | null;
        email: string | null;
        tag_name: string | null;
        image: string | null;
      }
    | null
    | undefined;
  isOpen: boolean;
}

const DeleteUser = ({ data, isOpen }: UserCardImageProps) => {
  // Mutation for sending a delete request to the server
  const deleteMutation = api.user.deleteUser.useMutation();
  const deleteTweetMutation = api.user.deleteRelatedTweet.useMutation();
  const deleteUserSessionMutation = api.user.deleteUserSession.useMutation();

  // Receive the current session data
  const { data: sessionData } = useSession();

  // Event triggered when the delete button is clicked
  const handleClick = async () => {
    if (window.confirm("Are you sure you want to delete?") && data != null) {
      // Check if the current user is deleting his/her account
      if (data.id != sessionData?.user.id) {
        console.log("Del target: " + data.id);
        await deleteTweetMutation
          .mutateAsync({ id: data.id })
          .catch((e) => console.log(e));
        await deleteUserSessionMutation
          .mutateAsync({ id: data.id })
          .catch((e) => console.log(e));
        await deleteMutation
          .mutateAsync({ id: data.id })
          .catch((e) => console.log(e));
        notifications.show({
          title: "Success",
          message: "This use has been deleted successfully. Refreshing...",
          color: "blue",
        });
        // 2 seconds before refreshing the page
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
      else {
        notifications.show({
          title: "Fail",
          message: "You cannot delete yourself!",
          color: "red",
        });
      }
    }
  };

  // Do not render if this modal is not visible
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
      <Avatar src={data?.image} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {data?.display_name}
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
