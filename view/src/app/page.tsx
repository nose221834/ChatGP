"use client";

import { useRouter } from "next/navigation";
import { getEnemyCar } from "@/app/getEnemyCar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const moveToCreate = () => {
    localStorage.clear();
    getEnemyCar();
    router.push("/create");
  };
  return (
    <main>
      <div className=" flex flex-col items-center justify-around  h-screen w-screen bg-basecolor">
        <Button
          onClick={moveToCreate}
          className=" w-80 h-48 text-4xl tracking-widest items-center"
        >
          スタート！！
        </Button>
      </div>
    </main>
  );
}
