"use server";

import { PlayerCarRes, PlayerCarInput } from "@/app/create/type";

export const getPlayerCarDataFromGpt = async (data: PlayerCarInput) =>{
    const apiId = process.env.NEXT_PUBLIC_API_ACCESS_ID;
    const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiId || !apiKey || !apiUrl) return false;
    console.log("Endpoint:", `${apiUrl}/1/car/data?text=${data.text}`)
    const responseJson: PlayerCarRes = await fetch(`${apiUrl}/car/create?text_user_input=${data.text}`, {
      headers: {
        [apiId]: apiKey,
      },
    })
    .then((response) => response.json());
    return responseJson;
}