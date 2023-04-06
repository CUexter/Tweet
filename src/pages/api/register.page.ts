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
    const { email, iPassword, display_name, name } = req.body;

    const sqlRes = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // No error means email exist already
    if (sqlRes) {
      return res.status(200).send("Exist");
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
          name,
        },
      });

      /* eslint-enable */
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
