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
  let playerCar = localStorage.getItem(PLAYER_CAR);
  if (!playerCar) { // プレイヤーカーがない場合はcreateページに戻る
    router.push("/create");
    return false;
  }
  const playerCarObj = JSON.parse(playerCar) as PlayerCarRes;
  const carImage = playerCarObj[PLAYER_CAR_IMAGE];
  const carName = playerCarObj[PLAYER_CAR_NAME];
  const carLuck = playerCarObj[PLAYER_CAR_LUCK];
  const carInstruction = playerCarObj[PLAYER_CAR_INSTRUCTION];
  if (!carLuck) { // ラックがない場合はcreateページに戻る
    router.push("/create");
    return false;
  }
  if (1 > carLuck || carLuck > 6) { // ラックが1~6以外の場合はcreateページに戻る
    router.push("/create");
    return false;
  }
  const carFortune = PLAYER_CAR_FORTUNE[carLuck];
  if(!carImage) router.push("/create");
  if(!carName) router.push("/create");
  if(!carFortune) router.push("/create");

  const moveToRace = () => {
    router.push("/race");
  }

  return (
    <main>
      <div className="flex flex-wrap justigy-around items-center h-screen bg-basecolor">
        <div className="flex h-full w-1/2 p-4 flex-col justify-around items-center">
          <div className="text-3xl tracking-wider text-center w-11/12 p-4 items-center bg-secondarycolor text-basecolor rounded-xl border-4 border-accentcolor">
            <div className="p-4 text-left">
              <p>{carInstruction}</p>
            </div>
          </div>
          <Card className="text-4xl tracking-wider text-center w-11/12 border-4 border-accentcolor p-8">
            <p>俺は、{carName}</p>
            <p>今日は、{carFortune}</p>
          </Card>
        </div>

        <div className="flex h-full w-1/2 p-4 flex-col justify-around items-center">
          <Card className="flex flex-col justify-around items-center h-4/5 w-full p-4 border-4 bg-primarycolor border-accentcolor">
            <div className="overflow-hidden flex flex-col justify-around items-center h-full w-full bg-transparent border-transparent">
              <Image
                src={carImage}
                width={2000}
                height={2000}
                alt={PLAYER_CAR_IMAGE}
                className="object-center object-cover"
              />
            </div>
            <div className="flex justify-end p-4 w-full">
              <Button className="w-44 h-16 text-3xl bg-accentcolor border-basecolor hover:bg-primarycolor border-4"
                onClick={moveToRace}>
                  Next
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
