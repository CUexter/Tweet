import { Box, Button, Center, PasswordInput, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";

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

const UpdatePw = () => {
  const [value, setValue] = useInputState("");
  const handleSubmit = () => {
    const saltRounds = 10;
    //const hashedPassword = await bcrypt.hash(value, saltRounds);
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
        label="Has at least 6 characters"
        meets={value.length > 5}
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
