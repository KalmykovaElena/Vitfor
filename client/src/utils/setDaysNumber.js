export const setDaysNumber = (year, mounth) => {
  const date1 = new Date(year, mounth - 1, 1);
  const date2 = new Date(year, mounth, 1);
  return Math.round((date2 - date1) / 1000 / 3600 / 24);
};
