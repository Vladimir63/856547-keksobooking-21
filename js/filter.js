'use strict';

(function () {
  const ANY_VALUE = `any`;
  const MAX_PIN_ON_MAP = 5;
  const selectType = document.querySelector(`#housing-type`);
  const getRenderingPins = window.getRenderingPins;
  const addHidden = window.addHidden;
  const mapPinsElement = document.querySelector(`.map__pins`);

  const removePins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  const renderPins = function (offers) {
    const fragment = document.createDocumentFragment();
    const amount = offers.slice(0, MAX_PIN_ON_MAP);
    // console.log(offers); // тут все нужные массивы
    // console.log(amount); // тут уже не больше 5
    for (let i = 0; i < amount.length; i++) {
      fragment.appendChild(getRenderingPins(offers[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  function updatePins(typeOfHouse) {
    removePins();

    const sameTypeOfHouse = window.offers.filter(function (pin) {
      return pin.offer.type === typeOfHouse;
    });

    if (typeOfHouse === ANY_VALUE) {
      renderPins(window.offers);
    } else {
      renderPins(sameTypeOfHouse);
    }
  }

  selectType.addEventListener(`change`, function (evt) {
    const typeOfHouse = evt.target.value;
    // console.log(typeOfHouse);
    updatePins(typeOfHouse);
    addHidden(); // открытая карточка будет закрываться при выборе типа жилья
  });
})();
