import { z } from "zod";

export const envSchema = z.object({
    apiId : z.string(),
    apiKey : z.string(),
    apiUrl : z.string(),
    siteKey : z.string(),
    secretKey : z.string(),
  });
