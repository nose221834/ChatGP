"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:9004/1?text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF"
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      localStorage.setItem("UserCar", url);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <main>
      <div className="flex flex-col flex-wrap justify-around h-screen ">
        <div className="flex flex-col items-center">
          <h1>GPTに車を作ってもらおう！</h1>
          <h2>どんな車がいいか直観で書いてね！</h2>
        </div>
        <div>
          <form action="/create/result">
            <Textarea
              className="border-4 text-2xl text-center align-baseline leading-10"
              rows={8}
              cols={5}
            ></Textarea>
            <Button onClick={handleClick}>送信！</Button>
          </form>
        </div>
      </div>
    </main>
  );
}

// height: 60px; /* 例として3行分の高さ */
// line-height: 20px; /* 1行あたりの高さ */
