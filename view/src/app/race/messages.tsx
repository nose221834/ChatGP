export function messages(scene: number) {
  if (scene === 0) {
    return "これからスタートだ！あなたはどうスタートする？";
  } else if (scene === 1) {
    return "レース中盤だ！カーブが目の前にある！あなたはどうする？";
  } else if (scene === 2) {
    return "レース終盤だ！最後の直線だ！あなたはどうする？";
  } else {
    return undefined;
  }
}

// TODO 順位を受け取って、コンポーネントとして返すようにする
