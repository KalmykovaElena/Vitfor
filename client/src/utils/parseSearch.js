export const parseSearch = (str) => {
  const search = str
    .slice(1)
    .split('&')
    .reduce((acc, el) => {
      const [name, value] = el.split('=');
      // if (name === 'resetToken') {
      //   acc[name] = value.replace(/%2B/g, '/').replace(/%2F/g, '+');
      // } else {
      acc[name] = value;
      // }

      return acc;
    }, {});
  return search;
};
