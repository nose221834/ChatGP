"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RACE_RESPONSE_DATA, GENERATED_TEXT } from "@/lib/const";
import { getPlayerRank } from "@/lib/race/getPlayerRank";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [text, setText] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let raceResponseData = localStorage.getItem(RACE_RESPONSE_DATA);
    if (raceResponseData) {
      const raceDataJson = JSON.parse(raceResponseData);
      const endingText: string = raceDataJson[GENERATED_TEXT];
      setText(endingText);
      const orderNum = getPlayerRank();
      const orderImage = `/order_img/order_${orderNum}.png`;
      setOrder(orderImage);
    }
    setLoader(false);
  });

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main>
      <div className="relative bg-[url('/ending_back.png')] bg-cover h-screen w-full p-4">
        {/* 背景を暗くするためのオーバーレイ */}
        <div className="absolute inset-0 bg-accentcolor bg-opacity-20">
          <div className="flex items-center justify-center h-screen">
            <div className="max-w-4xl overflow-auto p-4">
              {loader ? (
                <p className="whitespace-normal text-accentyellow text-2xl font-bold">
                  Loading
                </p>
              ) : (
                <p className="whitespace-normal text-accentyellow text-2xl font-bold">
                  {text}
                </p>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 reft-0 m-4">
            {!loader && (
              <Image src={order} alt="order" width={200} height={200} />
            )}
          </div>
          <div className="absolute bottom-0 right-0 m-4">
            <Button
              className="border bg-transparent hover:bg-secondarycolor text-basecolor w-30 h-16 text-xl text-center tracking-widest"
              onClick={handleClick}
            >
              Game End
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
