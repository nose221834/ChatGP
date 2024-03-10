import { ProgProps } from "./type";
import Image from "next/image";
import { PLAYER_CAR, RACE_RESPONSE_DATA } from "@/lib/const";
import { useRouter } from "next/navigation";

export function Progress({ order, scene, cars, click }: ProgProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
  };

  const router = useRouter();

  const userDataString = localStorage.getItem(PLAYER_CAR);
  const responseData = localStorage.getItem(RACE_RESPONSE_DATA);
  if (!userDataString || !responseData)
    return (
      <div>
        <p>想定していないエラーが発生しています。</p>
        <p>リロードしてください。</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-around w-screen h-screen overflow-hidden bg-basecolor">
      <Image
        src="/progress.webp"
        alt="scene"
        width={1792}
        height={1024}
        className="h-full w-full object-center object-cover z-0 absolute"
      />
      <div className="flex flex-col justify-around items-center z-10 p-4 w-3/5 h-1/2">
        <div className="flex flex-col justify-around items-center  h-full w-full p-4">
          <div className="font-extrabold text-4xl tracking-wider text-center w-11/12  p-8">
            <p className=" text-shadow-edge text-basecolor">
              ここにうけとった文章
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end z-10 w-full h-3/4 p-4">
        <div className="flex justify-around items-center w-4/5 h-full p-4">
          <div className="flex flex-col justify-start w-full h-full ">
            <div className=" h-1/5"></div>
            <Image
              src="/announcer.webp"
              alt="enemy0"
              width={168}
              height={168}
              className=" animate-jello-horizontal"
            />
          </div>
          <div className="flex flex-col justify-start w-full h-full">
            <div className="flex justify-end w-full ">
              <Image
                src="/announcer.webp"
                alt="enemy1"
                width={168}
                height={168}
                className=" animate-vibrate-1"
              />
            </div>
          </div>
          <div className="flex flex-col justify-end w-full h-full">
            <Image
              src="/announcer.webp"
              alt="enemy2"
              width={168}
              height={168}
              className=" animate-vibrate-1"
            />
          </div>
          <div className="flex flex-col justify-around w-full h-full">
            <Image
              src="/announcer.webp"
              alt="enemy3"
              width={168}
              height={168}
              className=" animate-heartbeat"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
