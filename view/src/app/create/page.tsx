"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { getPlayerCarDataFromGpt } from "@/lib/create/actions";
import { PlayerCarInput, PlayerCarRes } from "@/app/create/type";
import { validatePlayerCarRes } from "@/lib/validator/carDataValidator";
import { Loading } from "@/components/Loading";
import { PLAYER_CAR } from "@/lib/const";

export default function Home() {
  const router = useRouter();
  const [submit, setSubmit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerCarInput>({
    defaultValues: {
      text: "例：宇宙船に乗ってる猫",
    },
  });

  const onSubmit: SubmitHandler<PlayerCarInput> = async (
    data: PlayerCarInput
  ) => {
    try {
      setSubmit(true);
      const responseJson: PlayerCarRes | false = await getPlayerCarDataFromGpt(
        data
      );
      if (responseJson) {
        await getResponseFromGpt(responseJson);
        router.push("/create/result");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getResponseFromGpt = async (responseJson: PlayerCarRes) => {
    const carDataJsonWithUrl = await validatePlayerCarRes(responseJson);
    if (carDataJsonWithUrl) {
      localStorage.setItem(PLAYER_CAR, JSON.stringify(carDataJsonWithUrl));
    }
    // TODO elseを書く
  };

  return (
    <main>
      {submit && <Loading />}
      <div className="flex flex-wrap justify-around items-center h-screen bg-basecolor">
        <div className="h-4/5 w-1/2 p-4">
          <div className="flex flex-col justify-around items-center h-full w-full bg-primarycolor rounded-xl border-4 border-secondarycolor">
            <Image
              src="/announcer.webp"
              alt="announcer"
              width={256}
              height={256}
              priority
              className=" rounded-sm border-4 border-accentcolor"
            />
            <Card className="text-4xl tracking-wider text-center w-11/12 border-4 border-basecolor p-8">
              <p>これからレースだ！</p>
              <p> 君の車を作製しよう！</p>
            </Card>
          </div>
        </div>
        <div className="flex h-full w-1/2 p-4 flex-col justify-around items-center">
          <div className="text-3xl tracking-wider text-center w-11/12 p-4 items-center bg-secondarycolor text-basecolor rounded-xl border-4 border-accentcolor">
            <div className=" p-4">
              <p>これからChatGPに出場する車を</p>
              <p>ChatGPTに作成してもらおう！</p>
            </div>
            <div className=" p-4">
              <p>車の画像、音、ステータスが</p>
              <p>君の言葉で決まるよ！</p>
            </div>
          </div>
          <Card className="w-full p-4 bg-primarycolor border-4 border-secondarycolor">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-1">
                <div className="text-2xl tracking-widest bg-accentcolor text-basecolor inline-block p-2 rounded-xl">
                  入力欄
                </div>
              </div>
              <Textarea
                className=" tracking-widest text-4xl text-center w-full border-4 border-accentcolor"
                {...register("text", { required: true, maxLength: 20 })}
              ></Textarea>
              <div className="flex p-4 justify-end">
                <Button
                  disabled={submit}
                  className=" bg-accentcolor hover:bg-secondarycolor text-basecolor w-24 h-12 text-xl text-center tracking-widest"
                >
                  送信
                </Button>
              </div>
              {errors.text && (
                <div className=" bg-basecolor border-secondarycolor border-4 text-2xl text-center text-accentcolor font-bold p-2">
                  20文字以内で入力してください
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
