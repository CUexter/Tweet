import { api } from "@/utils/api";
import { Button, Center, TextInput, createStyles } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

const useStyles = createStyles(() => ({
  root: {
    position: "relative",
  },

  input: {
    height: 10,
  },
}));

// Operation being called (update or delete)
interface AdminProps {
  op: string;
}

const SearchField = ({ op }: AdminProps) => {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const [tagName, setTagName] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);

  const { data: targetUser } = api.user.findUser.useQuery({
    tag_name: tagName,
  });

  console.log(targetUser);

  // Event triggered when the search button is clicked
  const handle = () => {
    if (op == "update") {
      console.log(tagName);
      // Find user in the database
      if (targetUser) {
        // if targetUser is found, set the update state to be true to allow the update modal to be visible
        setOnUpdate(true);
      } else {
        notifications.show({
          title: "Failed",
          message: "Cannot find this user, please try again.",
          color: "red",
        });
      }
    } else if (op == "delete") {
      console.log(tagName);
      console.log(targetUser);
      // Find user in the database
      if (targetUser) {
        // if targetUser is found, set the delete state to be true to allow the delete modal to be visible
        setOnDelete(true);
      } else {
        notifications.show({
          title: "Failed",
          message: "Cannot find this user, please try again.",
          color: "red",
        });
      }
    }
  };

  return (
    <>
      <Center>
        <div className={"w-1/2"}>
          <TextInput
            placeholder="Input the target user's tag name"
            classNames={classes}
            onChange={(e) => setTagName(e.currentTarget.value)}
            type="text"
          />
        </div>
      </Center>
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

export default SearchField;
