import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Accept POST only
  /* eslint-disable */
  if (req.method != "POST") {
    return res.status(405).end();
  }

  try {
    const { email, iPassword, display_name, tag_name } = req.body;

    const sqlRes = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const sqlRes2 = await prisma.user.findUnique({
      where: {
        tag_name: tag_name,
      },
    });
    // No error means email exist already
    if (sqlRes && sqlRes2) {
      return res.status(200).send("ExistBoth");
    } else if (sqlRes) {
      return res.status(200).send("ExistEmail");
    } else if (sqlRes2) {
      return res.status(200).send("ExistTagName");
    } else {
      // Means can't find the email = can reg
      // Apply hashing to the input password
      const password = await bcrypt.hash(iPassword, 12);
      // Create user name === username
      const user = await prisma.user.create({
        data: {
          email,
          password,
          display_name,
          tag_name,
        },
      });

      /* eslint-enable */
      return res.status(200).send("OK");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
