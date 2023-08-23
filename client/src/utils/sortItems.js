export const sortItems = (sortCategory, items) => {
  if (sortCategory === 'Новые') {
    return [...items.sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))];
  }
  if (sortCategory === 'Старые') {
    return [...items.sort((a, b) => new Date(a.dateOfCreation) - new Date(b.dateOfCreation))];
  }
  if (sortCategory === 'Дороже') {
    const getPrice = (price) => parseFloat(price.replace(/\s/g, '').replace(',', '.'), 10);
    return [...items.sort((a, b) => getPrice(b.price) - getPrice(a.price))];
  }
  if (sortCategory === 'Дешевле') {
    const getPrice = (price) => parseFloat(price.replace(/\s/g, '').replace(',', '.'), 10);
    return [...items.sort((a, b) => getPrice(a.price) - getPrice(b.price))];
  }
  return items;
};
