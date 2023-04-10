import { prisma } from "../src/server/db";

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
