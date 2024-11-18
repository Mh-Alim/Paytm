import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../../lib/auth";
import { prisma } from "@repo/db/client";
import ServerComponent from "./ServerComponent";

// import { useAppDispatch, useAppSelector } from "@repo/store/hook";

export default async function () {
  // const { refresh } = useAppSelector((state) => {
  //   console.log("state: ", state);
  //   return state.counter;
  // });

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-48 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <ServerComponent refresh={true} />
      </div>
    </div>
  );
}
