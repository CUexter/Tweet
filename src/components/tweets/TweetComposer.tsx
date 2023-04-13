import { api } from "@/utils/api";
import {
  ActionIcon,
  Button,
  Card,
  FileButton,
  Group,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { usePresignedUpload } from "next-s3-upload";

interface ComposerProp {
  original_id?: string;
}

const TweetComposer = ({ original_id: replying_to_id }: ComposerProp) => {
  const is_reply = replying_to_id === undefined ? false : true;
  const { data: sessionData } = useSession();

  const form = useForm({
    initialValues: {
      tweet_text: "",
      images: [] as string[],
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

  const { uploadToS3 } = usePresignedUpload();

  const uploadImages = async (files: File[]) => {
    const urls = await Promise.all(
      files.map(async (f) => {
        const { url } = await uploadToS3(f);
        return url;
      })
    );
    form.setValues({ images: urls });
  };

  if (!sessionData) return <></>;

  const handleSubmit = (values: typeof form.values) => {
    let send = {
      user_id: sessionData.user.id,
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
        <Group position="apart">
          <FileButton
            onChange={() => void uploadImages}
            multiple
            accept="image/png,image/jpeg"
          >
            {() => (
              <ActionIcon color="blue" size="sm">
                <IconPhoto />
              </ActionIcon>
            )}
          </FileButton>
          <Button variant="subtle" type="submit">
            Tweet
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default TweetComposer;
