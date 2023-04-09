import { prisma } from "@/server/db";

export default async function createLike() {
  try {
    /*const user = await prisma.user.create({
      data: {
        email: "990920@gmail.com",
        password: "1234",
        name: "Cherie",
        tag_name: "@cherie0201",
        is_admin: false,
      },
    });*/
    const like = await prisma.like.create({
      data: {
        user_id: "123",
        tweet_id: "1234",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
