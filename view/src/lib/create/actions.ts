"use server";

import { PlayerCarRes, PlayerCarInput, EnemyCarRes } from "@/app/create/type";

const apiId = process.env.NEXT_PUBLIC_API_ACCESS_ID;
const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPlayerCarDataFromGpt = async (data: PlayerCarInput) => {
  if (!apiId || !apiKey || !apiUrl) return false;
  const endPoint = `${apiUrl}/car/create?text_inputted_by_user=${data.text}`;
  const responseJson: PlayerCarRes = await fetch(endPoint, {
    headers: {
      [apiId]: apiKey,
    },
  }).then((response) => response.json());
  return responseJson;
};

export const getEnemyCarDataFromGpt = async () => {
  if (!apiId || !apiKey || !apiUrl) return false;
  const endPoint = `${apiUrl}/create/enemy`;
  const responseJson: EnemyCarRes = await fetch(endPoint, {
    headers: {
      [apiId]: apiKey,
    },
  }).then((response) => response.json());
  return responseJson;
};
