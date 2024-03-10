"use client";

import { useState, useEffect } from "react";
import { Interactive } from "./Interactive";
import { Progress } from "./Progress";
import { useRouter } from "next/navigation";
import { SubmitProps } from "./type";
import { RaceData, RaceEndData } from "@/app/race/type";
import { getRaceDataFromGpt, getEndDataFromGpt } from "@/lib/race/action";
import { ENEMY_CAR, RACE_RESPONSE_DATA } from "@/lib/const";
import Image from "next/image";
import {
  generateRaceRequestBody,
  generateRaceEndRequestBody,
} from "@/lib/race/generateRequestBody";

export default function Home() {
  const router = useRouter();
  // 場面を切り替えるためのState
  const [scene, setScene] = useState<number>(0);
  // InteractiveとProgressを切り替えるState
  const [response, setResponse] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  async function onSubmit(data: SubmitProps) {
    if (scene + 1 >= 3) {
      const requestBody: RaceEndData = generateRaceEndRequestBody(data.event);
      const responseJson = await getEndDataFromGpt(requestBody);
      console.log("responseJson:", responseJson);
      if (!responseJson) return <div>Error</div>;
      localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
      router.push("/race/ending");
    } else {
      setSubmit(true);
      const requestBody: RaceData = generateRaceRequestBody(data.event);
      console.log("requestBody", requestBody);
      const responseJson = await getRaceDataFromGpt(requestBody);
      console.log("responseJson:", responseJson);
      if (!responseJson) return <div>Error</div>;
      localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
      setResponse(true);
    }
  }

  function nextScene(): void {
    setScene(scene + 1);
    setResponse(false);
    setSubmit(false);
  }

  const enemyCar0 = localStorage.getItem(`${ENEMY_CAR}_0`);
  const enemyCar1 = localStorage.getItem(`${ENEMY_CAR}_1`);
  const enemyCar2 = localStorage.getItem(`${ENEMY_CAR}_2`);

  if (!enemyCar0 || !enemyCar1 || !enemyCar2)
    return <div>予期しないエラーが発生しました。</div>;

  const enemyCars = [enemyCar0, enemyCar1, enemyCar2];

  console.log(response, "response");
  if (!response) {
    return (
      <main>
        {submit && (
          <div className="flex flex-col z-50 items-center bg-basecolor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-accentcolor rounded-xl">
            <Image
              src="/loading.png"
              alt="loading"
              width={196}
              height={196}
              priority
              className="animate-spin"
            />
            <div className="p-4">
              <div className=" flex flex-col items-center bg-primarycolor text-2xl text-basecolor p-4 rounded-md border-4 border-accentcolor ">
                <p>ChatGPTの生成は時間がかかります！</p>
                <p>少々お待ちください。</p>
              </div>
            </div>
          </div>
        )}
        <Interactive
          order={1}
          scene={scene}
          isSubmit={submit}
          submit={onSubmit}
        />
      </main>
    );
  } else
    return (
      <main>
        <Progress order={1} scene={scene} cars={enemyCars} click={nextScene} />
      </main>
    );
}
