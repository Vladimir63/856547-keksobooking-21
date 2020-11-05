
'use strict';

(() => {
  const mapPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const WIDTH_MAIN_PIN = 62;
  const HEIGHT_MAIN_PIN = 62;
  const HEIGHT_MAIN_PIN_AFTER = 22;
  const LEFT_MAP_PIN = mapPin.offsetLeft + WIDTH_MAIN_PIN / 2;
  const TOP_MAP_PIN_SUM = mapPin.offsetTop + HEIGHT_MAIN_PIN_AFTER;
  const getCreatePins = window.getCreatePins;
  const getCreateCard = window.getCreateCard;
  const getRenderingPins = window.getRenderingPins;
  const load = window.load;

  // const pinsData = getCreatePins();
  const pinsData = getCreatePins();


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
    getCreateCard(pinsData);
    getRenderingPins(pinsData);
    adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN_SUM);
  };

  // Обработчики событий: активируют страницу кексобукинга
  // по нажатию левой кнопки мыши или клавиши Enter(когда метка в фокусе)
  const buttonMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
      // Удаляем обработчики
      mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
      mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
    }
  };

  const buttonKeyDownHandler = function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
      // Удаляем обработчики
      mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
      mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
    }
  };

  const onSuccess = function (res) {
    window.pin.render(res);
  };

  const onError = function (res) {
    window.message.showError(res);
  };

  // Вешаем 2 обработчика событий на главную метку
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
  window.TOP_MAP_PIN_SUM = TOP_MAP_PIN_SUM;
  window.map = map;
  window.onSuccess = onSuccess;
  window.onError = onError;
})();
