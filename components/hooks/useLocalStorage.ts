'use client';
import React from 'react';

function dispatchStorageEvent(key: any, newValue: any) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}
const setLocalStorageItem = (key: any, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};
const removeLocalStorageItem = (key: any) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};
const getLocalStorageItem = (key: any) => {
  return window.localStorage.getItem(key);
};
const useLocalStorageSubscribe = (callback: any) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};
const getLocalStorageServerSnapshot = () => {
  // throw Error("useLocalStorage is a client-only hook");
  return null;
};

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = React.useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot,
  );

  const setState = React.useCallback(
    (v: any) => {
      try {
        const parsedStore = JSON.parse(store || "null");
        const nextState = typeof v === "function" ? v(parsedStore) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store],
  );

  React.useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== 'undefined'
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
