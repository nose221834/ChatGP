import {
  PLAYER_CAR_IMAGE,
  PLAYER_CAR_NAME,
  PLAYER_CAR_LUCK,
  PLAYER_CAR_INSTRUCTION,
  ENEMY_CAR_IMAGE,
  ENEMY_CAR_NAME,
  ENEMY_CAR_LUCK,
  ENEMY_CAR_INSTRUCTION,
} from "@/lib/const";

export type PlayerCarInput = {
  text: string;
};

export type PlayerCarRes = {
  [PLAYER_CAR_IMAGE]: string;
  [PLAYER_CAR_NAME]: string;
  [PLAYER_CAR_LUCK]: number;
  [PLAYER_CAR_INSTRUCTION]: string;
};

export type EnemyCarRes = {
  [ENEMY_CAR_IMAGE]: string;
  [ENEMY_CAR_NAME]: string;
  [ENEMY_CAR_LUCK]: number;
  [ENEMY_CAR_INSTRUCTION]: string;
};
