"use client";

import { useForm, SubmitHandler } from "react-hook-form";

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
