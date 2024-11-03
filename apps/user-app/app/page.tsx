"use client";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { PrismaClient } from "@repo/db/client";
import { incrementCount, decrementCount } from "@repo/store/countSlice";
const client = new PrismaClient();

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  console.log("state is this", state);
  return (
    <div>
      <h1 className=" bg-blue-300 text-orange-800 ">Tailwind is added</h1>
      <Button appName="user-app">User app</Button>
      <div></div>
      <button onClick={() => dispatch(incrementCount())}>increment</button>{" "}
      <br />
      <button onClick={() => dispatch(decrementCount())}>decrement</button>{" "}
      <br />
      <h1>Show Count: {state.countSlice}</h1>
    </div>
  );
}
