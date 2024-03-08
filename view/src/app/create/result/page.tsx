"use client";

import { useRouter } from "next/navigation";
import { PLAYER_CAR_IMAGE } from "@/lib/const";

export default function Home() {
  const image = localStorage.getItem(PLAYER_CAR_IMAGE);
  const router = useRouter();
  if (image) {
    return (
      <div>
        <img src={image}></img>
      </div>
    );
  } else {
    router.push("/create");
  }
}
