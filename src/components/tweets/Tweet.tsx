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
  IconLink,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Like from "../like";
import TweetComposer from "./TweetComposer";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

// Prop for type-checking
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

  const utils = api.useContext();
  const { data: session } = useSession();
  // Only check for retweet count if the user is logged in
  const { data: haveRetweeted } = api.retweet.checkRetweet.useQuery(
    { id: tweetID },
    { enabled: session?.user !== undefined }
  );
  // Call the retweet API, once successful invalidate the tweet and retweet cache
  const retweet = api.retweet.retweet.useMutation({
    onSuccess() {
      void utils.tweet.getTweet.invalidate({ id: tweetID });
      void utils.retweet.checkRetweet.invalidate({ id: tweetID });
    },
  });
  // If no tweet data, display nothing
  if (!tweetData) {
    return <>It not here</>;
  }
  // Get the number of replies and retweets
  const replies = tweetData.replied_by.length;
  const retweets = tweetData.retweeted_by.length;
  // Get the tweet attachments
  const attachements = tweetData.TweetAttachments;
  // Create the carousel for these attachments
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
      <div className="mx-auto w-3/4" id={`Tweet${tweetID}`}>
        <Card withBorder shadow="md">
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
              <IconLink />
            </ActionIcon>
          </Group>
          <Text className={classes.body} size="sm">
            {tweetData.TweetText[0]?.tweet_text}
          </Text>
          <Group className="justify-evenly pt-4">
            <Group>
              <Text size="sm">{replies}</Text>
              <ActionIcon onClick={session ? open : () => void signIn()}>
                <IconArrowBackUp size="1.5rem" />
              </ActionIcon>
            </Group>
            <Group>
              <Text size="sm">{retweets}</Text>
              <ActionIcon
                color={haveRetweeted ? "blue" : "gray"}
                onClick={
                  session
                    ? () => {
                        retweet.mutate({ id: tweetID });
                      }
                    : () => void signIn()
                }
              >
                <IconArrowAutofitLeft size="1.5rem" />
              </ActionIcon>
            </Group>
            <Group>
              {/* @ts-expect-error Server Component */}
              <Like id={tweetID} />
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
