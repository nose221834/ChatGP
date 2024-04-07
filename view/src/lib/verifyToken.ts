"use server";

import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";
import readEnv from "./readEnv";

const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
// envから読み込むように修正
const secret = readEnv().secretKey;

export default async function verifyToken(token: string) {
  // tokenを検証
  const res = await fetch(verifyEndpoint, {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const resData = (await res.json()) as TurnstileServerValidationResponse;

  console.log(resData);

  if (resData.success) {
    return true;
  } else {
    false;
  }
}
