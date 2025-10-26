const isoTimeFormat = (date) => {
  const dateObj = new Date(date);
  const localTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return localTime;
};

export default isoTimeFormat;
