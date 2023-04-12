import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Register from "./register";

const SignUpButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Joining us ?" centered>
        <Register />
      </Modal>

      <Button compact onClick={open}>
        Sign up
      </Button>
    </>
  );
};

export default SignUpButton;
