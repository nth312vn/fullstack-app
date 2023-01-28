const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data || '');
};
const setLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const LocalStorageUtil = {
  getLocalStorage,
  setLocalStorage,
};

export default LocalStorageUtil;
