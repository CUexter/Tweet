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
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";

import UpdateField from "./UpdateField";
import UpdatePw from "./UpdatePw";

interface UsersProps {
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

  // Handle data updates
  const handleSubmit = () => {
    // Check each state to see if it requires updating
    // Have to check for unique fields first
    if (data != null || data != undefined) {
      if (newName != "") {
        updateNameMutation
          .mutateAsync({ id: data.id, name: newName })
          .catch((e) => console.log(e));
      }
      if (newTagName != "") {
        updateTagNameMutation
          .mutateAsync({ id: data.id, tag_name: newTagName })
          .catch((e) => console.log(e));
      }
      if (newEmail != "") {
        updateEmailMutation
          .mutateAsync({ id: data.id, email: newEmail })
          .catch((e) => console.log(e));
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
            {data?.name}
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
        <Avatar src={data?.profile_picture} size={120} radius={120} mx="auto" />
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
          onClick={() => handleSubmit()}
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
        <UpdatePw />
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
