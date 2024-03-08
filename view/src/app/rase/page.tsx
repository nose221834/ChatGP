import { useState } from "react";

type InteProps = {
    path: string
    order: number
}

type ProgProps = {
    order: string
    
}

export default function Home() {
  const [responce, setResponce] = useState<boolean>(false);
  if (!responce) {
    return <Interactive path="aaa" order={1} />;
  } else return <Progress />;
}

export function Interactive({ path, order }: InteProps) {
  return <div>Interactive</div>;
}

export function Progress({ }) {
  return <div>Progress</div>;
}
