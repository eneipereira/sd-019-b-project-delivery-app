export const getLocalStorageParsed = (key, defaultType) => {
  const data = JSON.parse(localStorage.getItem(key)) || defaultType;
  return data;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const serializeCreateSale = (sale, products) => {
  const newSale = {
    userId: Number(sale.id),
    sellerId: Number(sale.sellerId),
    totalPrice: Number(sale.total.replace(',', '.')),
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    status: sale.status || 'Pendente',
    products: products.map((item) => (
      { productId: Number(item.id), quantity: Number(item.quantity) }
    )),
  };
  return newSale;
};

export const serializeDate = (date) => {
  const newDate = new Date(date).toLocaleDateString('pt-BR');
  return newDate;
};

export const serializePrice = (price) => {
  const newPrice = price.replace('.', ',');
  return newPrice;
};
