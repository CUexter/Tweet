import { api } from "@/utils/api";
import { Button, Card, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";

interface ComposerProp {
  original_id?: string;
}

const TweetComposer = ({ original_id: replying_to_id }: ComposerProp) => {
  const is_reply = replying_to_id === undefined ? false : true;
  const { data: sessionData } = useSession();

  const form = useForm({
    initialValues: {
      tweet_text: "",
    },
    validate: {
      tweet_text: (value) =>
        value.length > 0 ? null : "Tweet cannot be empty",
    },
  });
  const utils = api.useContext();
  const postTweet = api.tweet.createTweet.useMutation({
    onSuccess: () => {
      void utils.tweet.getLotTweets.invalidate();
    },
  });

  if (!sessionData) return <></>;

  const handleSubmit = (values: typeof form.values) => {
    let send = {
      user_id: sessionData?.user.id,
      is_public: true,
      TweetText: {
        tweet_text: values.tweet_text,
      },
    };
    send = is_reply ? { ...send, ...{ original_id: replying_to_id } } : send;
    try {
      postTweet.mutate(send);
      notifications.show({
        message: "Tweet posted",
        title: "Success",
        color: "blue",
      });
      form.reset();
    } catch (error) {
      notifications.show({
        message: "Tweet must have text",
        title: "Error",
        color: "red",
      });
      console.error("Error:", error);
    }
  };

  return (
    <Card className="pt-2">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          variant="unstyled"
          placeholder="What's happening?"
          label="Tweet"
          {...form.getInputProps("tweet_text")}
        />
        <div className="flex justify-end">
          <Button variant="subtle" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TweetComposer;
