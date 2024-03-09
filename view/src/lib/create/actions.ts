"use server";

import {
  PLAYER_CAR_IMAGE,
  PLAYER_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
} from "@/lib/const";

type Input = {
  text: string;
};

type ResponseJson = {
  [PLAYER_CAR_IMAGE]: string;
  [PLAYER_CAR_NAME]: string;
  [PLAYER_CAR_LUCK]: string;
  [PLAYER_CAR_INSTRUCTION]: string;
};

export const getPlayerCarDataFromGpt = async (data: Input) =>{
    const apiId = process.env.NEXT_PUBLIC_API_ACCESS_ID;
    const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiId || !apiKey || !apiUrl) return false;
    console.log("Endpoint:", `${apiUrl}/1/car/data?text=${data.text}`)
    const responseJson: ResponseJson = await fetch(`${apiUrl}/1/car/data?text=${data.text}`, {
      headers: {
        [apiId]: apiKey,
      },
    })
    .then((response) => response.json());
    return responseJson;
}