"use client";

import { ProgProps } from "./type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Progress({ loader, order, text, carImages, click }: ProgProps) {
  const orderImage = `/order_img/order_${order}.png`;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
  };

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
            <p className=" text-shadow-edge text-basecolor">{text}</p>
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
      {loader ? (
        <div className="flex justify-between z-10 w-full h-3/4 p-4">
          <div className="flex flex-col justify-start h-full overflow-hidden">
            <Card className="border-4 bg-tranparent border-basecolor">
              <Image
                src={orderImage}
                alt="order"
                width={200}
                height={200}
                className="object-center object-contain"
                priority
              />
            </Card>
          </div>
          <div className="flex justify-around items-center w-4/5 h-full p-4">
            <div className="flex flex-col justify-start w-full h-full ">
              <div className=" h-1/5"></div>
              <Image
                src={carImages.fourth_place}
                alt="enemy0"
                width={168}
                height={168}
                className=" animate-jello-horizontal"
              />
            </div>
            <div className="flex flex-col justify-start w-full h-full">
              <div className="flex justify-end w-full ">
                <Image
                  src={carImages.third_place}
                  alt="enemy1"
                  width={168}
                  height={168}
                  className=" animate-vibrate-1"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end w-full h-full">
              <Image
                src={carImages.second_place}
                alt="enemy2"
                width={168}
                height={168}
                className=" animate-vibrate-1"
              />
            </div>
            <div className="flex flex-col justify-around w-full h-full">
              <Image
                src={carImages.first_place}
                alt="enemy3"
                width={168}
                height={168}
                className=" animate-heartbeat"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="whitespace-normal text-accentyellow text-2xl font-bold">
          Loading
        </div>
      )}
    </div>
  );
}
