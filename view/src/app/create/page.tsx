"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  text: string;
};

export default function Home() {
  const router = useRouter();

  const apiId = process.env.NEXT_PUBLIC_API_ACCESS_ID;
  const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      text: "例：宇宙船に乗ってる猫",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      if (apiId && apiKey) {
        const response = await fetch(
          `http://localhost:9004/1/car/data?text=${data.text}`,
          {
            headers: {
              [apiId]: apiKey,
            },
          }
        );
        const responseJson = await response.json();
        const dataUrl = await responseJson.url_car_img;
        const url = URL.createObjectURL(dataUrl);
        localStorage.setItem("UserCar", url);
        router.push("/create/result");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <main>
      <div className="flex flex-wrap justify-around items-center h-screen bg-basecolor">
        <div className="h-4/5 w-1/2 p-4">
          <div className="flex flex-col justify-around items-center h-full w-full bg-primarycolor rounded-xl">
            <Image
              src="/announcer.webp"
              alt="annauncer"
              width={256}
              height={256}
              priority
              className=" rounded-sm border-4 border-accentcolor"
            />
            <Card className="text-2xl text-center w-11/12 border-4 border-basecolor p-8">
              <p>これからレースだ！ 君の車を作製しよう！</p>
            </Card>
          </div>
        </div>
        <div className="flex h-4/5 w-1/2 p-4 flex-col justify-around items-center">
          <div className="text-2xl text-center w-11/12 p-4 items-center bg-secondarycolor text-basecolor rounded-md">
            <div className=" p-4">
              <p>これからChatGPに出場する車を</p>
              <p>ChatGPTに作成してもらおう！</p>
            </div>
            <p>車の画像、音、ステータスが君の言葉で決まるよ！</p>
          </div>
          <Card className="w-full p-4 bg-primarycolor">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-1">
                <div className="text-2xl bg-accentcolor text-basecolor inline-block p-2 rounded-xl">
                  入力欄
                </div>
              </div>
              <Textarea
                className="text-2xl text-center w-full border-4 border-accentcolor"
                {...register("text", { required: true, maxLength: 20 })}
              ></Textarea>
              <div className="flex p-4 justify-end">
                <Button className=" bg-accentcolor hover:bg-secondarycolor text-basecolor w-24 h-12 text-xl text-center">
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
