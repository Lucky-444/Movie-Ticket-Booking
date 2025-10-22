import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <p className="text-gray-300 font-semibold mb-4 mt-10">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition cursor-pointer"
        >
          View All{" "}
          <ArrowRight className="group-hover:translate-x-0.5 transition w-5 h-5 ml-2" />
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default FeaturedSection;
