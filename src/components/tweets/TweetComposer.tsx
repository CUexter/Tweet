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
import { useRouter } from "next/router";

// Prop for type checking
interface ComposerProp {
  original_id?: string;
  close?: () => void;
  redirect?: boolean;
}

const TweetComposer = ({
  original_id: replying_to_id,
  close,
  redirect,
}: ComposerProp) => {
  // If replying_to_id is undefined, then this is a new tweet, otherwise it's a reply
  const is_reply = replying_to_id === undefined ? false : true;
  const router = useRouter();
  const { data: sessionData } = useSession();
  // Format and validation for the tweet form
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
  // Invalidate certain caches depending on if it's a reply or not
  const postTweet = api.tweet.createTweet.useMutation({
    onSuccess: () => {
      void utils.tweet.getLotTweets.invalidate();
      if (is_reply) {
        void utils.tweet.getTweet.invalidate({ id: replying_to_id });
        if (close) {
          close();
        }
        if (redirect) {
          void router.replace(`tweet/${replying_to_id!}`);
        }
      }
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
  // If you are not logged in, display nothing
  if (!sessionData) return <></>;
  // This runs when you press the tweet button
  const handleSubmit = (values: typeof form.values) => {
    let send = {
      user_id: sessionData.user.id,
      is_public: true,
      TweetText: {
        tweet_text: values.tweet_text,
      },
      images: values.images,
    };
    // If it's a reply, add the original tweet id to the request
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
    <Card className="pt-2" shadow="sm" withBorder id="tweetComposer">
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
            accept="image/png,image/jpeg"
            multiple
            inputProps={{ id: "uploadImage" }}
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
                    id={`closeButton-${i}`}
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
