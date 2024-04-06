"use client";

import { useRouter } from "next/navigation";
import { getEnemyCar } from "@/app/getEnemyCar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [submit, setSubmit] = useState<boolean>(false);

  const moveToCreate = async () => {
    setSubmit(true);
    localStorage.clear();
    await getEnemyCar();
    router.push("/create");
  };
  return (
    <main>
      <div className=" flex h-screen w-screen flex-col  items-center justify-around bg-basecolor">
        <div className="h-[10rem] w-[40rem] items-center p-4 text-4xl tracking-widest text-shadow-edge ">
          <Card className=" flex h-full flex-col items-center justify-around bg-accentcolor text-basecolor ">
            ChatGPへようこそ
          </Card>
        </div>
        <Button
          onClick={moveToCreate}
          disabled={submit}
          className=" h-32 w-80 items-center text-4xl tracking-widest"
        >
          スタート！！
        </Button>
      </div>
      <div className="absolute left-1/2 top-1/2 z-50 flex h-1/4 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-around  ">
        <div className="flex flex-col justify-between ">
          <Image
            src="/rembg_1.png"
            alt="enemy1"
            width={256}
            height={256}
            className=" animate-vibrate-1 "
            priority
          />
          <div className="flex">
            <div className="h-40 w-20"></div>
            <Image
              src="/rembg_0.png"
              alt="enemy0"
              width={256}
              height={256}
              className=" animate-jello-horizontal"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div></div>
          <Image
            src="/rembg_3.png"
            alt="enemy0"
            width={256}
            height={256}
            className=" animate-jello-horizontal"
          />
          <div className="flex flex-col">
            <div className="flex h-40 w-20"></div>
            <div className=" w-20"> </div>
            <Image
              src="/rembg_2.png"
              alt="enemy2"
              width={256}
              height={256}
              className=" animate-vibrate-1"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
