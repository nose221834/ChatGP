"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { Card } from "@/components/ui/card";
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
  let carLuck = localStorage.getItem(PLAYER_CAR_LUCK);
  const carInstruction = localStorage.getItem(PLAYER_CAR_INSTRUCTION);
  let carFortune;
  if (carLuck) {
    // carLuck to int
    carLuck = parseInt(carLuck);
    if (1 <= carLuck && carLuck <= 6) {
      carFortune = PLAYER_CAR_FORTUNE[carLuck];
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

          <div className="h-4/5 w-1/2 p-4">
            <div className=" overflow-hidden flex flex-col justify-around items-center h-full w-full bg-primarycolor rounded-xl border-4 border-accentcolor">
              <Image
                src={carImage}
                width={700}
                height={700}
                alt={PLAYER_CAR_IMAGE}
                className="object-center object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    router.push("/create");
  }
}
