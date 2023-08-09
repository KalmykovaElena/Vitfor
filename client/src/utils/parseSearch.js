export const parseSearch = (str) => {
  const search = str
    .slice(1)
    .split('&')
    .reduce((acc, el) => {
      const [name, value] = el.split('=');
      acc[name] = value;
      return acc;
    }, {});
  return search;
};
