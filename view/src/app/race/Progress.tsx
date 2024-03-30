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
    <div className="flex h-screen w-screen flex-col items-center justify-around overflow-hidden bg-basecolor">
      <Image
        src="/progress.webp"
        alt="scene"
        width={1792}
        height={1024}
        className="absolute z-0 h-full w-full object-cover object-center"
      />
      <div className="z-10 flex h-1/2 w-3/5 flex-col items-center justify-around p-4">
        <div className="flex h-full w-full flex-col  items-center justify-around p-4">
          <div className="w-11/12 p-8 text-center text-4xl font-extrabold  tracking-wider">
            <p className=" text-basecolor text-shadow-edge">{text}</p>
          </div>
          <div className="flex w-full justify-end">
            <div>
              <Button
                onClick={handleClick}
                className=" h-12 bg-accentcolor text-center  text-xl text-basecolor hover:bg-secondarycolor "
              >
                次のフェーズへ移動！
              </Button>
            </div>
          </div>
        </div>
      </div>
      {loader ? (
        <div className="z-10 flex h-3/4 w-full justify-between p-4">
          <div className="flex h-full flex-col justify-start overflow-hidden">
            <Card className="bg-tranparent border-4 border-basecolor">
              <Image
                src={orderImage}
                alt="order"
                width={200}
                height={200}
                className="object-contain object-center"
                priority
              />
            </Card>
          </div>
          <div className="flex h-full w-4/5 items-center justify-around p-4">
            <div className="flex h-full w-full flex-col justify-start ">
              <div className=" h-1/5"></div>
              <Image
                src={carImages.fourth_place}
                alt="enemy0"
                width={168}
                height={168}
                className=" animate-jello-horizontal"
              />
            </div>
            <div className="flex h-full w-full flex-col justify-start">
              <div className="flex w-full justify-end ">
                <Image
                  src={carImages.third_place}
                  alt="enemy1"
                  width={168}
                  height={168}
                  className=" animate-vibrate-1"
                />
              </div>
            </div>
            <div className="flex h-full w-full flex-col justify-end">
              <Image
                src={carImages.second_place}
                alt="enemy2"
                width={168}
                height={168}
                className=" animate-vibrate-1"
              />
            </div>
            <div className="flex h-full w-full flex-col justify-around">
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
        <div className="whitespace-normal text-2xl font-bold text-accentyellow">Loading</div>
      )}
    </div>
  );
}
