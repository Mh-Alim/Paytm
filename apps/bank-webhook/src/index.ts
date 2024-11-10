import express from "express";
import { prisma } from "@repo/db/client";

const app = express();
const port = 5000;

app.post("/hdfcWebhook", async (req, res) => {
  // TODO : Add zod validations here
  // Check if this request actually come from hdfc bank, use a webhook secret here

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

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
