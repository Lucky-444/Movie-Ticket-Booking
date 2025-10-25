import { ChevronLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
        const navigate = useNavigate(); 
  const [selectedDate, setSelectedDate] = useState(null);
  const onBookHandler = () => {
    if (!selectedDate) {
      return toast("Please select a date to proceed with booking.", {
        type: "warning",
      });
    }
    navigate(`/movies/${id}/${selectedDate}`);
    console.log("Booking for movie id:", id, "on date:", selectedDate);
    scrollTo(0, 0);
  };
  return (
    <div id="dateSelect" className="pt-30">
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-10
    relative p-8 bg-primary/10 border border-primary/20 rounded-lg"
      >
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span
              className="grid grid-cols-3 md:flex flex-wrap max-w-lg
  gap-4"
            >
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  className={`flex flex-col items-center
      justify-center h-14 w-14 aspect-square rounded
      cursor-pointer  ${selectedDate === date ? "bg-primary text-black font-bold" : "bg-white/10 hover:bg-primary/20"
                    }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <cheveronRightIcon width={28} />
          </div>
        </div>
        <button
                onClick={onBookHandler}
          className="px-6 py-3 bg-primary hover:bg-primary-dull
    transition rounded-full font-medium cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
