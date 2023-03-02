import Image from "next/image";
import Link from "next/link";
import {Red_Hat_Display, Plus_Jakarta_Sans} from "@next/font/google";
import cls from "classnames"

const redhatdisplay = Red_Hat_Display({ style: "normal" }, { subsets: ["latin"] });
const plusjakartasans = Plus_Jakarta_Sans({ style: "normal" }, { subsets: ["latin"] });

export default function Card(props) {
  const { movieId, original_title, overview, poster_path, popularity, release_date, vote_average, vote_count } = props;
  


  return (
    <>
      
      <Link href={`./filmography/${movieId}`} key={movieId.toString()} className="bg-[rgb(176,176,176)] rounded-2xl ">
      
        <div className="grid grid-cols-8 max-w-32 gap-2 border-4 rounded-md border-gray-900 hover:border-double">
          <div className="col-span-3 flex items-center shrink-0">
            <Image
              // className="rounded-l-sm"
              src={poster_path}
              height={500}
              width={333}
              alt={original_title}
            />
          </div>
          <div className="col-span-5">
            <h2 className={ cls(plusjakartasans.className, "text-black font-semibold leading-8 text-center")}>
            
              {original_title}
              <br />
              <div className="text-sm text-left indent-3 mt-2 mb-2 font-[600] flex">
                <div className="flex justify-start"> {release_date} </div>
                <div > {vote_average.toFixed(1)} ★ </div>
              </div>
            </h2>
            <p className={cls(redhatdisplay.className,"text-[rgb(80,80,80)] text-sm font-medium" )}
            // <p className={cls(redhatdisplay.className,"overflow-clip h-32 text-sm leading-tight hover:overflow-y-auto p-2 pl-0" )}
            >
              {overview}
            </p>


          </div>
        </div>
      </Link>
    </>
  );
}
