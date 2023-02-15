import Image from "next/image";
import Link from "next/link";

export default function Card(props) {
  const { movieId, original_title, overview, poster_path, popularity, release_date, vote_average, vote_count, } = props;

  return (
    <>
      {/* <Link href={`./filmography/${movieId}`}> */}
      <Link href={`./filmography/${movieId}`} key={movieId.toString()}>

        <div className="grid grid-cols-8 max-w-32 gap-2 border-4 rounded-md border-gray-900 hover:border-double">
          <div className="col-span-3 flex items-center">
            <Image
              className="rounded-l-sm "
              src={poster_path}
              height={500}
              width={333}
              alt={original_title}
            />
          </div>
          <div className="col-span-5">
            <h2 className="font-extrabold text-center ">
              {original_title}
              <br />
              <div className="text-sm text-left indent-3 mt-2 mb-2 font-[600]">
                {release_date} &emsp; &emsp; &emsp; &emsp;{" "}
                {vote_average.toFixed(1)} ⭐
              </div>
            </h2>
            <p className="overflow-clip h-32 text-sm leading-tight hover:overflow-y-auto p-2 pl-0">
              {overview}
            </p>

            <div className="indent-4">
              <span className="font-[600] ">Your review: ?</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
