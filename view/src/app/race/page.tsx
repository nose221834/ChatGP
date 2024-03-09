"use client";

import { useState, useEffect } from "react";
import { Interactive } from "./Interactive";
import { Progress } from "./Progress";
import { useRouter } from "next/navigation";
import { SubmitProps, InteProps, ResponseProps, ProgProps } from "./type";
import { RaceData } from "@/app/race/type";
import { getRaceDataFromGpt, getEndDataFromGpt } from "@/lib/race/action";
import {
  PLAYER_CAR,
  PLAYER_CAR_IMAGE,
  PLAYER_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
  PLAYER_CAR_FORTUNE,
  RACE_EVENT,
  RACE_RESPONSE_DATA,
  ENEMY_CAR,
} from "@/lib/const";
import { PlayerCarRes } from "@/app/create/type";

export default function Home() {
  const router = useRouter();

  const [scene, setScene] = useState<number>(0);
  const [response, setResponse] = useState<boolean>(false);

  // Sample RaceData
  const sampleRaceData: RaceData = {
    first_car_name: "string",
    second_car_name: "string",
    third_car_name: "string",
    fourth_car_name: "string",
    player_car_name: "string",
    first_car_instruction: "string",
    second_car_instruction: "string",
    third_car_instruction: "string",
    fourth_car_instruction: "string",
    event: "event",
  };

  const testGetRaceInfoFromGpt = async (event: string) => {
    // Sample RaceData
    console.log("sampleRaceData", JSON.stringify(sampleRaceData));
    const responseJson = await getRaceDataFromGpt(sampleRaceData);
    console.log("responseJson:", responseJson);
    return true;
  };

  async function onSubmit(data: SubmitProps) {
    if (scene + 1 >= 3) {
      console.log("scene + 1 >= 3");
      const previousResponse = localStorage.getItem(RACE_RESPONSE_DATA);
      if (previousResponse) {
        const previousJson = JSON.parse(previousResponse) as RaceData;
        const sendJson = {
          ...previousJson,
          [RACE_EVENT]: data.event,
        };
        // const responseJson = await getEndDataFromGpt(sendJson);
        // localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
        router.push("/race/ending");
      }
    } else {
      console.log("router.push()");
      const previousResponse = localStorage.getItem(RACE_RESPONSE_DATA);
      if (previousResponse) {
        console.log(previousResponse, "previousResponse");
        const previousJson = JSON.parse(previousResponse) as RaceData;
        const sendJson = {
          ...previousJson,
          [RACE_EVENT]: data.event,
        };
        const responseJson = await getRaceDataFromGpt(sendJson);
        if (!responseJson) return <div>Error</div>;
        localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
        setResponse(true);
      }
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
