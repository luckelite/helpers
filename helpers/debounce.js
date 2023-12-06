function debounce(fn, delay) {
  let timeoutId = null;

  return function(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default { debounce }
