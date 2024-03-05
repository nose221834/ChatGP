"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const image = localStorage.getItem("UserCar");
  if (image) {
    return (
      <div>
        <img src={image}></img>
      </div>
    );
  } else {
    useRouter().push("/create");
  }
}
