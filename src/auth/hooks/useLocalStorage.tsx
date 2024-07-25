export const useLocalStorage = () => {
  // const [storedValue, setStoredValue] = useState(() => {
  //   try {
  //     const value = window.localStorage.getItem(key);
  //     return value ? JSON.parse(value) : defaultValue;
  //   } catch (error) {
  //     return defaultValue;
  //   }
  // });

  const setValue = <T,>(newValue: T, key: string) => {
    try {
      // setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
    // setStoredValue(newValue);
  };

  const getValue = <T,>(key: string) => {
    try {
      const valueStringified = window.localStorage.getItem(key);

      if (!valueStringified) {
        return valueStringified;
      }

      const value: T = JSON.parse(valueStringified);

      return value;
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setValue, getValue, removeValue };
};
