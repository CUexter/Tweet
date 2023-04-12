import { prisma } from "@/server/db";

async function main() {
  // hashtag
  const hashtag1 = await prisma.hashtag.upsert({
    where: {
      id: "h1",
    },
    create: {
      id: "h1",
      hashtag_text: "first_hashtag",
    },
    update: {},
  });
  const hashtag2 = await prisma.hashtag.upsert({
    where: {
      id: "h2",
    },
    create: {
      id: "h2",
      hashtag_text: "2ndHashtag",
    },
    update: {},
  });

  await prisma.user.upsert({
    where: {
      id: "uid1",
    },
    create: {
      id: "uid1",
      name: "alice",
      email: "alice@gmail.com",
      emailVerified: new Date(2023, 3, 1),
      display_name: "Alice Li",
      tag_name: "alice2733",
      profile_desc: "something something",
      is_admin: true,
      Tweet: {
        create: [
          {
            id: "t1",
            is_public: true,
            published_at: new Date(2023, 4, 1),
            TweetText: {
              create: [
                {
                  id: "tt1",
                  tweet_text: "Hi i am doing the first tweet",
                },
              ],
            },
          },
        ],
      },
    },
    update: {},
  });

  await prisma.user.upsert({
    where: {
      id: "uid2",
    },
    create: {
      id: "uid2",
      name: "bob",
      email: "bob@gmail.com",
      emailVerified: new Date(2023, 3, 2),
      display_name: "Bob Wu",
      tag_name: "bobby211",
      profile_desc: "bobbbbbbbb",
      is_admin: false,
      Tweet: {
        create: [
          {
            id: "t2",
            is_public: true,
            published_at: new Date(2023, 4, 1),
            TweetText: {
              create: [
                {
                  id: "tt2",
                  tweet_text: "Hi i am doing the second tweet",
                },
              ],
            },
          },
        ],
      },
    },
    update: {},
  });

  // bob likes alice's tweet
  await prisma.like.upsert({
    where: {
      id: "l1",
    },
    create: {
      id: "l1",
      user_id: "uid2",
      tweet_id: "t1",
    },
    update: {},
  });

  // alice follows bob
  await prisma.following.upsert({
    where: {
      id: "f1",
    },
    create: {
      id: "f1",
      doing_following_ID: "uid1",
      being_followed_ID: "uid2",
    },
    update: {},
  });

  //alice reply to bob's tweet
  await prisma.tweet.upsert({
    where: { id: "t3" },
    create: {
      id: "t3",
      user_id: "uid1",
      is_public: true,
      published_at: new Date(2023, 4, 10),
      TweetText: {
        create: {
          tweet_text: "hi bob",
        },
      },
    },
    update: {},
  });

  await prisma.retweet.upsert({
    where: {
      id: "rp1",
    },
    create: {
      id: "rp1",
      original_tweet_id: "t2",
      on_profile: false,
      retweet_id: "t3",
    },
    update: {},
  });

  //bob retweet to alice's tweet
  await prisma.tweet.upsert({
    where: { id: "t4" },
    create: {
      id: "t4",
      user_id: "uid2",
      is_public: true,
      published_at: new Date(2023, 4, 10),
      TweetText: {
        create: {
          tweet_text: "alice is interesting",
        },
      },
    },
    update: {},
  });

  await prisma.retweet.upsert({
    where: {
      id: "rp1",
    },
    create: {
      id: "rp1",
      original_tweet_id: "t1",
      on_profile: true,
      retweet_id: "t4",
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
