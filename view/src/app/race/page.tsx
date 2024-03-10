"use client";

import { useState, useEffect } from "react";
import { Interactive } from "./Interactive";
import { Progress } from "./Progress";
import { useRouter } from "next/navigation";
import { SubmitProps } from "./type";
import { RaceData, RaceEndData } from "@/app/race/type";
import { getRaceDataFromGpt, getEndDataFromGpt } from "@/lib/race/action";
import { ENEMY_CAR, RACE_EVENT, RACE_RESPONSE_DATA } from "@/lib/const";
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

  async function onSubmit(data: SubmitProps) {
    if (scene + 1 >= 3) {
      console.log("scene + 1 >= 3");
      const requestBody: RaceEndData = generateRaceEndRequestBody(data.event);
      const responseJson = await getEndDataFromGpt(requestBody);
      console.log("responseJson:", responseJson);
      if (!responseJson) return <div>Error</div>;
      localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
      router.push("/race/ending");
      // }
    } else {
      console.log("router.push()");
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
        <Interactive order={1} scene={scene} submit={onSubmit} />
      </main>
    );
  } else
    return (
      <main>
        <Progress order={1} scene={scene} cars={enemyCars} click={nextScene} />
      </main>
    );
}
