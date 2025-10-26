import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";

const SeatLayout = () => {
  const { id, date } = useParams();
  // const [seats, setSeats] = useState([])
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const getShow = () => {
    const foundShow = dummyShowsData.find((item) => item._id === id);

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    } else {
      console.warn("No show found for ID:", id);
    }
  };

  useEffect(() => {
    getShow();
  }, [id, date]);

  if (!show) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        {console.log("selectedTime" , selectedTime)}
        
        <div>
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item.time)}
              className={`flex items-center gap-2 px-6 mt-2 mx-3 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/60"
              }`}
              
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout : */}
      <div>Seat Layout Here</div>
    </div>
  );
};

export default SeatLayout;
