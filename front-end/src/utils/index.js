export const getLocalStorageParsed = (key, defaultType) => {
  const data = JSON.parse(localStorage.getItem(key)) || defaultType;
  return data;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
