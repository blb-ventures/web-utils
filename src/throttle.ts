export const throttle = (callback?: (...args: any) => void, limit = 100) => {
  let waiting = false;
  return (...args: any) => {
    if (!callback) return;
    if (!waiting) {
      callback(...args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};
