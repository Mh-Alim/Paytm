import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../../lib/auth";
import { prisma } from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number((session as any).id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number((session as any).id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const { amount, locked } = await getBalance();
  const txn = await getOnRampTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-48 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={amount} locked={locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={txn} />
          </div>
        </div>
      </div>
    </div>
  );
}
