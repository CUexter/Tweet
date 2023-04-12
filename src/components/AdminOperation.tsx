import { api } from "@/utils/api";
import { Button, Center, TextInput, createStyles } from "@mantine/core";
import { useState } from "react";

import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: 10,
  },
}));

interface AdminProps {
  op: string;
}

const AdminOperation = ({ op }: AdminProps) => {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const [tagName, setTagName] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);

  const { data: targetUser } = api.user.findUser.useQuery({
    tag_name: tagName,
  });

  console.log(targetUser);

  const handle = () => {
    if (op == "update") {
      console.log(tagName);
      // Find user in the database
      if (targetUser) {
        setOnUpdate(true);
      } else {
      }
    } else if (op == "delete") {
      console.log(tagName);
      console.log(targetUser);
      // Find user in the database
      if (targetUser) {
        setOnDelete(true);
      }
    }
  };

  return (
    <>
      <div>
        <TextInput
          placeholder="Input the target user's tag name"
          classNames={classes}
          onChange={(e) => setTagName(e.currentTarget.value)}
          type="text"
        />
      </div>
      <div style={{ paddingTop: 10 }}>
        <Center>
          <Button
            variant="outline"
            className="content-center"
            style={{ paddingTop: 10, paddingBottom: 10 }}
            onClick={() => handle()}
          >
            {" "}
            Search{" "}
          </Button>
        </Center>
      </div>
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <DeleteUser data={targetUser} isOpen={onDelete} />
        <UpdateUser data={targetUser} isOpen={onUpdate} />
      </div>
    </>
  );
};

export default AdminOperation;
