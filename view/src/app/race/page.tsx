"use client";

import { useState } from "react";
import { Interactive, InteProps, SubmitProps } from "./Interactive";
import { Progress, ProgProps } from "./Progress";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // 場面を切り替えるためのState
  const [scene, setScene] = useState<number>(0);
  // InteractiveとProgressを切り替えるState
  const [responce, setResponce] = useState<boolean>(false);

  function onSubmit(data: SubmitProps) {
    if (scene + 1 >= 3) {
      router.push("/race/ending");
    } else {
      setResponce(true);
    }
  }

  function nextScene(): void {
    setScene(scene + 1);
    setResponce(false);
  }

  console.log(scene);
  console.log(responce);

  if (!responce) {
    return (
      <main>
        <Interactive path="aaa" order={1} scene={scene} submit={onSubmit} />
      </main>
    );
  } else
    return (
      <main>
        <Progress order={1} scene={scene} click={nextScene} />
      </main>
    );
}
