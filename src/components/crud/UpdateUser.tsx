import { api } from "@/utils/api";
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";

import UpdateField from "./UpdateField";
import UpdatePw from "./UpdatePw";

interface UsersProps {
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
const UpdateUser = ({ data, isOpen }: UsersProps) => {
  const [isUpdatePw, setIsUpdatePw] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [fieldLabel, setFieldLabel] = useState("");
  const [newName, setNewName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const updateNameMutation = api.user.updateName.useMutation();
  const updateTagNameMutation = api.user.updateTagName.useMutation();
  const updateEmailMutation = api.user.updateEmail.useMutation();
  //const updatePasswordMutation = api.user.updatePassword.useMutation();

  // handler for setting the correct label for the modal
  const handleOp = (op: string) => {
    switch (op) {
      case "Name":
        setIsInput(true);
        setFieldLabel("Name");
        break;
      case "Tag":
        setIsInput(true);
        setFieldLabel("Tag Name");
        break;
      case "Email":
        setIsInput(true);
        setFieldLabel("Email");
        break;
    }
  };

  const { data: targetTag } = api.user.findUser.useQuery(
    { tag_name: newTagName },
    {
      enabled: newTagName != "",
    }
  );

  const { data: targetEmail } = api.user.findEmail.useQuery(
    {
      email: newEmail,
    },
    {
      enabled: newEmail != "",
    }
  );

  // Handle data updates
  const handleSubmit = async () => {
    // Check each state to see if it requires updating
    // Have to check for unique fields first
    if (
      window.confirm("Are you sure to submit?") &&
      (data != null || data != undefined)
    ) {
      if (newName != "") {
        if (newName == data.display_name) {
          notifications.show({
            title: "Failed",
            message: "You can't use the original name. Please choose another.",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Success",
            message: "The name has been updated. Refreshing...",
            color: "blue",
          });
          await updateNameMutation.mutateAsync({
            id: data.id,
            name: newName,
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      }
      if (newTagName != "") {
        // Check if the new tag name already exists
        if (targetTag == null) {
          await updateTagNameMutation.mutateAsync({
            id: data.id,
            tag_name: newTagName,
          });
          notifications.show({
            title: "Success",
            message: "The tag name has been updated. Refreshing...",
            color: "blue",
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else if (newTagName == data.tag_name) {
          notifications.show({
            title: "Failed",
            message:
              "You can't use the original tag name. Please choose another.",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Failed",
            message:
              "The selected tag name is already in use. Please choose another.",
            color: "red",
          });
        }
      }
      if (newEmail != "") {
        // Check if the new email already exists
        if (targetEmail == null) {
          await updateEmailMutation.mutateAsync({
            id: data.id,
            email: newEmail,
          });
          notifications.show({
            title: "Success",
            message: "The email has been updated. Refreshing...",
            color: "blue",
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else if (newEmail == data.email) {
          notifications.show({
            title: "Failed",
            message: "You can't use the original email. Please choose another.",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Failed",
            message:
              "The selected email is already in use. Please choose another.",
            color: "red",
          });
        }
      }
      if (newName == "" && newTagName == "" && newEmail == "") {
        notifications.show({
          title: "Failed",
          message: "No input is received.",
          color: "red",
        });
      }
    }
  };

  const rows = (
    <>
      <tr>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              Name
            </Text>
          </Group>
        </td>

        <td>
          <Text size="sm" color="blue">
            {data?.display_name}
          </Text>
        </td>
        <td>
          <Text fz="700" color="red">
            {newName}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            {/* Implement action here*/}
            <ActionIcon>
              <IconPencil
                size="1rem"
                stroke={1.5}
                onClick={() => handleOp("Name")}
              />
            </ActionIcon>
          </Group>
        </td>
      </tr>

      <tr>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              Tag Name
            </Text>
          </Group>
        </td>

        <td>
          <Text color="blue">{data?.tag_name}</Text>
        </td>
        <td>
          <Text fz="700" color="red">
            {newTagName}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            {/* Implement action here*/}
            <ActionIcon>
              <IconPencil
                size="1rem"
                stroke={1.5}
                onClick={() => handleOp("Tag")}
              />
            </ActionIcon>
          </Group>
        </td>
      </tr>
      <tr>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              Email
            </Text>
          </Group>
        </td>

        <td>
          <Text color="blue">{data?.email}</Text>
        </td>
        <td>
          <Text fz="700" color="red">
            {newEmail}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            {/* Implement action here*/}
            <ActionIcon>
              <IconPencil
                size="1rem"
                stroke={1.5}
                onClick={() => handleOp("Email")}
              />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
  if (isOpen == false) return null;
  return (
    <>
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
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
            <thead>
              <tr>
                <th></th>
                <th>Original</th>
                <th>Change to</th>
                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <Button
          variant="default"
          fullWidth
          mt="md"
          onClick={() => setIsUpdatePw(true)}
        >
          Update Password
        </Button>
        <Button
          variant="default"
          fullWidth
          mt="md"
          onClick={() => void handleSubmit()}
        >
          Save changes
        </Button>
      </Paper>
      <Modal
        opened={isUpdatePw}
        onClose={() => setIsUpdatePw(false)}
        title="Update Password"
        size="30%"
        centered
      >
        <UpdatePw id={data?.id} />
      </Modal>
      <Modal
        opened={isInput}
        onClose={() => setIsInput(false)}
        title="Update"
        size="30%"
        centered
      >
        <UpdateField
          label={fieldLabel}
          setNewName={setNewName}
          setNewTagName={setNewTagName}
          setNewEmail={setNewEmail}
          setIsInput={setIsInput}
        />
      </Modal>
    </>
  );
};

export default UpdateUser;
