import type { TweetData } from "@/types/tweet";

import { api } from "@/utils/api";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Image,
  Modal,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowAutofitLeft,
  IconArrowBackUp,
  IconDotsVertical,
  IconHeart,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import TweetComposer from "./TweetComposer";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

interface TweetProp {
  tweetID: string;
  tweetData?: TweetData;
}
const Tweet = ({ tweetID, tweetData }: TweetProp) => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { id } = router.query;
  const { classes } = useStyles();
  // if they didn't pass in any tweetData, get it
  ({ data: tweetData } = api.tweet.getTweet.useQuery(
    { id: tweetID },
    { enabled: tweetData === undefined }
  ));
  // if the data is null, could be private or doesn't exist (private tweet is an advanced feature and this doesnt work so i'll work on it later)
  // ({ data: tweetData } = api.tweet.getPrivateTweet.useQuery(
  //   { id: tweetID },
  //   { enabled: false }
  // ));
  // if null after private query, it doesn't exist

  const utils = api.useContext();
  const { data: session } = useSession();
  const { data: haveRetweeted } = api.retweet.checkRetweet.useQuery(
    { id: tweetID },
    { enabled: session?.user !== undefined }
  );

  const retweet = api.retweet.retweet.useMutation({
    onSuccess() {
      void utils.tweet.getTweet.invalidate({ id: tweetID });
      void utils.retweet.checkRetweet.invalidate({ id: tweetID });
    },
  });
  if (!tweetData) {
    return <>It not here</>;
  }

  const likes = tweetData.Likes.length;
  const replies = tweetData.replied_by.length;
  const retweets = tweetData.retweeted_by.length;

  const attachements = tweetData.TweetAttachments;
  const carousel = attachements.map((a, i) => {
    return (
      <Carousel.Slide key={i}>
        <Image src={a.attachment_url} alt="" withPlaceholder />
      </Carousel.Slide>
    );
  });

  const attachementDisplay =
    attachements.length > 1 ? (
      <Carousel withIndicators controlSize={40}>
        {carousel}
      </Carousel>
    ) : (
      <Image src={attachements[0]?.attachment_url} alt="" />
    );

  return (
    <>
      <div className="mx-auto w-3/4">
        <Card withBorder>
          {attachements.length > 0 && (
            <Card.Section>{attachementDisplay}</Card.Section>
          )}
          <Group position="apart" mt="">
            <Link href={`/profile/${tweetData.user.id}`}>
              <Group>
                <Avatar
                  src={tweetData.user.image}
                  color={"yellow"}
                  radius="xl"
                />
                <div>
                  <Text size="sm">{tweetData.user.display_name}</Text>
                  <Text size="xs" color="dimmed">
                    {dayjs(tweetData.created_at).format()}
                  </Text>
                </div>
              </Group>
            </Link>
            <ActionIcon component={Link} href={`/tweet/${tweetID}`}>
              <IconDotsVertical />
            </ActionIcon>
          </Group>
          <Text className={classes.body} size="sm">
            {tweetData.TweetText[0]?.tweet_text}
          </Text>
          <Group className="justify-evenly pt-4">
            <Group>
              <Text size="sm">{replies}</Text>
              <ActionIcon onClick={open}>
                <IconArrowBackUp size="1.5rem" />
              </ActionIcon>
            </Group>
            <Group>
              <Text size="sm">{retweets}</Text>
              <ActionIcon
                color={haveRetweeted ? "green" : "gray"}
                onClick={() => {
                  retweet.mutate({ id: tweetID });
                }}
              >
                <IconArrowAutofitLeft size="1.5rem" />
              </ActionIcon>
            </Group>
            <Group>
              <Text size="sm">{likes}</Text>
              <ActionIcon onClick={() => console.log("placeholder for like")}>
                <IconHeart size="1.5rem" />
              </ActionIcon>
            </Group>
          </Group>
        </Card>

        {/* Modal for reply */}
        <Modal
          opened={opened}
          onClose={close}
          title="Write your reply"
          centered
        >
          <TweetComposer
            original_id={tweetID}
            close={close}
            redirect={tweetID !== id}
          />
        </Modal>
      </div>
    </>
  );
};

export default Tweet;
