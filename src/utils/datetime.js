const months = [
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

// E.g 2023_06 into June 2023
export const formatDateStringToMonthYear = (dateString) => {
  const [year, month] = dateString.split("_");
  const monthName = months[parseInt(month) - 1];

  return `${monthName} ${year}`;
};

// E.g 2023_06_17 into 17 June 2023
export const formatDateStringToDayMonthYear = (dateString) => {
  const [year, month, day] = dateString.split("_");
  const monthName = months[parseInt(month) - 1];

  return `${day} ${monthName} ${year}`;
};

export const getDaysInMonth = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(date.getFullYear(), month, 0).getDate();

  return daysInMonth;
};

// E.g Date() into 2020_04_12
export const convertDateToString = (date) => {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}_${month}_${day}`;
};

export const convertStringToDate = (dateString) => {
  const [year, month, day] = dateString.split("_");
  const date = new Date(year, month - 1, day);

  return date;
};

// E.g ["December 2023", "01 Dec 23", "31 Dec 23"]
export const getMonthYearAndFirstLastDates = () => {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const year_month = `${year}_${month}`;

  const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const firstDateFormatted = `${firstDate.getDate()} ${firstDate.toLocaleDateString("en-US", {
    month: "short",
  })} ${firstDate.getFullYear().toString().slice(-2)}`;

  const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const lastDateFormatted = `${lastDate.getDate()} ${lastDate.toLocaleDateString("en-US", {
    month: "short",
  })} ${lastDate.getFullYear().toString().slice(-2)}`;

  return [year_month, firstDateFormatted, lastDateFormatted];
};

// E.g {date: "2024_02_17"} > {date: "2024_02_14"}
export const sortByDate = (data) =>
  data.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
