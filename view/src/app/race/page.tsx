"use client";

import { useState, useEffect } from "react";
import { Interactive } from "./Interactive";
import { Progress } from "./Progress";
import { useRouter } from "next/navigation";
import { SubmitProps, OrderedImages, RaceInfoRes } from "./type";
import { RaceData, RaceEndData } from "@/app/race/type";
import { getRaceDataFromGpt, getEndDataFromGpt } from "@/lib/race/action";
import { Loading } from "@/components/Loading";
import {
  RACE_CAR_IMAGES,
  RACE_RESPONSE_DATA,
  GENERATED_TEXT,
} from "@/lib/const";
import {
  generateRaceRequestBody,
  generateRaceEndRequestBody,
} from "@/lib/race/generateRequestBody";
import { returnOrderImage } from "@/lib/race/returnOrderImage";
import { getPlayerRank } from "@/lib/race/getPlayerRank";

export default function Home() {
  const InitialCarImages: OrderedImages = {
    first_place: "",
    second_place: "",
    third_place: "",
    fourth_place: "",
  };

  const router = useRouter();
  // 送信したときにボタンを押せなくする
  const [submit, setSubmit] = useState<boolean>(false);

  // useEffectによるロードを判定する
  const [loader, setLoader] = useState(false);

  // 場面を切り替える
  const [scene, setScene] = useState<number>(0);

  // InteractiveとProgressを切り替える
  const [response, setResponse] = useState<boolean>(false);

  // 両ページで表示させる順位
  const [order, setOrder] = useState<number>(0);

  // Progressで使用する
  const [text, setText] = useState<string>("");
  const [carImages, setCarImages] = useState<OrderedImages>(InitialCarImages);

  // responseが返ってきたときにresponseから値を取り出す
  useEffect(() => {
    const carDataString = localStorage.getItem(RACE_CAR_IMAGES);
    const responseData = localStorage.getItem(RACE_RESPONSE_DATA);
    const orderNum = getPlayerRank();
    if (carDataString && responseData && orderNum) {
      const carIMagesJson = JSON.parse(carDataString) as OrderedImages;
      const responseJson = JSON.parse(responseData) as RaceInfoRes;
      const responseText = responseJson[GENERATED_TEXT];
      setText(responseText);
      setCarImages(carIMagesJson);
      setOrder(orderNum);
      setLoader(true);
    }
  }, [response]);

  async function onSubmit(data: SubmitProps) {
    if (scene + 1 >= 3) {
      setSubmit(true);
      const requestBody: RaceEndData = generateRaceEndRequestBody(data.event);
      const responseJson = await getEndDataFromGpt(requestBody);
      if (!responseJson) return <div>Error</div>;
      localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
      router.push("/ending");
    } else {
      setSubmit(true);
      const requestBody: RaceData = generateRaceRequestBody(data.event);
      const responseJson = await getRaceDataFromGpt(requestBody);
      if (!responseJson) return <div>Error</div>;
      const carImagesData = returnOrderImage(responseJson);
      localStorage.setItem(RACE_CAR_IMAGES, JSON.stringify(carImagesData));
      localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(responseJson));
      setResponse(true);
    }
  }

  function nextScene() {
    setScene(scene + 1);
    setResponse(false);
    setSubmit(false);
  }

  if (!response) {
    return (
      <main>
        {submit && <Loading />}
        <Interactive
          order={order}
          scene={scene}
          isSubmit={submit}
          submit={onSubmit}
        />
      </main>
    );
  } else
    return (
      <main>
        <Progress
          order={order}
          loader={loader}
          text={text}
          carImages={carImages}
          click={nextScene}
        />
      </main>
    );
}
