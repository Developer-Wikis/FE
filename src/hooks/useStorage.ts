import { isBrowser } from '~/utils/helper/checkType';

type StorageType = 'local' | 'session';
const getStorage = (type: StorageType) => {
  return type === 'local' ? window.localStorage : window.sessionStorage;
};

const useStorage = (type: StorageType) => {
  function getItem<T>(key: string): T | null;
  function getItem<T>(key: string, defaultValue: T): T;
  function getItem<T>(key: string, defaultValue?: T) {
    if (!isBrowser()) return defaultValue ?? null;
    const storage = getStorage(type);

    try {
      const storedItem = storage.getItem(key);
      if (storedItem) {
        return JSON.parse(storedItem);
      }
    } catch (error) {
      console.error(error);
    }
    return defaultValue ?? null;
  }

  const setItem = <T>(key: string, value: T) => {
    if (!isBrowser()) return;
    const storage = getStorage(type);

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = (key: string) => {
    if (!isBrowser()) return;
    const storage = getStorage(type);

    storage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};

export default useStorage;
