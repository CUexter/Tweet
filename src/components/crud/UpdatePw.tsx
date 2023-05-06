import { api } from "@/utils/api";
import { Box, Button, Center, PasswordInput, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import bcrypt from "bcryptjs";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

// Pros to store the target user's id
interface pwProps {
  id: string | null | undefined;
}

const UpdatePw = ({ id }: pwProps) => {
  const [value, setValue] = useInputState("");
  const updatePwMutation = api.user.updatePassword.useMutation();

  // Event triggered when the update button is clicked
  const handleSubmit = async () => {
    if (id != null && id != undefined && value.length > 7) {
      const saltRounds = bcrypt.genSaltSync(10);
      // hash the password before sending the request
      const hashedPassword = bcrypt.hashSync(value, saltRounds);
      await updatePwMutation.mutateAsync({
        id: id,
        password: hashedPassword,
      });
      notifications.show({
        title: "Success",
        message: "The password has been updated. Refreshing...",
        color: "blue",
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      notifications.show({
        title: "Failed",
        message:
          "The new password must fullfil the requirement. Please try again.",
        color: "red",
      });
    }
  };
  return (
    <div>
      <PasswordInput
        value={value}
        onChange={setValue}
        placeholder="Your password"
        label="Password"
        required
      />

      <PasswordRequirement
        label="Has at least 8 characters"
        meets={value.length > 7}
      />

      <Button
        variant="default"
        fullWidth
        mt="md"
        onClick={() => void handleSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default UpdatePw;
