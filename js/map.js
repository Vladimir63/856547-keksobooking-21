
'use strict';

const WIDTH_MAIN_PIN = 65;
const HEIGHT_MAIN_PIN = 65;
const HEIGHT_MAIN_PIN_AFTER = 22;
const LEFT_MAP_PIN = Math.ceil(window.pin.mapPin.offsetLeft + WIDTH_MAIN_PIN / 2);
const TOP_MAP_PIN = Math.ceil(window.pin.mapPin.offsetTop + HEIGHT_MAIN_PIN / 2);
const TOP_MAP_PIN_SUM = Math.ceil(window.pin.mapPin.offsetTop + HEIGHT_MAIN_PIN + HEIGHT_MAIN_PIN_AFTER);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);

const buttonMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
    window.pin.mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
    window.pin.mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
  }
};

const buttonKeyDownHandler = function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
    window.pin.mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
    window.pin.mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
  }
};

const onSuccess = function (res) {
  for (let i = 0; i < res.length; i++) {
    res[i].id = i;
  }

  window.card.getCreateCard(res);
  window.pin.renderPins(res);
  window.offers = res;
};

const activatePage = function () {
  window.pin.map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute(`disabled`);
  }

  window.load(onSuccess, window.message.showError);
  adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN_SUM);
  window.form.setGuestNumbers();
};

function addListeners() {
  window.pin.mapPin.addEventListener(`keydown`, buttonKeyDownHandler);
  window.pin.mapPin.addEventListener(`mousedown`, buttonMouseDownHandler);
}
addListeners();

const deactivatePage = function () {
  mapFilters.reset();
  adForm.reset();
  window.pin.map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  window.pin.removePins();
  window.card.removeCards();

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute(`disabled`, `disabled`);
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].setAttribute(`disabled`, `disabled`);
  }
  window.pin.setDefaultCoords();
  adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN);

  addListeners();
};

window.map = {
  activatePage,
  WIDTH_MAIN_PIN,
  HEIGHT_MAIN_PIN,
  HEIGHT_MAIN_PIN_AFTER,
  LEFT_MAP_PIN,
  TOP_MAP_PIN,
  TOP_MAP_PIN_SUM,
  mapFilters,
  deactivatePage,
  onSuccess
};
