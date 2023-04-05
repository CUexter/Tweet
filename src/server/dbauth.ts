import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/server/db";
//import { authOptions } from '@/pages/api/auth/[...nextauth].page';
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
