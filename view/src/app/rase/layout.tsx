import Image from "next/image";

export default function RaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="">
        <div className="flex flex-col items-center bg-basecolor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-accentcolor rounded-xl">
          <Image
            src="/announcer.webp"
            alt="announcer"
            width={196}
            height={196}
            priority
            className=""
          />
        </div>
        {children}
      </body>
    </html>
  );
}
