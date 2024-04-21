"use server";

import { RaceData, RaceEndData, RaceInfoRes } from "@/app/race/type";
import verifyToken from "../verifyToken";
import readEnv from "../readEnv";

// レース中のインタラクティブな入出力に関するアクションを定義する
export const getRaceDataFromGpt = async (data: RaceData, token: string) => {
  const env = readEnv();
  const isVerify = await verifyToken(token);
  if (!isVerify) {
    throw new Error("認証に失敗しました");
  }

  const endPoint = `${env.apiUrl}/race/middle_part`;
  console.log("Request Body:", data);
  console.log("Endpoint:", endPoint);
  const responseJson: RaceInfoRes = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [env.apiId]: env.apiKey,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error:", err);
      return false;
    });
  console.log("responseJson:", responseJson);
  return responseJson;
};

export const getEndDataFromGpt = async (data: RaceEndData, token: string) => {
  const env = readEnv();
  const isVerify = await verifyToken(token);
  if (!isVerify) {
    throw new Error("認証に失敗しました");
  }
  const endPoint = `${env.apiUrl}/race/ending`;
  const responseJson: RaceInfoRes = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [env.apiId]: env.apiKey,
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
