import { PlayerCarRes, EnemyCarRes } from "@/app/create/type";
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

const toBlob = async (base64: string) => {
  try {
    const bin = atob(base64);
    const buffer = new Uint8Array(bin.length).map((_, i) => bin.charCodeAt(i));
    const blob = new Blob([buffer], { type: "image/png" });
    return blob;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const validatePlayerCarRes = async (carDataJson: PlayerCarRes) => {
  const dataBase64 = carDataJson[PLAYER_CAR_IMAGE];
  const playerCarName = carDataJson[PLAYER_CAR_NAME];
  const playerCarLuck = carDataJson[PLAYER_CAR_LUCK];
  const playerCarInstruction = carDataJson[PLAYER_CAR_INSTRUCTION];
  // 文字型かどうかのチェック
  if (typeof dataBase64 !== "string") return false;
  if (typeof playerCarName !== "string") return false;
  if (typeof playerCarInstruction !== "string") return false;
  // 数値型かどうかのチェック
  if (typeof playerCarLuck !== "number") return false;
  // base64をblobに変換
  const blob = await toBlob(dataBase64);
  if (!blob) return false; // 変換に失敗した場合
  // blobをurlに変換
  const url = URL.createObjectURL(blob);
  // ImageをUrlに変更したJSONを返却
  const carDataJsonWithUrl = {
    ...carDataJson, // スプレッド構文を用いて、元のオブジェクトを展開
    [PLAYER_CAR_IMAGE]: url, // ImageのみURLで上書き
  };
  return carDataJsonWithUrl;
};

export const validateEnemyCarRes = async (carDataJson: EnemyCarRes) => {
  const dataBase64 = carDataJson[ENEMY_CAR_IMAGE];
  const enemyCarName = carDataJson[ENEMY_CAR_NAME];
  const enemyCarLuck = carDataJson[ENEMY_CAR_LUCK];
  const enemyCarInstruction = carDataJson[ENEMY_CAR_INSTRUCTION];
  // 文字型かどうかのチェック
  if (typeof dataBase64 !== "string") return false;
  if (typeof enemyCarName !== "string") return false;
  if (typeof enemyCarInstruction !== "string") return false;
  // 数値型かどうかのチェック
  if (typeof enemyCarLuck !== "number") return false;
  // base64をblobに変換
  const blob = await toBlob(dataBase64);
  if (!blob) return false; // 変換に失敗した場合
  // blobをurlに変換
  const url = URL.createObjectURL(blob);
  // ImageをUrlに変更したJSONを返却
  const carDataJsonWithUrl = {
    ...carDataJson, // スプレッド構文を用いて、元のオブジェクトを展開
    [ENEMY_CAR_IMAGE]: url, // ImageのみURLで上書き
  };
  return carDataJsonWithUrl;
};
