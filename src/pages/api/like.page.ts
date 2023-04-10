import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db";

export default async function createLike(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const obj = await prisma.like.findMany({
      where: {
        user_id: "123",
        tweet_id: "1234",
      },
    });
    if (obj[0] == null) {
      const like = await prisma.like.create({
        data: {
          user_id: "123",
          tweet_id: "1234",
        },
      });
      res.status(200).send("");
    }
  } catch (error) {
    console.log(error);
  }
}
