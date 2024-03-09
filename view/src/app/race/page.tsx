"use client";

import { useState } from "react";
import { Interactive } from "./Interactive";
import { Progress } from "./Progress";
import { useRouter } from "next/navigation";
import { SubmitProps, InteProps, ResponceProps, ProgProps } from "./type";

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
