import { localStorageKeys } from "@core/utils";

// getStorage: get storage item
export const getStorage = (key: localStorageKeys) => {
  const data = localStorage.getItem(key);

  if (!data) return null;

  return data;
};

// setStorage: set storage item
export const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, value as string);
};
