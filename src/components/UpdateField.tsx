import { Button, TextInput, createStyles } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.red[8], 0.15)
        : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === "dark" ? 7 : 6],
  },
}));

interface fieldProps {
  label: string;
  setNewName: (a: string) => void;
  setNewTagName: (a: string) => void;
  setNewEmail: (a: string) => void;
  setIsInput: (a: boolean) => void;
}

const UpdateField = ({
  label,
  setNewName,
  setNewTagName,
  setNewEmail,
  setIsInput,
}: fieldProps) => {
  const [currentInput, setCurrentInput] = useState("");

  // To handle corresponding data change on the fields
  const handleOp = () => {
    console.log(label, currentInput);
    switch (label) {
      case "Name":
        setNewName(currentInput);
        setIsInput(false);
        break;
      case "Tag Name":
        setNewTagName(currentInput);
        setIsInput(false);
        break;
      case "Email":
        setNewEmail(currentInput);
        setIsInput(false);
        break;
    }
  };
  return (
    <>
      <TextInput
        label={label}
        onChange={(e) => setCurrentInput(e.currentTarget.value)}
      />
      <Button variant="default" fullWidth mt="md" onClick={() => handleOp()}>
        Apply
      </Button>
    </>
  );
};

export default UpdateField;
