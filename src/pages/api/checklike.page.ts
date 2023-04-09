import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db";

export default async function checkLike(
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
    if (obj[0] != null) {
      res.send("1");
    } else res.send("0");
  } catch (error) {
    console.log(error);
  }
}
