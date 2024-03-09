import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  scene: number;
  order: number;
};

export function Messages({ scene, order }: Props) {
  const router = useRouter();

  function handleClick() {
    router.push("/");
  }

  if (scene === 0) {
    return (
      <div className=" text-shadow-edge flex flex-col flex-nowrap items-center justify-around">
        <p>これからスタートだ！</p>
        <p>あなたはどうスタートする？</p>
      </div>
    );
  } else if (scene === 1) {
    return (
      <div className=" text-shadow-edge flex flex-col flex-nowrap items-center justify-around">
        <p>現在{order}位！レース中盤だ！</p>
        <p>カーブが目の前にある！</p>
        <p>あなたはどうする？</p>
      </div>
    );
  } else if (scene === 2) {
    return (
      <div className=" text-shadow-edge flex flex-col flex-nowrap items-center justify-around">
        <p>現在{order}位！レース終盤だ！</p>
        <p>最後の直線だ！</p>
        <p>あなたはどうする？</p>
      </div>
    );
  } else {
    return (
      <div className=" text-shadow-edge flex flex-col flex-nowrap items-center justify-around">
        <p>予期しないエラーが発生しています。</p>
        <p>下のボタンからスタートに戻ってください</p>
        <Button onClick={handleClick}>こちらからリロードしてください。</Button>
      </div>
    );
  }
}
