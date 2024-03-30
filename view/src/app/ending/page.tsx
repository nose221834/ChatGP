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
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
  }, []);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main>
      <div className="relative h-screen w-full bg-[url('/ending_back.png')] bg-cover p-4">
        {/* 背景を暗くするためのオーバーレイ */}
        <div className="absolute inset-0 bg-accentcolor bg-opacity-20">
          <div className="flex h-screen items-center justify-center">
            <div className="max-w-4xl overflow-auto p-4">
              {loader ? (
                <p className="whitespace-normal text-2xl font-bold text-accentyellow">{text}</p>
              ) : (
                <p className="whitespace-normal text-2xl font-bold text-accentyellow">Loading</p>
              )}
            </div>
          </div>
          <div className="reft-0 absolute bottom-0 m-4">
            {loader && <Image src={order} alt="order" width={200} height={200} />}
          </div>
          <div className="absolute bottom-0 right-0 m-4">
            <Button
              className="bg-transparent w-30 h-16 border text-center text-xl tracking-widest text-basecolor hover:bg-secondarycolor"
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
