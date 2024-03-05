"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const image = localStorage.getItem("UserCar");
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
