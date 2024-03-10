import { ProgProps } from "./type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  RACE_CAR_IMAGES,
  RACE_RESPONSE_DATA,
  GENERATED_TEXT,
} from "@/lib/const";
import { OrderedImages, RaceInfoRes } from "./type";

export function Progress({ click }: ProgProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
  };

  const router = useRouter();

  const carDataString = localStorage.getItem(RACE_CAR_IMAGES);
  const responseData = localStorage.getItem(RACE_RESPONSE_DATA);
  if (!carDataString || !responseData)
    return (
      <div>
        <p>想定していないエラーが発生しています。</p>
        <p>リロードしてください。</p>
      </div>
    );
  const carIMagesJson = JSON.parse(carDataString) as OrderedImages;
  const responseJson = JSON.parse(responseData) as RaceInfoRes;
  const responseText = responseJson[GENERATED_TEXT];

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
            <p className=" text-shadow-edge text-basecolor">{responseText}</p>
          </div>
          <div className="flex justify-end w-full">
            <div>
              <Button
                onClick={handleClick}
                className=" bg-accentcolor hover:bg-secondarycolor text-basecolor  h-12 text-xl text-center "
              >
                次のフェーズへ移動！
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end z-10 w-full h-3/4 p-4">
        <div className="flex justify-around items-center w-4/5 h-full p-4">
          <div className="flex flex-col justify-start w-full h-full ">
            <div className=" h-1/5"></div>
            <Image
              src={carIMagesJson.first_place}
              alt="enemy0"
              width={168}
              height={168}
              className=" animate-jello-horizontal"
            />
          </div>
          <div className="flex flex-col justify-start w-full h-full">
            <div className="flex justify-end w-full ">
              <Image
                src={carIMagesJson.second_place}
                alt="enemy1"
                width={168}
                height={168}
                className=" animate-vibrate-1"
              />
            </div>
          </div>
          <div className="flex flex-col justify-end w-full h-full">
            <Image
              src={carIMagesJson.third_place}
              alt="enemy2"
              width={168}
              height={168}
              className=" animate-vibrate-1"
            />
          </div>
          <div className="flex flex-col justify-around w-full h-full">
            <Image
              src={carIMagesJson.fourth_place}
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
