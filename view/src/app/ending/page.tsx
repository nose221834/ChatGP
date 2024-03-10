"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    RACE_RESPONSE_DATA,
    GENERATED_TEXT,
  } from "@/lib/const";


export default function Home() {
    const router = useRouter();

    if (typeof window === 'undefined') return false;

    


    let raceResponseData = localStorage.getItem(RACE_RESPONSE_DATA);
    if (!raceResponseData) {
      // プレイヤーカーがない場合はcreateページに戻る
      router.push("/create");
      return false;
    }
    const raceDataJson = JSON.parse(raceResponseData);

    const endigText:string =raceDataJson[GENERATED_TEXT];
  
    const moveToStart = () => {
        router.push("/");
    };
    return (
      <main>
        <div className="relative bg-[url('/ending_back.png')] bg-cover h-screen w-full p-4">
          {/* 背景を暗くするためのオーバーレイ */}
          <div className="absolute inset-0 bg-accentcolor bg-opacity-20">
            <div className="flex items-center justify-center h-screen">
              <div className="max-w-4xl overflow-auto p-4">
                <p className="whitespace-normal text-accentyellow text-2xl font-bold">
                  {endigText}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 m-4">
              <Button className="border bg-transparent hover:bg-secondarycolor text-basecolor w-30 h-16 text-xl text-center tracking-widest"
              onClick={moveToStart}>
                Game End
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
}