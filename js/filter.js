'use strict';

(function () {
  const ANY_VALUE = `any`;
  const selectType = document.querySelector(`#housing-type`);
  const addHidden = window.addHidden;
  const renderPins = window.renderPins;
  const removePins = window.removePins;

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
    updatePins(typeOfHouse);
    addHidden();
  });

})();
