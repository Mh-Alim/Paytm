import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1 className=" bg-blue-300 text-orange-800 ">Tailwind is added</h1>
      <Button appName="user-app">User app</Button>
    </div>
  );
}
