"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubmitProps, InteProps } from "./type";
import { Messages } from "./messages";

export function Interactive({ order, scene, isSubmit, submit, token }: InteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
    defaultValues: {
      event: "なんかかいてね",
    },
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between overflow-hidden bg-basecolor">
      <Image
        src={`/race${scene}.webp`}
        alt="scene"
        width={1792}
        height={1024}
        className="absolute z-0 h-full w-full object-cover object-center"
      />
      <div className="z-10 flex h-1/2 w-3/5 flex-col items-center justify-around p-4">
        <div className="flex h-full w-full flex-col  items-center justify-around p-4">
          <div className="w-11/12 p-8 text-center text-4xl font-extrabold  tracking-wider">
            <Messages scene={scene} order={order} />
          </div>
        </div>
      </div>
      <div className="z-10 flex w-11/12 flex-col items-center justify-around p-4">
        <Card className="flex h-full w-full flex-col justify-around bg-basecolor p-4">
          <form onSubmit={handleSubmit(submit)}>
            <Textarea
              className="border-2 border-accentcolor text-center text-2xl"
              rows={1}
              {...register("event", { required: true, maxLength: 20 })}
            ></Textarea>
            {errors.event && (
              <div className="p-4">
                <div className=" rounded-xl border-4 border-secondarycolor bg-basecolor p-2 text-center text-2xl font-bold text-accentcolor">
                  20文字以内で入力してください
                </div>
              </div>
            )}
            <div className="flex justify-end p-4">
              <Button
                disabled={isSubmit || !token ? true : false}
                className=" h-12 w-24 bg-accentcolor text-center text-xl tracking-widest text-basecolor hover:bg-secondarycolor"
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
