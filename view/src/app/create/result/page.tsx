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
  const image = localStorage.getItem(PLAYER_CAR_IMAGE);
  const router = useRouter();
  if (image) {
    return (
      <main>
        <div className="flex flex-wrap justigy-around items-center h-screen bg-basecolor">
          <div className="h-4/5 w-1/2 p-4">
            <div className="flex flex-col justify-around items-center h-full w-full bg-primarycolor rounded-xl border-4 border-accentcolor">
              <Card className="text-3xl text-center w-11/12 border-4 border-basecolor p-8">
                <p>俺の名前は{localStorage.getItem(PLAYER_CAR_NAME)}!!</p>
                <p>
                  {PLAYER_CAR_FORTUNE[localStorage.getItem(PLAYER_CAR_LUCK)]}
                </p>
                <p>{localStorage.getItem(PLAYER_CAR_INSTRUCTION)}</p>
              </Card>
            </div>
          </div>
          <div className="h-4/5 w-1/2 p-4">
            <div className="flex flex-col justify-around items-center h-full w-full bg-primarycolor rounded-xl border-4 border-accentcolor">
              <Image
                src={image}
                width={700}
                height={700}
                alt="player_car_image"
              />
            </div>
          </div>
        </div>
      </main>
      // <div>
      //   <img src={image}></img>
      // </div>
    );
  } else {
    router.push("/create");
  }
}
