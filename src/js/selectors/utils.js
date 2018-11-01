
export const binify = (low, high, items) => {
  let total = 0;
  items.forEach(item => {
    const price = item.price;
    if (price <= high && price >= low) {

      // TODO: remove once new posts are created
      total += parseFloat(item.volume);
    }
  });

  return total;
};