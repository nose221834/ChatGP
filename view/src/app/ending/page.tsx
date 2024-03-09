"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    const moveToStart = () => {
        router.push("/create");
      }
      
    return (
      <main>
        <div className="bg-[url('/race2.webp')] bg-cover h-screen w-full p-4">
          <div className="absolute bottom-0 right-0 m-4">
            <Button className="border bg-transparent hover:bg-secondarycolor text-basecolor w-30 h-16 text-xl text-center tracking-widest"
            onClick={moveToStart}>
                Game End
            </Button>
          </div>

        </div>
      </main>
    );
}