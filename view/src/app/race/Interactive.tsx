"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubmitProps, InteProps, ResponseProps, ProgProps } from "./type";
import { Messages } from "./messages";
import { getPlayerRank } from "@/lib/race/getPlayerRank";

export function Interactive({ order, scene, isSubmit, submit }: InteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
    defaultValues: {
      event: "なんかかいてね",
    },
  });

  console.log("scene", scene);

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen overflow-hidden bg-basecolor">
      <Image
        src={`/race${scene}.webp`}
        alt="scene"
        width={1792}
        height={1024}
        className="h-full w-full object-center object-cover z-0 absolute"
      />
      <div className="flex flex-col justify-around items-center z-10 p-4 w-3/5 h-1/2">
        <div className="flex flex-col justify-around items-center  h-full w-full p-4">
          <div className="font-extrabold text-4xl tracking-wider text-center w-11/12  p-8">
            <Messages scene={scene} order={order} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around items-center z-10 p-4 w-11/12">
        <Card className="flex flex-col justify-around bg-basecolor h-full w-full p-4">
          <form onSubmit={handleSubmit(submit)}>
            <Textarea
              className="text-center text-2xl border-2 border-accentcolor"
              rows={1}
              {...register("event", { required: true, maxLength: 20 })}
            ></Textarea>
            {errors.event && (
              <div className="p-4">
                <div className=" bg-basecolor border-secondarycolor border-4 text-2xl text-center text-accentcolor font-bold p-2 rounded-xl">
                  20文字以内で入力してください
                </div>
              </div>
            )}
            <div className="flex p-4 justify-end">
              <Button
                disabled={isSubmit}
                className=" bg-accentcolor hover:bg-secondarycolor text-basecolor w-24 h-12 text-xl text-center tracking-widest"
              >
                送信
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
