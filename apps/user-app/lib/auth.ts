import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import { signInSchema, SignInType } from "@repo/types/signin";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialProvider({
      name: "creds",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "9034939346",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: SignInType) => {
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
              id: userExist.id as number,
              // name: userExist.name,
              phone: userExist.phone as string,
            };
          }
          return null;
        }
        return null;
      },
    }),
  ],
};
