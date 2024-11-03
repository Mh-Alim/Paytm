"use client";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { increaseCounter, decreaseCounter } from "@repo/store/action";

import { prisma } from "@repo/db/client";

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  console.log("state is this", state);
  return (
    <div>
      <h1 className=" bg-blue-300 text-orange-800 ">Tailwind is added</h1>
      <Button appName="user-app">User app</Button>
      <div></div>
      <button onClick={() => dispatch(increaseCounter())}>
        increment
      </button>{" "}
      <br />
      <button onClick={() => dispatch(decreaseCounter())}>
        decrement
      </button>{" "}
      <br />
      <h1>Show Count: {state.counter.count}</h1>
    </div>
  );
}
