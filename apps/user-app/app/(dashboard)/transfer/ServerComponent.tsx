import React from "react";

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

const ServerComponent = async ({ refresh }: { refresh: boolean }) => {
  const { amount, locked } = await getBalance();
  const txn = await getOnRampTransactions();
  return (
    <div>
      <BalanceCard amount={amount} locked={locked} />
      <div className="pt-4">
        <OnRampTransactions transactions={txn} />
      </div>
    </div>
  );
};

export default ServerComponent;
