"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PLAYER_CAR,
  PLAYER_CAR_IMAGE,
  PLAYER_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
  PLAYER_CAR_FORTUNE,
} from "@/lib/const";
import { PlayerCarRes } from "@/app/create/type";

export default function Home() {
  const router = useRouter();
  if (typeof window === "undefined") return false;
  let playerCar = localStorage.getItem(PLAYER_CAR);
  if (!playerCar) {
    // プレイヤーカーがない場合はcreateページに戻る
    router.push("/create");
    return false;
  }
  const playerCarObj = JSON.parse(playerCar) as PlayerCarRes;
  const carImage = playerCarObj[PLAYER_CAR_IMAGE];
  const carName = playerCarObj[PLAYER_CAR_NAME];
  const carLuck = playerCarObj[PLAYER_CAR_LUCK];
  const carInstruction = playerCarObj[PLAYER_CAR_INSTRUCTION];
  if (!carLuck) {
    // ラックがない場合はcreateページに戻る
    router.push("/create");
    return false;
  }
  if (1 > carLuck || carLuck > 6) {
    // ラックが1~6以外の場合はcreateページに戻る
    router.push("/create");
    return false;
  }
  const carFortune = PLAYER_CAR_FORTUNE[carLuck];
  if (!carImage) router.push("/create");
  if (!carName) router.push("/create");
  if (!carFortune) router.push("/create");

  const moveToRace = () => {
    router.push("/race");
  };

  return (
    <main>
      <div className="flex h-screen flex-wrap items-center justify-around bg-basecolor">
        <div className="flex h-full w-1/2 flex-col items-center justify-around p-4">
          <div className="w-11/12 items-center rounded-xl border-4 border-accentcolor bg-secondarycolor p-4 text-center text-3xl tracking-wider text-basecolor">
            <div className="p-4 text-left">
              <p>{carInstruction}</p>
            </div>
          </div>
          <Card className="w-11/12 border-4 border-accentcolor p-8 text-center text-4xl tracking-wider">
            <p>俺は、{carName}</p>
            <p>今日は、{carFortune}</p>
          </Card>
        </div>

        <div className="flex h-full w-1/2 flex-col items-center justify-around p-4">
          <Card className="flex h-4/5 w-full flex-col items-center justify-around border-4 border-accentcolor bg-primarycolor p-4">
            <div className="bg-transparent border-transparent flex h-full w-full flex-col items-center justify-around overflow-hidden">
              <Image
                src={carImage}
                width={2000}
                height={2000}
                alt={PLAYER_CAR_IMAGE}
                className="object-cover object-center"
              />
            </div>
            <div className="flex w-full justify-end p-4">
              <Button
                className="h-16 w-44 border-4 border-basecolor bg-accentcolor text-3xl hover:bg-primarycolor"
                onClick={moveToRace}
              >
                Next
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
