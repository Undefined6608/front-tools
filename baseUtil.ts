// 防抖函数
function debounce<F extends Procedure>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流函数
function throttle<F extends Procedure>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let lastTime = 0;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

export default {
  debounce,
  throttle,
};
