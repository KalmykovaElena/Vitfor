export const getCurrentDate = (currentDate, weekday, lang, year) => {
  const date = new Date(currentDate);
  let options = { weekday: 'short', month: 'long', day: 'numeric', year };
  if (weekday === 'long') options = { weekday: 'long' };
  return date.toLocaleString(lang, options).split(',').join('');
};
