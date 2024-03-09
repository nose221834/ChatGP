import { ProgProps } from "./type";
import Image from "next/image";

export function Progress({ order, scene, click }: ProgProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
  };

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen overflow-hidden bg-basecolor">
      <Image
        src="/progress.webp"
        alt="scene"
        width={1792}
        height={1024}
        className="h-full w-full object-center object-cover z-0 absolute"
      />
      <div className="flex flex-col justify-around items-center z-10 p-4 w-3/5 h-1/2">
        <div className="flex flex-col justify-around items-center  h-full w-full p-4">
          <div className="font-extrabold text-4xl tracking-wider text-center w-11/12  p-8">
            <p className=" text-shadow-edge text-basecolor">
              ここにうけとった文章
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center z-10 p-4 w-3/5 h-1/2">
        <div>
          <div>scene={scene}</div>
          <div>order={order}</div>
          <button onClick={handleClick}>これたね～～～</button>
        </div>
      </div>
    </div>
  );
}
