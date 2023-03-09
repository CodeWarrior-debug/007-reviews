import Image from "next/image";
import Link from "next/link";
import {Red_Hat_Display, Plus_Jakarta_Sans} from "@next/font/google";
import cls from "classnames"

const redhatdisplay = Red_Hat_Display({ style: "normal" }, { subsets: ["latin"] });
const plusjakartasans = Plus_Jakarta_Sans({ style: "normal" }, { subsets: ["latin"] });

export default function Card(props) {
  const { movieId, title, overview, poster_path, release_date, vote_average} = props;
  


  return (
    <>
      
      <Link href={`./filmography/${movieId}`} key={movieId.toString()} className="bg-[rgb(176,176,176)] rounded-2xl hover:scale-105 hover:bg-[rgb(200,200,200)] aspect-[380/196] max-h-[11rem]">
      
        <div className="grid grid-cols-8 max-w-32 gap-2 rounded-md border-none  ">

          <div className="col-span-3 flex items-center shrink-0 relative">
            <Image
              src={poster_path}
              fill
              alt={title}
              className="bg-cover rounded-l-2xl min-h-[11rem] max-h-[11rem]"
              // sizes="(max-width: 768px) 100vw,
              // (max-width: 1200px) 50vw,
              // 33vw"
            />
          </div>

          <div className="col-span-5 max-h-[179px]">
            <h2 className={ cls(plusjakartasans.className, "text-black font-semibold text-center text-[13px]")}>
              {title}
            </h2>
              <div className="text-sm text-left indent-3 mt-2 mb-2 flex justify-around text-black font-semibold leading-none">
                <div className="tracking-wider"> {release_date} </div>
                <div className="tracking-wider"> {vote_average.toFixed(1)} ★ </div>
              </div>
            {/* <p className={cls(redhatdisplay.className,"text-[rgb(80,80,80)] text-sm font-medium overflow-clip" )} */}
            <p className={cls(redhatdisplay.className,"overflow-clip text-[rgb(80,80,80)] h-28 text-sm leading-tight hover:overflow-y-auto p-2 pl-0" )}
            >
              {overview}
            </p>


          </div>
        </div>
      </Link>
    </>
  );
}
