"use client";

import { useState } from "react";
import { Interactive } from "./Interactive";
import { Progress } from "./Progress";
import { useRouter } from "next/navigation";
import { SubmitProps, InteProps, ResponceProps, ProgProps } from "./type";
import { RaceData } from "@/app/race/type";
import { getRaceDataFromGpt } from "@/lib/race/action";

export default function Home() {
  const router = useRouter();
  // 場面を切り替えるためのState
  const [scene, setScene] = useState<number>(0);
  // InteractiveとProgressを切り替えるState
  const [responce, setResponce] = useState<boolean>(false);

  const testGetRaceInfoFromGpt = async (event: string) => {
    // Sample RaceData
    const sampleRaceData: RaceData = {
      "first_car_name": "string",
      "second_car_name": "string",
      "third_car_name": "string",
      "fourth_car_name": "string",
      "player_car_name": "string",
      "first_car_introduction": "string",
      "second_car_introduction": "string",
      "third_car_introduction": "string",
      "fourth_car_introduction": "string",
      "event": event
    };
    console.log("sampleRaceData", JSON.stringify(sampleRaceData));
    const responseJson = await getRaceDataFromGpt(sampleRaceData);
    console.log("responseJson:", responseJson);
    return true;
  };

  async function onSubmit(data: SubmitProps) {
    if (scene + 1 >= 3) {
      console.log("data:", data.text)
      router.push("/ending");
    } else {
      testGetRaceInfoFromGpt(data.text);
      setResponce(true);
    }
  }

  function nextScene(): void {
    setScene(scene + 1);
    setResponce(false);
  }

  console.log(scene);
  console.log(responce);

  if (!responce) {
    return (
      <main>
        <Interactive path="aaa" order={1} scene={scene} submit={onSubmit} />
      </main>
    );
  } else
    return (
      <main>
        <Progress order={1} scene={scene} click={nextScene} />
      </main>
    );
}
