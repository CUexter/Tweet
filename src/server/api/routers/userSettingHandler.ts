import { prisma } from "@/server/db";
import { z } from "zod";

import { AccountInfo } from "../../../components/userSetting/accountInfoFolder/AccountInfoClass";
import { createTRPCRouter, publicProcedure } from "../trpc";

async function getVisible() {
  const user = await prisma.user.findUnique({
    where: {
      id: "clg3kw3qe0000ul4ogzlcexh2",
    },
  });
  console.log("this is: " + user?.emailVisbility);
  return user?.emailVisbility;
}

async function setVisible(visibleInput: boolean) {
  console.log("updated as: " + visibleInput);
  const user = await prisma.user.update({
    where: {
      id: "clg3kw3qe0000ul4ogzlcexh2",
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
  const user = await prisma.user.findUnique({
    where: {
      id: "clg3kw3qe0000ul4ogzlcexh2",
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
const newAC = z.object({
  id: z.string(),
  name: z.string(),
  tagName: z.string(),
  email: z.string(),
  password: z.string(),
});
//id:string,name:string,tagName:string,email:string,password:string
/*async function setAccountInfo(a:string){
return "hi";
}*/
export const userSettingHandler = createTRPCRouter({
  getVisible: publicProcedure.mutation(getVisible),
  setVisible: publicProcedure
    .input(z.object({ visible: z.boolean() }))
    .mutation(({ input }) => {
      setVisible(input.visible);
    }),
  createAc: publicProcedure.mutation(createAc),
  getAccountInfo: publicProcedure.mutation(getAccountInfo),
  /* setAccountInfo:publicProcedure
  .input(newAC)
  .mutation(setAccountInfo),
*/
});
