export const getCurrentDate = (currentDate, weekday, lang, year) => {
  const date = new Date(currentDate);
  let options = { weekday: 'short', month: 'long', day: 'numeric', year };
  if (weekday === 'long') options = { weekday: 'long' };
  const str = date.toLocaleString(lang, options);
  return str.charAt(0).toUpperCase() + str.slice(1);
};
