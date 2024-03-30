import { SubmitHandler } from "react-hook-form";
import {
  GENERATED_TEXT,
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
  FOURTH_PLACE,
  FIRST_CAR_NAME,
  SECOND_CAR_NAME,
  THIRD_CAR_NAME,
  FOURTH_CAR_NAME,
  FIRST_CAR_INSTRUCTION,
  SECOND_CAR_INSTRUCTION,
  THIRD_CAR_INSTRUCTION,
  FOURTH_CAR_INSTRUCTION,
  RACE_EVENT,
  PLAYER_CAR_INSTRUCTION,
  PLAYER_LUCK,
  PLAYER_CAR_NAME,
} from "@/lib/const";

export type SubmitProps = {
  event: string;
};

export type InteProps = {
  order: number;
  scene: number;
  isSubmit: boolean;
  submit: SubmitHandler<SubmitProps>;
};

export type ResponseProps = {
  text: string;
};

export type ProgProps = {
  loader: boolean;
  order: number;
  text: string;
  carImages: OrderedImages;
  click: () => void;
};

export type RaceInfoRes = {
  [GENERATED_TEXT]: string;
  [FIRST_PLACE]: string;
  [SECOND_PLACE]: string;
  [THIRD_PLACE]: string;
  [FOURTH_PLACE]: string;
};

export type RaceData = {
  [FIRST_CAR_NAME]: string;
  [SECOND_CAR_NAME]: string;
  [THIRD_CAR_NAME]: string;
  [FOURTH_CAR_NAME]: string;
  [PLAYER_CAR_NAME]: string;
  [FIRST_CAR_INSTRUCTION]: string;
  [SECOND_CAR_INSTRUCTION]: string;
  [THIRD_CAR_INSTRUCTION]: string;
  [FOURTH_CAR_INSTRUCTION]: string;
  [RACE_EVENT]: string;
};

export type RaceEndData = {
  [FIRST_CAR_NAME]: string;
  [SECOND_CAR_NAME]: string;
  [THIRD_CAR_NAME]: string;
  [FOURTH_CAR_NAME]: string;
  [PLAYER_CAR_NAME]: string;
  [FIRST_CAR_INSTRUCTION]: string;
  [SECOND_CAR_INSTRUCTION]: string;
  [THIRD_CAR_INSTRUCTION]: string;
  [FOURTH_CAR_INSTRUCTION]: string;
  [RACE_EVENT]: string;
  [PLAYER_CAR_INSTRUCTION]: string;
  [PLAYER_LUCK]: number;
};

export type OrderedImages = {
  [FIRST_PLACE]: string;
  [SECOND_PLACE]: string;
  [THIRD_PLACE]: string;
  [FOURTH_PLACE]: string;
};
