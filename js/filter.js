'use strict';

const ANY = `any`;
const mapFilters = window.mapFilters;
const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);
const addHidden = window.addHidden;
const renderPins = window.renderPins;
const removePins = window.removePins;

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
  let filterCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(filterCheckbox).every(function (feature) {
    return pin.offer.features.indexOf(feature.value) >= 0;
  });
};

const updateData = function (hotels) {
  const hotelsFilter = hotels.filter(function (hotel) {
    return checkHousingType(hotel) &&
      checkHousingRooms(hotel) &&
      checkHousingGuests(hotel) &&
      checkHousingPrice(hotel) &&
      checkHousingFeatures(hotel);
  });
  renderPins(hotelsFilter);
};

const deb = window.debounce(updateData);

mapFilters.addEventListener(`change`, function () {
  addHidden();
  removePins();
  deb(window.offers);
});
