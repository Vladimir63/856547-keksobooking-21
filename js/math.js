'use strict';

(() => {

  const getRandomNumbers = function (min, max) {
    const newMin = Math.ceil(min); // Округляет аргумент до ближайшего большего целого.
    const newMax = Math.floor(max); // Округляет аргумент до ближайшего меньшего целого.
    return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
  };

  window.getRandomNumbers = getRandomNumbers;

})();
