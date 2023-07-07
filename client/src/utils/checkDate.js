export const checkDate = (day, month, year) => {
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
};
