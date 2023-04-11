import { api } from "@/utils/api";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";

const Reply = () => {
  const [value, setValue] = useState("");
  const replyMutation = api.reply.reply.useMutation();

  function handleClick() {
    console.log(value);

    replyMutation.mutateAsync({ tweet_text: value }).catch((e) => {
      console.log(e);
    });
    setValue(""); //clear input text
    //send value to the database? stored the value as tweet text
  }
  return (
    <div>
      <TextInput
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Tweet Your Reply"
        radius="lg"
        size="md"
        rightSection={
          <Button onClick={handleClick} variant="light" radius="lg">
            Reply
          </Button>
        }
        rightSectionWidth={100}
      />
    </div>
  );
};

export default Reply;
