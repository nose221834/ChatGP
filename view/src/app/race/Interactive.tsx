"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SubmitProps, InteProps, ResponceProps, ProgProps } from "./type";


export function Interactive({ path, order, scene, submit }: InteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
    defaultValues: {
      text: "なんかかいてね",
    },
  });

  return (
    <div className="flex flex-col items-center justify-end w-screen h-screen overflow-hidden bg-basecolor">
      <Image
        src={`/race${scene}.webp`}
        alt="scene"
        width={1792}
        height={1024}
        className="h-full w-full object-center object-cover z-0 absolute"
      />
      <div className=" z-10 p-4 w-4/5">
        <Card className=" z-10 bg-basecolor p-4">
          <form onSubmit={handleSubmit(submit)}>
            <div>scene={scene}</div>
            <div>order={order}</div>
            <Textarea
              {...register("text", { required: true, maxLength: 20 })}
            ></Textarea>
            <button>Button</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
