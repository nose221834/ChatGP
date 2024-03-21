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
      <div className=" flex flex-col items-center justify-around  h-screen w-screen bg-basecolor">
        <div className="p-4 w-[40rem] h-[10rem] text-4xl tracking-widest items-center text-shadow-edge ">
          <Card className=" text-basecolor flex flex-col items-center justify-around h-full bg-accentcolor ">
            ChatGPへようこそ
          </Card>
        </div>
        <Button
          onClick={moveToCreate}
          disabled={submit}
          className=" w-80 h-32 text-4xl tracking-widest items-center"
        >
          スタート！！
        </Button>
      </div>
      <div className="flex z-50 items-center justify-around absolute w-full h-1/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
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
            <div className="w-20 h-40"></div>
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
            <div className="flex w-20 h-40"></div>
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
