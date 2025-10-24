import { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  console.log(dummyTrailers[0]);

  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  console.log("currenTrailor Value", currentTrailer);

  return (
    <div className="px-6 md:py-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300  font-semibold text-lg max-w-[900px] mx-auto">
        Trailer Section
      </p>
      <div className="relative mt-6">
        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls={false}
          className="mx-auto max-w-full"
          width="960px"
          height="540px"
        />
      </div>
      <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="relative
        group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300
        transition max-md:h-60 max-h-60 cursor-pointer"
            onClick={() => {
              setCurrentTrailer(trailer);
            }}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="rounded-lg w-full
        h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2
        left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2
        -translate-y-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
