import Image from "next/image";

export function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl border-4 border-accentcolor bg-basecolor">
      <Image
        src="/loading.png"
        alt="loading"
        width={196}
        height={196}
        priority
        className="animate-spin"
      />
      <div className="p-4">
        <div className=" flex flex-col items-center rounded-md border-4 border-accentcolor bg-primarycolor p-4 text-2xl text-basecolor ">
          <p>ChatGPTの生成は時間がかかります！</p>
          <p>少々お待ちください。</p>
        </div>
      </div>
    </div>
  );
}
