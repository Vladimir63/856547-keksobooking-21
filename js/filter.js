'use strict';

const ANY = `any`;
const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);

const costRoom = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 49999
  },
  high: {
    min: 50000,
    max: Infinity
  }
};

const checkHousingType = function (pin) {
  if (housingType.value === ANY) {
    return true;
  } else {
    return pin.offer.type === housingType.value;
  }
};

const checkHousingRooms = function (pin) {
  if (housingRooms.value === ANY) {
    return true;
  } else {
    return pin.offer.rooms.toString() === housingRooms.value;
  }
};

const checkHousingGuests = function (pin) {
  if (housingGuests.value === ANY) {
    return true;
  } else {
    return pin.offer.guests.toString() === housingGuests.value;
  }
};

const checkHousingPrice = function (pin) {
  if (housingPrice.value === ANY) {
    return true;
  }
  return pin.offer.price >= costRoom[housingPrice.value].min && pin.offer.price <= costRoom[housingPrice.value].max;
};

const checkHousingFeatures = function (pin) {
  const filterCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(filterCheckbox).every(function (feature) {
    return pin.offer.features.indexOf(feature.value) >= 0;
  });
};

const updateData = function (hotels) {
  const hotelsFilter = [];
  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    if (
      checkHousingType(hotel) &&
      checkHousingRooms(hotel) &&
      checkHousingGuests(hotel) &&
      checkHousingPrice(hotel) &&
      checkHousingFeatures(hotel)) {
      hotelsFilter.push(hotel);
      if (hotels.length === window.pin.MAX_PIN_ON_MAP) {
        break;
      }
    }

  }
  window.pin.renderPins(hotelsFilter);
};

const updateWithDebounce = window.debounce(updateData);

window.map.mapFilters.addEventListener(`change`, function () {
  window.pin.addHidden();
  window.pin.removePins();
  updateWithDebounce(window.offers);
});
