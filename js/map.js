
'use strict';

const mapPin = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const map = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters`);
const WIDTH_MAIN_PIN = 65;
const HEIGHT_MAIN_PIN = 65;
const HEIGHT_MAIN_PIN_AFTER = 22;
const LEFT_MAP_PIN = Math.ceil(mapPin.offsetLeft + WIDTH_MAIN_PIN / 2);
const TOP_MAP_PIN = Math.ceil(mapPin.offsetTop + HEIGHT_MAIN_PIN / 2);
const TOP_MAP_PIN_SUM = Math.ceil(mapPin.offsetTop + HEIGHT_MAIN_PIN + HEIGHT_MAIN_PIN_AFTER);
const getCreateCard = window.getCreateCard;
const load = window.load;
const renderPins = window.renderPins;
const removePins = window.removePins;
const removeCards = window.removeCards;
const setDefaultCoords = window.setDefaultCoords;

const buttonMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
    mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
    mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
  }
};

const buttonKeyDownHandler = function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
    mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
    mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
  }
};

const onSuccess = function (res) {
  for (let i = 0; i < res.length; i++) {
    res[i].id = i;
  }

  getCreateCard(res);
  renderPins(res);
  window.offers = res;
};

const onError = function (res) {
  window.message.showError(res);
};

const activatePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute(`disabled`);
  }

  load(onSuccess, onError);
  adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN_SUM);
};

const deactivatePage = function () {
  mapFilters.reset();
  adForm.reset();
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  removePins();
  removeCards();

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute(`disabled`, `disabled`);
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].setAttribute(`disabled`, `disabled`);
  }
  setDefaultCoords();
  adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN_SUM);

};

mapPin.addEventListener(`keydown`, buttonKeyDownHandler);
mapPin.addEventListener(`mousedown`, buttonMouseDownHandler);

window.activatePage = activatePage;
window.buttonMouseDownHandler = buttonMouseDownHandler;
window.buttonKeyDownHandler = buttonKeyDownHandler;
window.mapPin = mapPin;
window.WIDTH_MAIN_PIN = WIDTH_MAIN_PIN;
window.HEIGHT_MAIN_PIN = HEIGHT_MAIN_PIN;
window.HEIGHT_MAIN_PIN_AFTER = HEIGHT_MAIN_PIN_AFTER;
window.LEFT_MAP_PIN = LEFT_MAP_PIN;
window.TOP_MAP_PIN = TOP_MAP_PIN;
window.TOP_MAP_PIN_SUM = TOP_MAP_PIN_SUM;
window.map = map;
window.onSuccess = onSuccess;
window.onError = onError;
window.mapFilters = mapFilters;
window.deactivatePage = deactivatePage;

