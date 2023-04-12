import type {
  Like,
  Poll,
  Tweet,
  TweetAttachments,
  TweetText,
  User,
} from "@prisma/client";

type UserInfo = Pick<User, "display_name" | "tag_name" | "id" | "image">;
type include = {
  TweetText: TweetText[];
  retweeted_by: User[];
  replied_by: Tweet[];
  TweetAttachments: TweetAttachments[];
  Likes: Like[];
  Polls: Poll[];
  user: UserInfo;
};

export type TweetData = Omit<Tweet, "scheduled_at" | "is_public"> & include;
