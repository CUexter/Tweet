import { Button, Center, TextInput, createStyles } from "@mantine/core";
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
  const [delData, setDelData] = useState({
    image: "",
    avatar: "",
    name: "",
    job: "",
  });

  const handle = () => {
    if (op == "update") {
      console.log(tagName);
      // Find user in the database
    } else if (op == "delete") {
      console.log(tagName);
      console.log(onSearch);
      // Find user in the database
      setDelData({ image: "H", avatar: "H", name: "ABC", job: "JOB" });
      setOnSearch(true);
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
        <DeleteUser data={delData} isOpen={onSearch} />
      </div>
    </>
  );
};

export default AdminOperation;
