//import { authOptions } from "@/server/auth";
import prisma from "@/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//export default NextAuth(authOptions);

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // If the email or password input is empty
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Use the input email to find user in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Possibly change to hashedpassword?
        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }
        // Compare with the password (supposed to be hashed)
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // For process.evn.NEXTAUTH_JWT_SECRET
  // and process.env.NEXTAUTH_SECRET
  // remember to add those two in .env
  // with value equals to "NEXT_AUTH_JWT_SECRET" and "NEXTAUTH_SECRET" respectively
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
