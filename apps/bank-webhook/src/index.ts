import express from "express";
import { prisma } from "@repo/db/client";

const app = express();

app.use(express.json());

const port = 6000;





app.post("/hdfcWebhook", async (req:any, res:any) => {
  // TODO : Add zod validations here
  // Check if this request actually come from hdfc bank, use a webhook secret here

  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  const onRampTransaction = await prisma.onRampTransaction.findFirst({
    where: {
      token: paymentInformation.token,
    },
  });
  console.log("onRampTransaction", onRampTransaction);

  if (onRampTransaction?.amount !== Number(paymentInformation.amount)) {
    return res.status(500).json({
      message: "amount is not equal",
    });
  }

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "SUCCESS",
        },
      }),
    ]);

    res.json({
      message: "Captured payment information",
    });
  } catch (e) {
    console.log("Error: ", e);
    res.status(411).json({
      message: "Error while capturing payment information",
    });
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port} port`);
});
