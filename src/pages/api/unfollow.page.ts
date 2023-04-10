import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db";

export default async function deletefollow(
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
      const unfollow = await prisma.following.delete({
        where: { id: obj[0].id },
      });
    }
    res.status(200).send("");
  } catch (error) {
    console.log(error);
  }
}
