"use server";

// this server action will call the bank server to get the money
// my website will tell hdfc bank ki bhai money send kr mere bank ko and notify me through web hook
// is api ke through hum ye batayenge ki bhai bank mujhe paise send kr

import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import generateUniqueId from "generate-unique-id";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideall the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = generateUniqueId();

  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "PROCESSING",
      startTime: new Date(),
      token,
      userId: Number((session as any).id),
      amount: amount * 100,
    },
  });

  return {
    message: "done",
  };
}
