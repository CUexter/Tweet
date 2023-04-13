import { Button, Modal, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Register from "./register";

const SignUpButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <Modal opened={opened} onClose={close} title="Joining us ?" centered>
        <Register />
      </Modal>

      <Button
        compact
        variant={colorScheme === "dark" ? "light" : "outline"}
        onClick={open}
      >
        Sign up
      </Button>
    </>
  );
};

export default SignUpButton;
