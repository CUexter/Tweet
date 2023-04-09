import { prisma } from "@/server/db";

//problem unsolved: how to get the user_id and tweet_id
//so i need to get the id of the like first
//to get the id of the like i need to know the user_id and tweet_id

export default async function deleteLike() {
  try {
    const obj = await prisma.like.findMany({
      where: {
        user_id: "123",
        tweet_id: "1234",
      },
    });
    if (obj[0] != null) {
      const unlike = await prisma.like.delete({
        where: { id: obj[0].id },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
