import { api } from "@/utils/api";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Button,
  Card,
  FileButton,
  Group,
  Image,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCircleX, IconPhoto } from "@tabler/icons-react";
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
      tweet_text: (value, values) =>
        value.length > 0 || values.images.length > 0
          ? null
          : "Tweet cannot be empty",
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
    const originalUrls = form.values.images;
    form.setValues({ images: originalUrls.concat(urls) });
  };

  if (!sessionData) return <></>;

  const handleSubmit = (values: typeof form.values) => {
    let send = {
      user_id: sessionData.user.id,
      is_public: true,
      TweetText: {
        tweet_text: values.tweet_text,
      },
      images: values.images,
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
            onChange={(files) => {
              if (files) {
                void uploadImages(files);
              }
            }}
            multiple
          >
            {(props) => (
              <ActionIcon color="blue" size="sm" {...props}>
                <IconPhoto />
              </ActionIcon>
            )}
          </FileButton>
          <Button variant="subtle" type="submit">
            Tweet
          </Button>
        </Group>
      </form>
      {form.values.images.length > 0 && (
        <Card.Section>
          <Carousel align="start" slideGap="xl" slideSize="33.333%">
            {form.values.images.map((image, i) => (
              <Carousel.Slide key={i}>
                <div className="relative">
                  <Image alt="images" src={image} />
                  <ActionIcon
                    color="red"
                    variant="outline"
                    className="absolute top-2 z-40 right-2"
                    radius="xl"
                    onClick={() => {
                      const urls = form.values.images;
                      urls.splice(i, 1);
                      form.setValues({ images: urls });
                    }}
                  >
                    <IconCircleX />
                  </ActionIcon>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>
      )}
    </Card>
  );
};

export default TweetComposer;
