import { prisma } from "@/server/db";
import { getSession } from "next-auth/react";
import { z } from "zod";

import { AccountInfo } from "../../../components/userSetting/accountInfoFolder/AccountInfoClass";
import { createTRPCRouter, publicProcedure } from "../trpc";

async function getVisible() {
  const session = await getSession();
  if (!session) return false;
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  console.log("this is: " + user?.emailVisbility);
  return user?.emailVisbility;
}

async function setVisible(visibleInput: boolean) {
  console.log("updated as: " + visibleInput);
  const session = await getSession();
  if (!session) return;
  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      emailVisbility: visibleInput,
    },
  });

  return;
}

async function createAc() {
  const user = await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
    },
  });
}

async function getAccountInfo() {
  const session = await getSession();
  if (!session)
    return {
      accountInfo: new AccountInfo("", "", "", "", "", false),
    };
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (user) {
    if (user?.name == null) user.name = "";
    if (user?.tag_name == null) user.tag_name = "";
    if (user?.password == null) user.password = "";
    if (user?.email == null) user.email = "";
    const tempEmailVerified = !(user?.emailVerified == null);
    return {
      accountInfo: new AccountInfo(
        user?.id,
        user?.name,
        user?.tag_name,
        user?.password,
        user?.email,
        tempEmailVerified
      ),
    };
  } else
    return {
      accountInfo: new AccountInfo("", "", "", "", "", false),
    };
}

//id:string,name:string,tagName:string,email:string,password:string
async function setAccountInfo(input: {
  id: string;
  name: string;
  email: string;
  password: string;
  tagName: string;
}) {
  const session = await getSession();
  if (!session) return;
  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
      tag_name: input.tagName,
    },
  });
  return "hi";
}

async function deleteAc() {
  const session = await getSession();
  if (!session) return;
  return;
}

export const userSettingHandler = createTRPCRouter({
  getVisible: publicProcedure.mutation(getVisible),
  setVisible: publicProcedure
    .input(z.object({ visible: z.boolean() }))
    .mutation(({ input }) => {
      setVisible(input.visible);
    }),
  createAc: publicProcedure.mutation(createAc),
  deleteAc: publicProcedure.mutation(deleteAc),
  getAccountInfo: publicProcedure.mutation(getAccountInfo),
  setAccountInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        tagName: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      setAccountInfo(input);
    }),
});
