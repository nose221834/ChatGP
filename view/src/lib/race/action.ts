"use server";

import { RaceData, RaceEndData, RaceInfoRes } from "@/app/race/type";

const apiId = process.env.NEXT_PUBLIC_API_ACCESS_ID;
const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// レース中のインタラクティブな入出力に関するアクションを定義する
export const getRaceDataFromGpt = async (data: RaceData) => {
  if (!apiId || !apiKey || !apiUrl) return false;
  const endPoint = `${apiUrl}/race/middle_part`;
  const responseJson: RaceInfoRes = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [apiId]: apiKey,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error:", err);
      return false;
    });
  return responseJson;
};

export const getEndDataFromGpt = async (data: RaceEndData) => {
  if (!apiId || !apiKey || !apiUrl) return false;
  const endPoint = `${apiUrl}/race/ending`;
  const responseJson: RaceInfoRes = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [apiId]: apiKey,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error:", err);
      return false;
    });
  return responseJson;
};
