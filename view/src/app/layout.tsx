import "@/app/globals.css";
import { DotGothic16 as FontSans } from "next/font/google";

// Press Start 2P
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <title>ChatGP</title>
        <meta name="keywords" content="chatgpt,chatgp.nosse.net,nosse.net,race game" />
        <meta name="description" content="ChatGPTを利用したレースゲーム" />
        <meta property="og:title" content="ChatGP" />
        <meta property="og:description" content="ChatGPTを利用したレースゲーム" />
        <meta property="og:image" content="./icon.png" />
        <link rel="icon" href="./icon.png" />
        {children}
      </body>
    </html>
  );
}
