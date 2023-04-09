import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db";

export default async function checkFollowing(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const obj = await prisma.following.findMany({
      where: {
        user_id: "123",
        follower_id: "456",
      },
    });
    if (obj[0] != null) {
      res.send("1");
    } else res.send("0");
  } catch (error) {
    console.log(error);
  }
}
