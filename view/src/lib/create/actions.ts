"use server";

import { PlayerCarRes, PlayerCarInput, EnemyCarRes } from "@/app/create/type";
import verifyToken from "../verifyToken";
import readEnv from "../readEnv";

const env = readEnv();

export const getPlayerCarDataFromGpt = async (data: PlayerCarInput, token: string) => {
  const isVerify = await verifyToken(token);
  if (!isVerify) {
    throw new Error("認証に失敗しました");
  }
  const endPoint = `${env.apiUrl}/car/create?text_inputted_by_user=${data.text}`;
  console.log("Endpoint:", endPoint);
  const responseJson: PlayerCarRes = await fetch(endPoint, {
    headers: {
      [env.apiId]: env.apiKey,
    },
  }).then((response) => response.json());
  return responseJson;
};

export const getEnemyCarDataFromGpt = async () => {
  const endPoint = `${env.apiUrl}/create/enemy`;
  console.log("Endpoint:", endPoint);
  const responseJson: EnemyCarRes = await fetch(endPoint, {
    headers: {
      [env.apiId]: env.apiKey,
    },
  }).then((response) => response.json());
  return responseJson;
};
