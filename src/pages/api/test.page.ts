import { prisma } from "@/server/db";

export default async function handler() {
  try {
    const user = await prisma.user.create({
      data: {
        email: "sum0920@gmail.com",
        password: "1234",
        name: "Cherie",
        tag_name: "@cherie020",
        is_admin: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
