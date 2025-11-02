// import React, { useEffect, useState } from "react";
// import { dummyShowsData } from "../../assets/assets";
// import Loading from "../../components/Loading";
// import Title from "../../components/Admin/Title";

// const AddShows = () => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeSelection, setDateTimeSelection] = useState({});
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showPrice, setShowPrice] = useState("");

//   const fetchNowPlayingMovies = async() => {
//     setNowPlayingMovies(dummyShowsData);
//   };

//   useEffect(() => {
//     fetchNowPlayingMovies();
//   },[])

//   return nowPlayingMovies.length > 0 ?  (
//     <>

//     <Title text1="Add" text2="shows" />
//     <p className = "mt-10 text-lg font-medium">
//     Now Playing Movies
//     </p>

//     <div className="overflow-x-auto pb-4">

//     </div>

//     </>
//   ) : (
//     <Loading />
//   )
  
// };

// export default AddShows   

import React from 'react'

const AddShows = () => {
  return (
    <div>AddShows</div>
  )
}

export default AddShows