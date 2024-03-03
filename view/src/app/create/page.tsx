import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col flex-wrap">
        <p>GPTに車を作ってもらおう！</p>
        <p>どんな車がいいか直観で書いてね！</p>
        <form>
          <Textarea className="border-2" rows={5}></Textarea>
          <Button>送信！</Button>
        </form>
      </div>
    </main>
  );
}
