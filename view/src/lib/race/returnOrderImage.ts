import { RaceInfoRes, OrderedImages } from "@/app/race/type";

import {
  RACE_RESPONSE_DATA,
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
  FOURTH_PLACE,
  PLAYER_CAR,
  PLAYER_CAR_NAME,
  PLAYER_CAR_IMAGE,
  ENEMY_CAR,
  ENEMY_CAR_NAME,
  ENEMY_CAR_IMAGE,
} from "@/lib/const";

export const returnOrderImage = (responseJson: RaceInfoRes) => {
  // Response JSON から順位情報を取得する(関数)
  // const responseJson = getResponseJson();
  const firstPlace = responseJson[FIRST_PLACE];
  const secondPlace = responseJson[SECOND_PLACE];
  const thirdPlace = responseJson[THIRD_PLACE];
  const fourthPlace = responseJson[FOURTH_PLACE];
  // 車の名前に対応する画像を返す(関数)
  const firstCarImage: string = getCarImage(firstPlace);
  const secondCarImage: string = getCarImage(secondPlace);
  const thirdCarImage: string = getCarImage(thirdPlace);
  const fourthCarImage: string = getCarImage(fourthPlace);
  // OrderedImages型で画像を返す
  const orderedImages: OrderedImages = {
    [FIRST_PLACE]: firstCarImage,
    [SECOND_PLACE]: secondCarImage,
    [THIRD_PLACE]: thirdCarImage,
    [FOURTH_PLACE]: fourthCarImage,
  };
  return orderedImages;
};

const getResponseJson = () => {
  const responseJson = localStorage.getItem(RACE_RESPONSE_DATA);
  if (responseJson === null) {
    // 何もない場合は、エラーをthrowする
    throw new Error("Response Data is not found.");
  }
  return JSON.parse(responseJson) as RaceInfoRes;
};

const getCarImage = (carName: string) => {
  const playerCar = localStorage.getItem(PLAYER_CAR);
  if (playerCar === null) {
    throw new Error("Player Car Data is not found.");
  }
  const playerCarName: string = JSON.parse(playerCar)[PLAYER_CAR_NAME];
  // PLAYER_CARおよびENEMY_CARのINSTRUCTIONを参照し、一致したら返却
  if (carName === playerCarName) {
    return JSON.parse(playerCar)[PLAYER_CAR_IMAGE];
  }

  const enemyCar0 = localStorage.getItem(ENEMY_CAR + "_0");
  const enemyCar1 = localStorage.getItem(ENEMY_CAR + "_1");
  const enemyCar2 = localStorage.getItem(ENEMY_CAR + "_2");
  if (playerCarName === null || enemyCar0 === null || enemyCar1 === null || enemyCar2 === null) {
    throw new Error("Player Car or Enemy Car Data is not found.");
  }
  const enemyCarName0: string = JSON.parse(enemyCar0)[ENEMY_CAR_NAME];
  const enemyCarName1: string = JSON.parse(enemyCar1)[ENEMY_CAR_NAME];
  const enemyCarName2: string = JSON.parse(enemyCar2)[ENEMY_CAR_NAME];
  if (carName === enemyCarName0) {
    return JSON.parse(enemyCar0)[ENEMY_CAR_IMAGE];
  }
  if (carName === enemyCarName1) {
    return JSON.parse(enemyCar1)[ENEMY_CAR_IMAGE];
  }
  if (carName === enemyCarName2) {
    return JSON.parse(enemyCar2)[ENEMY_CAR_IMAGE];
  }
};
