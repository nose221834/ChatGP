"use client";

import { useRouter } from "next/navigation";
import { getEnemyCar } from "@/app/getEnemyCar";

export default function Home() {
  const router = useRouter()
  const moveToCreate = () => {
    getEnemyCar();
    router.push("/create");
  }
  return (
    <button 
      onClick={moveToCreate}>
      button
    </button>
  )
}
