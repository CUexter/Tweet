import { api } from "@/utils/api";
import {
  Button,
  Center,
  Notification,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useState } from "react";

import DeleteUser from "./DeleteUser";

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
  const [onSearch, setOnSearch] = useState(false);

  const { data: targetUser } = api.user.findUser.useQuery({
    tag_name: tagName,
  });

  console.log(targetUser);

  const noti = () => {
    <Notification title="Default notification">
      This is default notification with title and body
    </Notification>;
  };

  const handle = () => {
    if (op == "update") {
      console.log(tagName);
      // Find user in the database
    } else if (op == "delete") {
      console.log(tagName);
      console.log(onSearch);
      console.log(targetUser);
      // Find user in the database
      if (targetUser) {
        setOnSearch(true);
      } else {
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
        <DeleteUser data={targetUser} isOpen={onSearch} />
      </div>
    </>
  );
};

export default AdminOperation;
