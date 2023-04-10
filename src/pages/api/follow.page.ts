import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db";

export default async function createfollow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const following = await prisma.following.create({
      data: {
        user_id: "123",
        follower_id: "456",
      },
    });
    res.status(200).send("");
  } catch (error) {
    console.log(error);
  }
}
