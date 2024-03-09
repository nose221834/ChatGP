"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PLAYER_CAR_IMAGE,
  PLAYER_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
  PLAYER_CAR_FORTUNE,
} from "@/lib/const";

export default function Home() {
  const carImage = localStorage.getItem(PLAYER_CAR_IMAGE);
  const carName = localStorage.getItem(PLAYER_CAR_NAME);
  const carLuck = localStorage.getItem(PLAYER_CAR_LUCK);
  const carInstruction = localStorage.getItem(PLAYER_CAR_INSTRUCTION);
  let carFortune;
  let carLuckNum: number;
  if (carLuck) {
    carLuckNum = Number(carLuck);
    if (1 <= carLuckNum && carLuckNum <= 6) {
      carFortune = PLAYER_CAR_FORTUNE[carLuckNum];
    }
  }
  const router = useRouter();
  if (carImage && carName && carFortune) {
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
                  onClick={() => {
                    alert('Button clicked');
                  }}>Next</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    );
  } else {
    router.push("/create");
  }
}
