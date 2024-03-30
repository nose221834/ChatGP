import Image from "next/image";

export default function RaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="absolute left-0 top-0 z-50 p-8">
        <Image
          className="rounded-xl border-4 border-accentcolor "
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
