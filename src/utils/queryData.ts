export const TweetInfoIncludes = {
  TweetText: true,
  replied_by: true,
  retweeted_by: true,
  TweetAttachments: true,
  Likes: true,
  Polls: true,
  user: {
    select: {
      id: true,
      tag_name: true,
      image: true,
      display_name: true,
    },
  },
};
