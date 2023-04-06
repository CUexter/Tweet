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
    const { email, iPassword } = req.body;

    const sqlRes = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (sqlRes) {
      // Email exist compare with the hashedpw now
      let hashed = sqlRes.password;
      if (hashed !== null) {
        const isCorrectPassword = await bcrypt.compare(iPassword, hashed);
        if (isCorrectPassword) {
          res.status(200).send("OK");
        } else {
          res.status(200).send("Invalid");
        }
      }
    } else {
      // Email not exist
      res.status(200).send("NoEmail");
      /* eslint-enable */
      //return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
