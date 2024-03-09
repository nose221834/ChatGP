import {
  PLAYER_CAR_IMAGE,
  PLAYER_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
} from "@/lib/const";

export type PlayerCarInput = {
  text: string;
};

export type PlayerCarRes = {
  [PLAYER_CAR_IMAGE]: string;
  [PLAYER_CAR_NAME]: string;
  [PLAYER_CAR_LUCK]: string;
  [PLAYER_CAR_INSTRUCTION]: string;
};