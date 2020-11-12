'use strict';

(() => {

  const getRandomNumbers = function (min, max) {
    const newMin = Math.ceil(min);
    const newMax = Math.floor(max);
    return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
  };

  function unique(array) {
    let result = [];

    for (let str of array) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }

  window.getRandomNumbers = getRandomNumbers;
  window.unique = unique;
})();
