import type {
  Like,
  Poll,
  Retweet,
  Tweet,
  TweetAttachments,
  TweetText,
  User,
} from "@prisma/client";

type UserInfo = Pick<User, "display_name" | "tag_name" | "id" | "image">;
type include = {
  TweetText: TweetText[];
  Retweeting_to: Retweet | null;
  Retweeted_by: Retweet[];
  TweetAttachments: TweetAttachments[];
  Likes: Like[];
  Polls: Poll[];
  user: UserInfo;
};

export type TweetData = Omit<Tweet, "scheduled_at" | "is_public"> & include;
