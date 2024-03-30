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

  const onSubmit: SubmitHandler<PlayerCarInput> = async (data: PlayerCarInput) => {
    try {
      setSubmit(true);
      const responseJson: PlayerCarRes | false = await getPlayerCarDataFromGpt(data);
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
      <div className="flex h-screen flex-wrap items-center justify-around bg-basecolor">
        <div className="h-4/5 w-1/2 p-4">
          <div className="flex h-full w-full flex-col items-center justify-around rounded-xl border-4 border-secondarycolor bg-primarycolor">
            <Image
              src="/announcer.webp"
              alt="announcer"
              width={256}
              height={256}
              priority
              className=" rounded-sm border-4 border-accentcolor"
            />
            <Card className="w-11/12 border-4 border-basecolor p-8 text-center text-4xl tracking-wider">
              <p>これからレースだ！</p>
              <p> 君の車を作製しよう！</p>
            </Card>
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-around p-4">
          <div className="w-11/12 items-center rounded-xl border-4 border-accentcolor bg-secondarycolor p-4 text-center text-3xl tracking-wider text-basecolor">
            <div className=" p-4">
              <p>これからChatGPに出場する車を</p>
              <p>ChatGPTに作成してもらおう！</p>
            </div>
            <div className=" p-4">
              <p>車の画像、音、ステータスが</p>
              <p>君の言葉で決まるよ！</p>
            </div>
          </div>
          <Card className="w-full border-4 border-secondarycolor bg-primarycolor p-4">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-1">
                <div className="inline-block rounded-xl bg-accentcolor p-2 text-2xl tracking-widest text-basecolor">
                  入力欄
                </div>
              </div>
              <Textarea
                className=" w-full border-4 border-accentcolor text-center text-4xl tracking-widest"
                {...register("text", { required: true, maxLength: 20 })}
              ></Textarea>
              <div className="flex justify-end p-4">
                <Button
                  disabled={submit}
                  className=" h-12 w-24 bg-accentcolor text-center text-xl tracking-widest text-basecolor hover:bg-secondarycolor"
                >
                  送信
                </Button>
              </div>
              {errors.text && (
                <div className=" border-4 border-secondarycolor bg-basecolor p-2 text-center text-2xl font-bold text-accentcolor">
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
