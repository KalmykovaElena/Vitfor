export const range = (from, to) => {
  const result = [];

  if (from > to) {
    for (let i = from; i >= to; i -= 1) {
      result.push(i);
    }
  } else {
    for (let i = from; i <= to; i += 1) {
      result.push(i);
    }
  }

  return result;
};
