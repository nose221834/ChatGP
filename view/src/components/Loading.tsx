import Image from "next/image";

export function Loading() {
  return (
    <div className="flex flex-col z-50 items-center bg-basecolor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-accentcolor rounded-xl">
      <Image
        src="/loading.png"
        alt="loading"
        width={196}
        height={196}
        priority
        className="animate-spin"
      />
      <div className="p-4">
        <div className=" flex flex-col items-center bg-primarycolor text-2xl text-basecolor p-4 rounded-md border-4 border-accentcolor ">
          <p>ChatGPTの生成は時間がかかります！</p>
          <p>少々お待ちください。</p>
        </div>
      </div>
    </div>
  );
}
