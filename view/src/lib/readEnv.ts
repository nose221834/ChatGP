import { envSchema } from "./envSchema";

export default function readEnv(){
  const env =  {
     apiId : process.env.NEXT_PUBLIC_API_ACCESS_ID,
     apiKey : process.env.NEXT_PUBLIC_API_ACCESS_KEY,
     apiUrl : process.env.NEXT_PUBLIC_API_URL,
     siteKey : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
     secretKey : process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY,
  }

  const result = envSchema.safeParse(env);

  if (result.success){
    return result.data
  }
  else {
    console.log(result.error)
     throw new Error("環境変数が設定されていません")
  }
}