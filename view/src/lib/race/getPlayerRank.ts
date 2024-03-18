"use client";

import { RaceInfoRes } from "@/app/race/type";
import { generateDummyResponseJson } from "@/lib/race/generateRequestBody";
import {
  RACE_RESPONSE_DATA,
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
  FOURTH_PLACE,
  PLAYER_CAR,
  PLAYER_CAR_NAME,
} from "@/lib/const";

export const getPlayerRank = () => {
  // PLAYER_NAMEの取得
  const playerCar = localStorage.getItem(PLAYER_CAR);
  if (playerCar === null) {
    throw new Error("Player Car Data is not found.");
  }
  const playerCarName: string = JSON.parse(playerCar)[PLAYER_CAR_NAME];
  // PLAYER_NAMEに対応する順位を取得(関数)
  const playerRank = getRank(playerCarName);
  return playerRank;
};

const getRank = (carName: string) => {
  const responseJson = getResponseJson();
  if (responseJson[FIRST_PLACE] === carName) {
    return 1;
  }
  if (responseJson[SECOND_PLACE] === carName) {
    return 2;
  }
  if (responseJson[THIRD_PLACE] === carName) {
    return 3;
  }
  if (responseJson[FOURTH_PLACE] === carName) {
    return 4;
  }
};

const getResponseJson = () => {
  const responseJson = localStorage.getItem(RACE_RESPONSE_DATA);
  if (responseJson === null) {
    // 何もない場合は、仮のデータを返却する
    const dummyResponseJson = generateDummyResponseJson();
    localStorage.setItem(RACE_RESPONSE_DATA, JSON.stringify(dummyResponseJson));
    return dummyResponseJson;
  }
  return JSON.parse(responseJson) as RaceInfoRes;
};
