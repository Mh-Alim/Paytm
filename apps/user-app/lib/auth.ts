import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import { signInSchema, SignInType } from "@repo/types/signin";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

type CustomSession = Session & {
  id?: string;
};
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "creds",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "name",
        },
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "9034939346",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) return null;
          const parsedRes = signInSchema.safeParse(credentials);
          if (!parsedRes.success) return null;

          const { phone, password } = parsedRes.data;
          if (!phone || !password) return null;

          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const userExist = await prisma.user.findFirst({
            where: {
              phone: phone,
            },
          });

          if (userExist) {
            const isPassMatched = await bcrypt.compare(
              password,
              userExist.password
            );
            if (isPassMatched) {
              return {
                id: `${userExist.id}`,
                name: userExist.name,
                email: userExist.email,
                phone: userExist.phone,
              } as User;
            }
            return null;
          }

          const { user, balance } = await prisma.$transaction(
            async (prisma) => {
              const user = await prisma.user.create({
                data: {
                  name: credentials.name,
                  phone: credentials.phone,
                  email: credentials.email,
                  password: hashedPassword,
                },
              });

              const balance = await prisma.balance.create({
                data: {
                  amount: 0,
                  locked: 0,
                  userId: user.id,
                },
              });

              return { user, balance };
            }
          );

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
          };
        } catch (e) {
          console.log("authorize error: ", e);
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: ({ token, session }: { token: JWT; session: CustomSession }) => {
      if (token.sub) session.id = token.sub;
      return session;
    },
  },
};
