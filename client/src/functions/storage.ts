import { localStorageKeys } from "@core/utils";

export const getStorage = (key: localStorageKeys) => {
  const data = localStorage.getItem(key);

  if (!data) return null;

  return data;
};

export const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, value as string);
};
