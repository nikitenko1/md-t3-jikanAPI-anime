export const getSeason = (month: number) => {
  if (month >= 3 && month <= 5) {
    return "spring";
  }

  if (month >= 6 && month <= 8) {
    return "summer";
  }

  if (month >= 9 && month <= 11) {
    return "fall";
  }

  // Months 12, 01, 02
  return "winter";
};

export const convertToDate = (x: string) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(x);

  const year = date.getFullYear();
  let dt: string | number = date.getDate();
  const month = monthNames[date.getMonth()];

  if (dt < 10) {
    dt = "0" + dt;
  }

  if (!x) {
    return "N/A";
  }

  return `${dt} ${month}, ${year}`;
};
