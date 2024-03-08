"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export type SubmitProps = {
  text: string;
};

export type InteProps = {
  path: string;
  order: number;
  scene: number;
  submit: SubmitHandler<SubmitProps>;
};

export function Interactive({ path, order, scene, submit }: InteProps) {
  const router = useRouter();

  // useEffect(() => {
  //   if (scene >= 3) {
  //     router.push("/race/ending");
  //   }
  // }, [scene]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
    defaultValues: {
      text: "1",
    },
  });

  return (
    <div className="flex flex-wrap justify-around items-center h-screen bg-basecolor">
      <form onSubmit={handleSubmit(submit)}>
        <div>scene={scene}</div>
        <div>order={order}</div>
        <textarea
          defaultValue="なんかかいてね"
          {...register("text", { required: true, maxLength: 20 })}
        ></textarea>
        <button>Button</button>
      </form>
    </div>
  );
}
