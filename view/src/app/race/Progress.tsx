import { ProgProps } from "./type";
import Image from "next/image";
import { RACE_CAR_IMAGES, RACE_RESPONSE_DATA } from "@/lib/const";
import { useRouter } from "next/navigation";
import { OrderedImages } from "./type";

export function Progress({ order, scene, click }: ProgProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    click();
  };

  const router = useRouter();

  const carDataString = localStorage.getItem(RACE_CAR_IMAGES);
  const responseData = localStorage.getItem(RACE_RESPONSE_DATA);
  if (!carDataString || !responseData)
    return (
      <div>
        <p>想定していないエラーが発生しています。</p>
        <p>リロードしてください。</p>
      </div>
    );

  const carIMagesJson = JSON.parse(carDataString) as OrderedImages;

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
        <div className="flex">
          <Image
            src={carIMagesJson.first_place}
            alt="1"
            width={100}
            height={100}
          />
          <Image
            src={carIMagesJson.second_place}
            alt="1"
            width={100}
            height={100}
          />
          <Image
            src={carIMagesJson.third_place}
            alt="1"
            width={100}
            height={100}
          />
          <Image
            src={carIMagesJson.fourth_prace}
            alt="1"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
