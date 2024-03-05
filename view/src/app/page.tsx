"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  useRouter().push("/create");
}
