import { RaceInfoRes, RaceData, RaceEndData } from "@/app/race/type";
import {
  RACE_RESPONSE_DATA,
  GENERATED_TEXT,
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
  FOURTH_PLACE,
  PLAYER_CAR,
  PLAYER_CAR_NAME,
  ENEMY_CAR,
  ENEMY_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
  ENEMY_CAR_INSTRUCTION,
  FIRST_CAR_NAME,
  SECOND_CAR_NAME,
  THIRD_CAR_NAME,
  FOURTH_CAR_NAME,
  FIRST_CAR_INSTRUCTION,
  SECOND_CAR_INSTRUCTION,
  THIRD_CAR_INSTRUCTION,
  FOURTH_CAR_INSTRUCTION,
  RACE_EVENT,
  PLAYER_LUCK,
} from "@/lib/const";

export const generateRaceEndRequestBody = (event: string) => {
  const raceRequestBody: RaceData = generateRaceRequestBody(event);
  const playerCar = localStorage.getItem(PLAYER_CAR);
  if (playerCar === null) {
    throw new Error("Player Car Data is not found.");
  }
  const playerCarInstruction: string =
    JSON.parse(playerCar)[PLAYER_CAR_INSTRUCTION];
  const playerCarLuck: number = JSON.parse(playerCar)[PLAYER_CAR_LUCK];
  const requestBody: RaceEndData = {
    ...raceRequestBody,
    [PLAYER_CAR_INSTRUCTION]: playerCarInstruction,
    [PLAYER_LUCK]: playerCarLuck,
  };
  return requestBody;
};

export const generateRaceRequestBody = (event: string) => {
  // localStorageに入っているResponseJson:RACE_INFO_RESPONSEを取得
  const responseJson = getResponseJson();
  // ResponseJsonから順位情報を取得する
  const firstPlace = responseJson[FIRST_PLACE];
  const secondPlace = responseJson[SECOND_PLACE];
  const thirdPlace = responseJson[THIRD_PLACE];
  const fourthPlace = responseJson[FOURTH_PLACE];
  // PLAYER_CAR_NAMEを取得する
  const playerCar = localStorage.getItem(PLAYER_CAR);
  if (playerCar === null) {
    throw new Error("Player Car Data is not found.");
  }
  const playerCarName: string = JSON.parse(playerCar)[PLAYER_CAR_NAME];
  // CAR_NAMEからCAR_INSTRUCTIONを取得する(関数)
  const firstCarInstruction = getCarInstruction(firstPlace);
  const secondCarInstruction = getCarInstruction(secondPlace);
  const thirdCarInstruction = getCarInstruction(thirdPlace);
  const fourthCarInstruction = getCarInstruction(fourthPlace);
  // REQUEST_BODYを構成
  const requestBody: RaceData = {
    [FIRST_CAR_NAME]: firstPlace,
    [SECOND_CAR_NAME]: secondPlace,
    [THIRD_CAR_NAME]: thirdPlace,
    [FOURTH_CAR_NAME]: fourthPlace,
    [PLAYER_CAR_NAME]: playerCarName,
    [FIRST_CAR_INSTRUCTION]: firstCarInstruction,
    [SECOND_CAR_INSTRUCTION]: secondCarInstruction,
    [THIRD_CAR_INSTRUCTION]: thirdCarInstruction,
    [FOURTH_CAR_INSTRUCTION]: fourthCarInstruction,
    [RACE_EVENT]: event,
  };
  return requestBody;
};

const getCarInstruction = (carName: string) => {
  const playerCar = localStorage.getItem(PLAYER_CAR);
  if (playerCar === null) {
    throw new Error("Player Car Data is not found.");
  }
  const playerCarName: string = JSON.parse(playerCar)[PLAYER_CAR_NAME];
  // PLAYER_CARおよびENEMY_CARのINSTRUCTIONを参照し、一致したら返却
  if (carName === playerCarName) {
    return JSON.parse(playerCar)[PLAYER_CAR_INSTRUCTION];
  }

  const enemyCar0 = localStorage.getItem(ENEMY_CAR + "_0");
  const enemyCar1 = localStorage.getItem(ENEMY_CAR + "_1");
  const enemyCar2 = localStorage.getItem(ENEMY_CAR + "_2");
  if (
    playerCarName === null ||
    enemyCar0 === null ||
    enemyCar1 === null ||
    enemyCar2 === null
  ) {
    throw new Error("Player Car or Enemy Car Data is not found.");
  }
  const enemyCarName0: string = JSON.parse(enemyCar0)[ENEMY_CAR_NAME];
  const enemyCarName1: string = JSON.parse(enemyCar1)[ENEMY_CAR_NAME];
  const enemyCarName2: string = JSON.parse(enemyCar2)[ENEMY_CAR_NAME];
  if (carName === enemyCarName0) {
    return JSON.parse(enemyCar0)[ENEMY_CAR_INSTRUCTION];
  }
  if (carName === enemyCarName1) {
    return JSON.parse(enemyCar1)[ENEMY_CAR_INSTRUCTION];
  }
  if (carName === enemyCarName2) {
    return JSON.parse(enemyCar2)[ENEMY_CAR_INSTRUCTION];
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

export const generateDummyResponseJson = () => {
  // ダミーデータを返却
  const playerCar = localStorage.getItem(PLAYER_CAR);
  if (playerCar === null) {
    throw new Error("Player Car Data is not found.");
  }
  const playerCarName: string = JSON.parse(playerCar)[PLAYER_CAR_NAME];
  const enemyCar0 = localStorage.getItem(ENEMY_CAR + "_0");
  const enemyCar1 = localStorage.getItem(ENEMY_CAR + "_1");
  const enemyCar2 = localStorage.getItem(ENEMY_CAR + "_2");
  if (
    playerCarName === null ||
    enemyCar0 === null ||
    enemyCar1 === null ||
    enemyCar2 === null
  ) {
    throw new Error("Player Car or Enemy Car Data is not found.");
  }
  const enemyCarName0: string = JSON.parse(enemyCar0)[ENEMY_CAR_NAME];
  const enemyCarName1: string = JSON.parse(enemyCar1)[ENEMY_CAR_NAME];
  const enemyCarName2: string = JSON.parse(enemyCar2)[ENEMY_CAR_NAME];
  const dummyRaceInfoRes: RaceInfoRes = {
    [GENERATED_TEXT]: "ダミーテキスト",
    [FIRST_PLACE]: playerCarName,
    [SECOND_PLACE]: enemyCarName0,
    [THIRD_PLACE]: enemyCarName1,
    [FOURTH_PLACE]: enemyCarName2,
  };
  return dummyRaceInfoRes;
};
