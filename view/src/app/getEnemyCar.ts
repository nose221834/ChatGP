import { getEnemyCarDataFromGpt } from "@/lib/create/actions";
import { validateEnemyCarRes } from "@/lib/validator/carDataValidator";
import { ENEMY_CAR, ENEMY_CAR_NAME } from "@/lib/const";
import { EnemyCarRes } from "@/app/create/type";

export const getEnemyCar = async () => {
  // ランダムにEnemy Car Dataを1つ返すAPIを叩き、
  // 異なる3台のEnemy Car Dataを取得する
  // 取得したDataはlocalStorageに保存し、
  // 処理が終わったらtrueをそれ以外ならfalseを返す
  console.log("Get Enemy Car Data...");
  let enemyCarSet = new Set<string>();
  while (enemyCarSet.size < 3) {
    const enemyCarData = await getEnemyCarDataFromGpt();
    if (!enemyCarData) return false;
    const enemyCarDataWithUrl = await validateEnemyCarRes(enemyCarData);
    if (!enemyCarDataWithUrl) return false;
    const enemyCarName = enemyCarDataWithUrl[ENEMY_CAR_NAME];
    if (enemyCarSet.has(enemyCarName)) continue;
    setEnemyCar(enemyCarSet.size, enemyCarDataWithUrl);
    enemyCarSet.add(enemyCarName);
  }
  return true;
};

const setEnemyCar = (
  currentEnemyCount: number,
  enemyCarDataWithUrl: EnemyCarRes
) => {
  // localStorageにすでに値が存在する場合は、保存しない
  const ENEMY_CAR_KEY = ENEMY_CAR + "_" + currentEnemyCount.toString();
  if (localStorage.getItem(ENEMY_CAR_KEY)) return false;
  console.log("Saved Enemy Car Data:");
  localStorage.setItem(ENEMY_CAR_KEY, JSON.stringify(enemyCarDataWithUrl));
  return true;
};
