import { Button, TextInput } from "@mantine/core";
import { useState } from "react";

interface fieldProps {
  label: string;
  setNewName: React.Dispatch<React.SetStateAction<any>>;
  setNewTagName: React.Dispatch<React.SetStateAction<any>>;
  setNewEmail: React.Dispatch<React.SetStateAction<any>>;
  setIsInput: React.Dispatch<React.SetStateAction<any>>;
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
