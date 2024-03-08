import Image from "next/image";

export default function RaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-basecolor absolute top-0 left-0 border-4 border-accentcolor rounded-xl">
        <Image
          src="/announcer.webp"
          alt="announcer"
          width={192}
          height={192}
          priority
        />
      </div>
      {children}
    </div>
  );
}
