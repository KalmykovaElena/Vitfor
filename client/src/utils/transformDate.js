export const transformDate = (date, type) => {
  let newDate = new Date(date)
    .toLocaleString('ru-RU', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    .split(' ');

  newDate.splice(-2, 1);
  if (type === 'short') {
    newDate.splice(-1, 1);
  }
  newDate = newDate.join(' ');
  return date ? newDate : null;
};
